<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeRoom extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'typeRoomId',
        'nameRoom',
    ];

    protected $primaryKey = 'typeRoomId';
    protected $table = 'typeroom';
}
