<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class OnboardingController extends Controller
{
    public function index()
    {
        return Inertia::render('Onboarding');
    }
}
