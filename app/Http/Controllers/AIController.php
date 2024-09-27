<?php

namespace App\Http\Controllers;

use App\Http\Resources\GoalResource;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;

class AIController extends Controller
{

    public function index()
    {

        $user = Auth::user();
        $goals = $user->goals()->get();
        return Inertia::render('AIRoadmap/Index', [
            'goals' => GoalResource::collection($goals),
        ]);
    }

    public function handleAIResponse($aiResponse, $user)
    {
        $aiData = json_decode($aiResponse, true);

        if (json_last_error() === JSON_ERROR_NONE) {
            foreach ($aiData['goals'] as $goalData) {
                $goal = $user->goals()->where('title', $goalData['title'])->first();

                if ($goal) {
                    // Save tasks
                    foreach ($goalData['tasks'] as $taskDescription) {
                        $goal->tasks()->create([
                            'description' => $taskDescription,
                        ]);
                    }

                    // Save template
                    $goal->template()->create([
                        'content' => $goalData['template'],
                    ]);

                    // Save resources
                    foreach ($goalData['resources'] as $resourceData) {
                        $goal->resources()->create([
                            'user_id' => $user->id,
                            'title' => $resourceData['title'],
                            'description' => $resourceData['description'],
                            'url' => $resourceData['url'],
                        ]);
                    }

                    $goal->save();
                }
            }
        } else {
            // Handle JSON parsing error
            \Log::error('AI Response JSON decoding error:', ['response' => $aiResponse]);
            return response()->json(['error' => 'Failed to process AI response.'], 500);
        }
    }

    public function generateMentorResponse()
    {
        $user = Auth::user();
        $goals = $user->goals()->get();

        $goalsText = '';
        foreach ($goals as $goal) {
            $goalsText .= "- {$goal->title}: {$goal->description}\n";
        }

        $prompt = "
            You are an AI mentor assisting a user with their self-improvement goals. The user's goals are:
            {$goalsText}

            For each goal, break it down into smaller, manageable tasks, create a template for action, and suggest relevant resources. Provide your response in JSON format with the following structure:
            {
                \"goals\": [
                    {
                        \"title\": \"Goal Title\",
                        \"tasks\": [\"Task 1\", \"Task 2\", ...],
                        \"template\": \"Action plan template\",
                        \"resources\": [
                            {
                                \"title\": \"Resource Title\",
                                \"description\": \"Resource Description\",
                                \"url\": \"Resource URL\"
                            },
                            ...
                        ]
                    },
                    ...
                ]
            }
            ";

        $response = OpenAI::chat()->create([
            'model' => 'gpt-4',
            'messages' => [
                ['role' => 'user', 'content' => $prompt],
            ],
            'temperature' => 0.7,
        ]);

        $aiResponse = $response['choices'][0]['message']['content'];

        // Handle the AI's response
        $this->handleAIResponse($aiResponse, $user);

        return response()->json(['message' => 'AI mentor response processed successfully.']);
    }
}
