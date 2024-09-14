<?php

namespace App\Http\Controllers;

use App\Models\AIRoadmap;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AIRoadmapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('AIRoadmap/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(AIRoadmap $aIRoadmap)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AIRoadmap $aIRoadmap)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AIRoadmap $aIRoadmap)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AIRoadmap $aIRoadmap)
    {
        //
    }
}
