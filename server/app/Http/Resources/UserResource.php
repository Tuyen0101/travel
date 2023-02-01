<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'userId' => $this->userId,
            'username' => $this->username,
            'password' => $this->password,
            'email' => $this->email,
            'phone' => $this->phone,
            'fullname' => $this->fullname,
            'gender' => $this->gender,
            'dob' => $this->dob,
            'address' => $this->address,
            'avatar' => $this->avatar,
            'createdAt' => $this->createdAt,
            'updatedAt' => $this->updatedAt,
        ];
    }
}
