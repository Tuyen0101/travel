<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Customer;
use App\Models\Account;

class ReviewResource extends JsonResource
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
            'reviewId' => $this->reviewId,
            'tourId' => $this->tourId,
            'customerId' => $this->customerId,
            'title' => $this->title,
            'content' => $this->content,
            'rating' => $this->rating,
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
            'name' => Customer::where("customerId",$this->customerId)->select('lastName','firstName')->get(),
            'avatar' => Account::where("accountId",$this->customerId)->select('avatar')->get(),
        ];
    }
}
