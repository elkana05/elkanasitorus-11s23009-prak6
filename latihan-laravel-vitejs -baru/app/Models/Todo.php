<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Todo extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'is_finished',
        'cover',
    ];

    protected $casts = [
        'is_finished' => 'boolean',
    ];

    /**
     * Pastikan 'cover_url' selalu disertakan saat model diubah menjadi array/JSON.
     */
    protected $appends = ['cover_url'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the full URL for the cover image.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function coverUrl(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->cover ? Storage::url($this->cover) : null
        );
    }
}
