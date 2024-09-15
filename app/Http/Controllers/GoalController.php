<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGoalRequest;
use App\Http\Requests\UpdateGoalRequest;
use App\Http\Resources\GoalResource;
use App\Models\Goal;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GoalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $goals = Goal::where('user_id', Auth::id())->get();

        // Extract unique categories on the backend
        $categories = $goals->pluck('category')->unique()->values();

        return Inertia::render('Goals/Index', [
            'goals' => GoalResource::collection($goals),
            'categories' => $categories,
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
