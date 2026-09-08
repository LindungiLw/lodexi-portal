<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Client\Response;

class LodexService
{
    protected string $baseUrl;
    protected string $apiKey;
    protected string $tenantId;

    public function __construct()
    {
        $this->baseUrl = rtrim(config('services.lodex.url', 'http://127.0.0.1:8000'), '/');
        $this->apiKey = config('services.lodex.key', 'key_staffportal_secret_456');
        $this->tenantId = config('services.lodex.tenant_id', 'staff_portal');
    }

    /**
     * Get HTTP client with pre-configured API Key and headers.
     */
    protected function client()
    {
        return Http::withHeaders([
            'X-API-Key' => $this->apiKey,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ])->timeout(15);
    }

    /**
     * Ingest a document into the tenant's knowledge partition.
     */
    public function ingest(string $externalId, string $title, string $content, ?string $category = null, array $metadata = []): array
    {
        $response = $this->client()->post("{$this->baseUrl}/v1/documents", [
            'external_id' => $externalId,
            'title' => $title,
            'content' => $content,
            'category' => $category,
            'metadata' => $metadata,
        ]);

        return $response->json();
    }

    /**
     * Perform semantic vector search over the tenant's catalog/documents.
     */
    public function search(string $query, int $limit = 5, ?string $category = null): array
    {
        $response = $this->client()->post("{$this->baseUrl}/v1/search", [
            'query' => $query,
            'limit' => $limit,
            'category_filter' => $category,
        ]);

        return $response->json();
    }

    /**
     * Ask a question and receive a grounded answer with verified citations.
     */
    public function ask(string $question, int $limit = 4, ?string $category = null): array
    {
        $response = $this->client()->post("{$this->baseUrl}/v1/ask", [
            'question' => $question,
            'limit' => $limit,
            'category_filter' => $category,
        ]);

        return $response->json();
    }

    /**
     * Delete document chunks by external ID.
     */
    public function delete(string $externalId): array
    {
        $response = $this->client()->delete("{$this->baseUrl}/v1/documents/{$externalId}");
        return $response->json();
    }

    /**
     * Check health status of LODEX AI engine.
     */
    public function health(): array
    {
        try {
            $response = Http::timeout(3)->get("{$this->baseUrl}/health");
            return $response->json() ?? ['status' => 'offline'];
        } catch (\Exception $e) {
            return ['status' => 'offline', 'error' => $e->getMessage()];
        }
    }
}
