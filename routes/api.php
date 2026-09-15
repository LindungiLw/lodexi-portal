<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LodexPortalController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/v1/search', [LodexPortalController::class, 'search'])->name('api.search');
    Route::post('/v1/ask', [LodexPortalController::class, 'ask'])->name('api.ask');
    Route::post('/v1/ingest', [LodexPortalController::class, 'ingest'])->name('api.ingest');
});
