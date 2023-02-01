<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    const CREATED_AT = 'createdAt';
    const UPDATED_AT = 'updatedAt';

    protected $fillable = [
        'tourId',
        'customerId',
        'title',
        'content',
        'rating',
        'createdAt',
        'updatedAt'
    ];

    protected $primaryKey = 'reviewId';
    protected $table = 'reviews';
}
