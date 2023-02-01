<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Customer;
use App\Models\Account;

class ContactResource extends JsonResource
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
            'contactId' => $this->contactId,
            'customerId' => $this->customerId,
            'content' => $this->content,
            'createdAt' => $this->createdAt,
            'name' => Customer::where("customerId",$this->customerId)->select('lastName','firstName')->get(),
            'avatar' => Account::where("accountId",$this->customerId)->select('avatar')->get(),
        ];
    }
}
