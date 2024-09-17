<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResourceRequest;
use App\Http\Requests\UpdateResourceRequest;
use App\Http\Resources\GoalResource;
use App\Http\Resources\MaterialResource;
use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Get the selected goal ID and search term from the request
        $goalId = $request->input('goal_id');
        $searchTerm = $request->input('search', '');

        // Fetch all user goals
        $goals = auth()->user()->goals;

        // Fetch resources based on goal ID and search term
        $query = Resource::where('user_id', Auth::id());

        if (!empty($goalId)) {
            $query->where('goal_id', $goalId);
        }

        if (!empty($searchTerm)) {
            $query->where('title', 'like', '%' . $searchTerm . '%');
        }

        // Paginate the filtered resources
        $resources = $query->paginate(10)->appends($request->query());

        // Format pagination links
        $formattedLinks = collect($resources->linkCollection()->toArray())->map(function ($link) {
            return [
                'url' => $link['url'],
                'label' => $link['label'],
                'active' => $link['active'],
            ];
        });

        return Inertia::render('Resources/Index', [
            'goals' => GoalResource::collection($goals),
            'resources' => MaterialResource::collection($resources),
            'selectedGoalId' => $goalId,
            'filters' => [
                'search' => $searchTerm,
                'goal_id' => $goalId,
            ],
            'links' => $formattedLinks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ResourceRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = Auth::id();

        Resource::create($data);

        return to_route('resources.index')->with('success', 'Resource created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $goal = Resource::findOrFail($id);

        return response()->json($goal);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResourceRequest $request, Resource $resource)
    {
        if ($resource->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $resource->update($data);

        return to_route('resources.index')->with('success', 'Resources updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Resource $resource)
    {
        // Ensure this is the correct goal instance
        if ($resource->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $resource->delete();

        return to_route('resources.index')->with('success', 'Resource deleted successfully');
    }
}
