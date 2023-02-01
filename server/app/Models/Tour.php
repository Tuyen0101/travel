<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = 'tourId';
    protected $table = 'tours';

    protected $fillable = [
        'tourId',
        'tourName',
        'typeTourId',
        'schedule',
        'description',
        'location',
        'priceAdult',
        'priceChildren',
        'priceInfant',
        'startDate',
        'endDate'
    ];

    public function Image() {
        return $this->hasMany(Image::class, 'tourId');
    }
}
