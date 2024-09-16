<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGoalRequest;
use App\Http\Requests\UpdateGoalRequest;
use App\Http\Resources\GoalResource;
use App\Models\Goal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GoalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Get category and search term from the request
        $category = $request->input('category', 'All');
        $searchTerm = $request->input('search', '');

        // Build the query with filters
        $query = Goal::where('user_id', Auth::id());

        if ($category !== 'All') {
            $query->where('category', $category);
        }

        if (!empty($searchTerm)) {
            $query->where('title', 'like', '%' . $searchTerm . '%');
        }

        // Paginate the filtered goals
        $goals = $query->paginate(6)->appends($request->query());

        // Get all unique categories for the user
        $categories = Goal::where('user_id', Auth::id())->pluck('category')->unique()->values();

        // Format pagination links
        $formattedLinks = collect($goals->linkCollection()->toArray())->map(function ($link) {
            return [
                'url' => $link['url'],
                'label' => $link['label'],
                'active' => $link['active'],
            ];
        });

        return Inertia::render('Goals/Index', [
            'goals' => GoalResource::collection($goals),
            'categories' => $categories,
            'links' => $formattedLinks,
            'filters' => [
                'category' => $category,
                'search' => $searchTerm,
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGoalRequest $request)
    {

        $data = $request->validated();

        $data['user_id'] = Auth::id();

        Goal::create($data);

        return to_route('goals.index')->with('success', 'Goal created successfully');

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $goal = Goal::findOrFail($id);

        return response()->json($goal);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGoalRequest $request, Goal $goal)
    {
        if ($goal->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $data = $request->validated();
        $data['user_id'] = Auth::id();
        $goal->update($data);

        return to_route('goals.index')->with('success', 'Goal updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Goal $goal)
    {
        // Ensure this is the correct goal instance
        if ($goal->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $goal->delete();

        return to_route('goals.index')->with('success', 'Goal deleted successfully');
    }
}
