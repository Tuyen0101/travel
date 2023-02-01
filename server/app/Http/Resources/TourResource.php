<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Image;

class TourResource extends JsonResource
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
            'tourId' => $this->tourId,
            'tourName' => $this->tourName,
            'typeTourId' => $this->typeTourId,
            'schedule' => $this->schedule,
            'description' => $this->description,
            'location' => $this->location,
            'priceAdult' => $this->priceAdult,
            'priceChildren' => $this->priceChildren,
            'priceInfant' => $this->priceInfant,
            'startDate' => $this->startDate,
            'endDate' => $this->endDate,
            'image' => Image::where("tourId",$this->tourId)->select('urlImage')->get(),
        ];
    }
}
