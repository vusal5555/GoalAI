<?php

use App\Http\Controllers\AIRoadmapController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ResourceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/goals', [GoalController::class, 'index'])->name('goals.index');
    Route::post('/goals', [GoalController::class, 'store'])->name('goals.store');
    Route::get('/goals/{id}', [GoalController::class, 'show'])->name('goals.show');
    Route::put('goals/{goal}', [GoalController::class, 'update'])->name('goals.update');
    Route::delete('goals/{goal}', [GoalController::class, 'destroy'])->name('goals.destroy');
    Route::get('/roadmaps', [AIRoadmapController::class, 'index'])->name('roadmaps.index');
    Route::get('/resources', [ResourceController::class, 'index'])->name('resources.index');
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');

});

require __DIR__ . '/auth.php';
