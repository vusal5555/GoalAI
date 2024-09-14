<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GoalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Goals/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        // Validate the incoming request with all necessary fields
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'required|date|after:today', // Ensure due date is in the future
            'category' => 'required|string|max:255',
        ]);

        // Create a new Goal instance and save it
        $goal = new Goal;
        $goal->title = $validatedData['title'];
        $goal->description = $validatedData['description'];
        $goal->due_date = $validatedData['due_date'];
        $goal->category = $validatedData['category'];

        // Associate the goal with the currently authenticated user (if applicable)
        $goal->user_id = auth()->id(); // Assuming user_id column exists in goals table

        $goal->save();

    }

    /**
     * Display the specified resource.
     */
    public function show(Goal $goal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Goal $goal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Goal $goal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Goal $goal)
    {
        //
    }
}
