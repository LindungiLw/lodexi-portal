<?php

namespace App\Http\Controllers;

use App\Services\LodexService;
use Illuminate\Http\Request;

class LodexPortalController extends Controller
{
    protected LodexService $lodex;

    public function __construct(LodexService $lodex)
    {
        $this->lodex = $lodex;
    }

    /**
     * Show the main Laravel client portal.
     */
    public function index()
    {
        $health = $this->lodex->health();
        return inertia('Portal/Index', compact('health'));
    }

    /**
     * Handle semantic search request.
     */
    public function search(Request $request)
    {
        $request->validate(['query' => 'required|string|min:2']);
        $results = $this->lodex->search(
            $request->input('query'),
            $request->input('limit', 5),
            $request->input('category')
        );
        return response()->json($results);
    }

    /**
     * Handle grounded Q&A request.
     */
    public function ask(Request $request)
    {
        $request->validate(['question' => 'required|string|min:3']);
        $answer = $this->lodex->ask(
            $request->input('question'),
            $request->input('limit', 4),
            $request->input('category')
        );
        return response()->json($answer);
    }

    /**
     * Ingest a document.
     */
    public function ingest(Request $request)
    {
        $request->validate([
            'external_id' => 'required|string',
            'title' => 'required|string',
            'content' => 'required|string',
        ]);

        $res = $this->lodex->ingest(
            $request->input('external_id'),
            $request->input('title'),
            $request->input('content'),
            $request->input('category')
        );
        return response()->json($res);
    }
}
