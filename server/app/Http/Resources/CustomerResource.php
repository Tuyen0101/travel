<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Account;

class CustomerResource extends JsonResource
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
            'customerId' => $this->customerId,
            'accountId' => $this->accountId,
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'phone' => $this->phone,
            'gender' => $this->gender,
            'dob' => $this->dob,
            'address' => $this->address,
            'account' => Account::where("accountId",$this->accountId)->select('avatar','email')->get(),
        ];
    }
}
