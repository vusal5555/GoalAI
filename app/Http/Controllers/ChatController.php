<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{

    public function handleMessage(Request $request)
    {
        $user = Auth::user();
        $goalId = $request->input('goal_id');
        $message = $request->input('message');
        $conversation = $request->input('conversation');

        // Validate inputs
        $request->validate([
            'goal_id' => 'required|exists:goals,id',
            'message' => 'required|string',
            'conversation' => 'required|array',
        ]);

        $goal = Goal::where('id', $goalId)->where('user_id', $user->id)->firstOrFail();

        // System prompt and functions as before
        $systemPrompt = "You are an AI mentor assisting a user with their goal: '{$goal->title}'.

        Your tasks are:

        1. Greet the user and acknowledge their selected goal and its description: '{$goal->description}'.

        2. Ask any clarifying questions to better understand their goal.

        3. Once the user indicates they have no more clarifications, inform them that you can generate tasks, a template, and resources to help them achieve their goal.

        4. Ask the user if they would like to see the content and if they agree, show it to them in the chat.

        5. Ask the user if they would like you to proceed with generating this content.

        6. **If the user agrees, generate the content and present it to the user in a user-friendly format using Markdown. Do not proceed to any other steps until the user has presented the content to the user.

           Example format:

           # Tasks
           1. Task 1
           2. Task 2

           # Template
           Your action plan template here.

           # Resources
           - **Title**: Resource Title
             **Description**: Resource Description
             **URL**: Resource URL

        7. After presenting the content, ask the user if they would like to make any specific changes to the tasks, template, or resources.
        8. If the user requests changes, update the content accordingly and present the updated version.
        9. **Once the user is satisfied with the content, silently use the 'save_generated_content' tool with the final version of the content. Do not mention the tool use to the user.**
        10. Confirm with the user that the content has been saved and ask if they need any further assistance.
        11. Do not include any JSON or code blocks in your messages to the user. Keep the conversation natural and friendly.

        Remember to keep the conversation interactive and only share user-friendly messages with the user.";

        $tools = [
            [
                'type' => 'function',
                'function' => [
                    'name' => 'save_generated_content',
                    'description' => 'Saves the generated tasks, template, and resources.',
                    'parameters' => [
                        'type' => 'object',
                        'properties' => [
                            'tasks' => [
                                'type' => 'array',
                                'items' => ['type' => 'string'],
                                'description' => 'A list of tasks.',
                            ],
                            'template' => [
                                'type' => 'string',
                                'description' => 'The action plan template.',
                            ],
                            'resources' => [
                                'type' => 'array',
                                'items' => [
                                    'type' => 'object',
                                    'properties' => [
                                        'title' => ['type' => 'string'],
                                        'description' => ['type' => 'string'],
                                        'url' => ['type' => 'string'],
                                    ],
                                ],
                                'description' => 'A list of resources.',
                            ],
                        ],
                        'required' => ['tasks', 'template', 'resources'],
                    ],
                ],
            ],
        ];

        // Prepare the messages for the API
        $messages = [];

        // System prompt with goal information
        $messages[] = [
            'role' => 'system',
            'content' => $systemPrompt,
        ];

        // Add conversation history
        foreach ($conversation as $convMessage) {
            $messages[] = [
                'role' => $convMessage['sender'] === 'user' ? 'user' : 'assistant',
                'content' => $convMessage['content'],
            ];
        }

        // Make the HTTP POST request to the GROQ API
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://api.groq.com/openai/v1/chat/completions', [
            'model' => 'llama3-groq-70b-8192-tool-use-preview', // Use a model that supports Tool Use
            'messages' => $messages,
            'tools' => $tools, // Include tools instead of functions
            'tool_choice' => 'auto', // Allow the model to decide when to use tools
            'temperature' => 0.7,
        ]);

        //Handle the response
        if ($response->successful()) {
            $data = $response->json();

            $choices = $data['choices'][0];

            if (isset($choices['message']['tool_calls'])) {
                // The AI has called one or more tools
                $toolCalls = $choices['message']['tool_calls'];

                foreach ($toolCalls as $toolCall) {
                    $functionName = $toolCall['function']['name'];
                    $arguments = json_decode($toolCall['function']['arguments'], true);

                    if ($functionName === 'save_generated_content') {
                        // Store the generated content
                        $this->storeGeneratedContent($user->id, $goal->id, $arguments);

                        // Send a message to the user confirming that the content is ready to be saved
                        $aiMessage = "I've prepared the content for you. Would you like to save it to your database?";
                        $contentGenerated = true;
                    } else {
                        $aiMessage = "Sorry, I didn't understand that. Could you please clarify?";
                        $contentGenerated = false;
                    }

                    // Append the tool call and response to the conversation
                    $messages[] = [
                        'role' => 'tool',
                        'content' => json_encode($arguments),
                        'tool_call_id' => $toolCall['id'],
                    ];
                }
            } else {
                // Regular AI message
                $aiMessage = $choices['message']['content'];
                $contentGenerated = false;
            }

            // Return the response to the frontend
            return response()->json([
                'message' => $aiMessage,
                'contentGenerated' => $contentGenerated,
            ]);
        } else {
            // Handle errors
            \Log::error('GROQ API Error:', ['status' => $response->status(), 'body' => $response->body()]);
            return response()->json(['error' => 'AI service is currently unavailable. Please try again later.'], 500);
        }

    }

    public function saveContent(Request $request)
    {
        $user = Auth::user();
        $goalId = $request->input('goal_id');

        // Validate input
        $request->validate([
            'goal_id' => 'required|exists:goals,id',
        ]);

        $goal = Goal::where('id', $goalId)->where('user_id', $user->id)->firstOrFail();

        // Retrieve the generated content
        $generatedContent = $this->retrieveGeneratedContent($user->id, $goal->id);

        if (!$generatedContent) {
            return response()->json(['error' => 'No generated content found.'], 404);
        }

        // Save the content
        $this->saveGeneratedContent($goal, $generatedContent);

        // Clear temporary storage
        $this->clearGeneratedContent($user->id, $goal->id);

        return response()->json(['message' => 'Content saved successfully.']);
    }

    private function detectGeneratedContent($message)
    {
        // Adjust the detection logic based on how the AI might include generated content
        return strpos($message, '<BEGIN_JSON>') !== false && strpos($message, '<END_JSON>') !== false;
    }

    private function storeGeneratedContent($userId, $goalId, $content)
    {
        // Store content in cache or session
        Cache::put("generated_content_{$userId}_{$goalId}", $content, now()->addMinutes(30));
    }

    private function retrieveGeneratedContent($userId, $goalId)
    {
        // Retrieve content from cache or session
        return Cache::get("generated_content_{$userId}_{$goalId}");
    }

    private function clearGeneratedContent($userId, $goalId)
    {
        Cache::forget("generated_content_{$userId}_{$goalId}");
    }

    private function saveGeneratedContent($goal, $parsedContent)
    {
        // Save tasks
        if (isset($parsedContent['tasks']) && is_array($parsedContent['tasks'])) {
            foreach ($parsedContent['tasks'] as $taskDescription) {
                try {
                    $goal->tasks()->create([
                        'description' => $taskDescription,
                    ]);
                } catch (\Exception $e) {
                    \Log::error('Failed to save task:', ['error' => $e->getMessage()]);
                }
            }
        }

        // Save template
        if (isset($parsedContent['template'])) {
            try {
                $goal->template()->create([
                    'content' => $parsedContent['template'],
                ]);
            } catch (\Exception $e) {
                \Log::error('Failed to save template:', ['error' => $e->getMessage()]);
            }
        }

        // Save resources
        if (isset($parsedContent['resources']) && is_array($parsedContent['resources'])) {
            foreach ($parsedContent['resources'] as $resourceData) {
                if (isset($resourceData['title'], $resourceData['description'], $resourceData['url'])) {
                    try {
                        $goal->resources()->create([
                            'user_id' => $goal->user_id,
                            'title' => $resourceData['title'],
                            'description' => $resourceData['description'],
                            'url' => $resourceData['url'],
                        ]);
                    } catch (\Exception $e) {
                        \Log::error('Failed to save resource:', ['error' => $e->getMessage()]);
                    }
                } else {
                    \Log::warning('Invalid resource data:', ['data' => $resourceData]);
                }
            }
        }
    }

    private function removeJsonContent($message)
    {
        $startMarker = '<BEGIN_JSON>';
        $endMarker = '<END_JSON>';

        $jsonStart = strpos($message, $startMarker);
        $jsonEnd = strpos($message, $endMarker);

        if ($jsonStart !== false && $jsonEnd !== false) {
            $jsonEnd += strlen($endMarker);
            // Remove JSON content including markers
            $message = substr_replace($message, '', $jsonStart, $jsonEnd - $jsonStart);
        }

        return trim($message);
    }

}
