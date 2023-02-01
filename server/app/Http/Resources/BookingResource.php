<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Customer;
use App\Models\Account;
use App\Models\Tour;
use App\Models\BookingDetail;
use App\Models\TypeRoom;


class BookingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'bookingId' => $this->bookingId,
            'customerId' => $this->customerId,
            'bookingTime' => $this->bookingTime,
            'status' => $this->status,
            'totalPrice' => $this->totalPrice,
            'name' => Customer::where("customerId",$this->customerId)->select('lastName','firstName')->get(),
            'avatar' => Account::where("accountId",$this->customerId)->select('avatar')->get(),
            'tourName' => Tour::where("tourId",$this->customerId)->select('tourName')->get(),
            'typeRoomId' => BookingDetail::where("bookingId",$this->bookingId)->select('typeRoomId')->get(),
            
        ];
    }
}
