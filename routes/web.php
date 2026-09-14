<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LodexPortalController;
use App\Models\TokenUsage;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('portal.home');

Route::post('/api/search', [LodexPortalController::class, 'search'])->name('portal.search');
Route::post('/api/ask', [LodexPortalController::class, 'ask'])->name('portal.ask');
Route::post('/api/ingest', [LodexPortalController::class, 'ingest'])->name('portal.ingest');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $documents = \App\Models\Document::where('user_id', auth()->id())->latest()->get();
        return Inertia::render('Dashboard/Knowledge', [
            'documents' => $documents
        ]);
    })->name('dashboard');

    Route::get('/dashboard/apikeys', function () {
        $userId = auth()->id();
        $analytics = [
            'total_requests' => TokenUsage::where('user_id', $userId)->count(),
            'prompt_tokens' => TokenUsage::where('user_id', $userId)->sum('prompt_tokens'),
            'completion_tokens' => TokenUsage::where('user_id', $userId)->sum('completion_tokens'),
        ];
        return Inertia::render('Dashboard/ApiKeys', [
            'analytics' => $analytics
        ]);
    })->name('dashboard.apikeys');

    Route::get('/dashboard/playground', function () {
        return Inertia::render('Dashboard/Playground');
    })->name('dashboard.playground');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/llm', [ProfileController::class, 'updateLlmSettings'])->name('profile.update_llm');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
