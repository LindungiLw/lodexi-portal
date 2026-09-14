<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'prompt_tokens', 'completion_tokens', 'endpoint'])]
class TokenUsage extends Model
{
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
