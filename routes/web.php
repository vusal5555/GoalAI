<?php

use App\Http\Controllers\AIController;
use App\Http\Controllers\ChatController;
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

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/generate-roadmap', [AIController::class, 'generateRoadmapLmmaGet'])->name('generate-roadmap');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/goals', [GoalController::class, 'index'])->name('goals.index');
    Route::post('/goals', [GoalController::class, 'store'])->name('goals.store');
    Route::get('/goals/{id}', [GoalController::class, 'show'])->name('goals.show');
    Route::put('goals/{goal}', [GoalController::class, 'update'])->name('goals.update');
    Route::delete('goals/{goal}', [GoalController::class, 'destroy'])->name('goals.destroy');
    Route::get('/ai-mentor', [AIController::class, 'index'])->name('aimentor.index');
    Route::get('/ai-mentor-guidance', [AIController::class, 'generateMentorResponse'])->name('aimentor.generateMentorResponse');
    Route::get('/resources', [ResourceController::class, 'index'])->name('resources.index');
    Route::get('/resources/{id}', [ResourceController::class, 'show'])->name('resources.show');
    Route::post('/resources', [ResourceController::class, 'store'])->name('resources.store');
    Route::put('/resources/{resource}', [ResourceController::class, 'update'])->name('resources.update');
    Route::delete('/resources/{resource}', [ResourceController::class, 'destroy'])->name('resources.destroy');
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/chat/message', [ChatController::class, 'handleMessage']);
    Route::post('/chat/save-content', [ChatController::class, 'saveContent']);

});

require __DIR__ . '/auth.php';
