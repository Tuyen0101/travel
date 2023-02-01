<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingDetail extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'bookingDetailId',
        'bookingId',
        'tourId',
        'typeRoomId',
        'numberAdult',
        'numberChildren',
        'numberInfant',
    ];

    protected $primaryKey = 'bookingDetailId';
    protected $table = 'bookingdetail';
}
