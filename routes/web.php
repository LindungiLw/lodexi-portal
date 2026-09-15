<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LodexPortalController;
use App\Http\Controllers\ApiKeyController;
use App\Models\TokenUsage;
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
})->name('portal.home');

Route::get('/docs/{page?}', [\App\Http\Controllers\DocsController::class, 'show'])->name('docs');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/portal/search', [LodexPortalController::class, 'search'])->name('portal.search');
    Route::post('/portal/ask', [LodexPortalController::class, 'ask'])->name('portal.ask');
    Route::post('/portal/ingest', [LodexPortalController::class, 'ingest'])->name('portal.ingest');
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
        
        $tokens = auth()->user()->tokens()->orderBy('created_at', 'desc')->get()->map(function ($token) {
            return [
                'id' => $token->id,
                'name' => $token->name,
                'last_used_at' => $token->last_used_at ? $token->last_used_at->diffForHumans() : 'Never',
                'created_at' => $token->created_at->format('M j, Y'),
            ];
        });

        return Inertia::render('Dashboard/ApiKeys', [
            'analytics' => $analytics,
            'tokens' => $tokens,
            'new_token' => session('new_token'),
        ]);
    })->name('dashboard.apikeys');

    Route::post('/dashboard/apikeys', [ApiKeyController::class, 'store'])->name('dashboard.apikeys.store');
    Route::delete('/dashboard/apikeys/{id}', [ApiKeyController::class, 'destroy'])->name('dashboard.apikeys.destroy');

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
