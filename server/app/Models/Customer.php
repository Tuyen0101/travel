<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Customer extends Model
{
    use HasFactory, Notifiable;

    public $timestamps = false;

    protected $fillable = [
        'accountId',
        'firstName',
        'lastName',
        'phone',
        'gender',
        'dob',
        'address'
    ];

    protected $primaryKey = 'customerId';
    protected $table = 'customers';

    public function Account()
{
    return $this->hasMany(Account::class, 'accountId');
}
}
