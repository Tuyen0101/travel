<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Tour;
use App\Models\Image;
use App\Models\TypeTour;
use App\Http\Resources\TourResource;

class TourController extends Controller
{

    public function getOneTour($tourId) {
        $tour = Tour::find($tourId);
        $imagestour = Image::where("tourId",$tourId)->get();
        $response['tour'] = $tour;
        $response['images'] = $imagestour;
        return response()->json($response);
    }

    public function getAllTours(Request $request)
    {
        return TourResource::collection(Tour::all());
    }

    public function createTour(Request $request) {
        if($request['tourName'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập tên tour';
        } else if($request['typeTourId'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng chọn loại tour ';
        } else if($request['schedule'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập lịch trình cho tour';
        } else if($request['description'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập mô tả cho tour';
        } else if($request['location'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng chọn vị trí tour';
        } else if($request['priceAdult'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập giá cho người lớn';
        } else if($request['priceChildren'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập giá cho người trẻ em';
        } else if($request['priceInfant'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập giá cho trẻ sơ sinh';
        } else if($request['startDate'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập ngày bắt đầu hành trình';
        } else if($request['endDate'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập ngày kết thúc hành trình';
        } else if($request['urlImage'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng chọn ảnh';
        } else {
            $tour = Tour::create([
                'tourName' => $request->tourName,
                'typeTourId' => $request->typeTourId,
                'schedule' => $request->schedule,
                'description' => $request->description,
                'location' => $request->location,
                'priceAdult' => $request->priceAdult,
                'priceChildren' => $request->priceChildren,
                'priceInfant' => $request->priceInfant,
                'startDate' => $request->startDate,
                'endDate' => $request->endDate,
            ]);

            $image = Image::create([
                'urlImage' => 'hagiang1.png',
                'tourId' => $tour->tourId
            ]);

            $response['tour'] = $tour;
            $response['image'] = $image;
            $response['status'] = true;
            $response['message'] = 'Thêm tour thành công';
        }
        return response()->json($response);
    }

    public function updateTour($tourId, Request $req) {
        if($req['tourName'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập tên tour';
        } else if($req['schedule'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập lịch trình cho tour';
        } else if($req['description'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập mô tả cho tour';
        } else if($req['location'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập vị trí tour';
        } else if($req['priceAdult'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập giá cho người lớn';
        } else if($req['priceChildren'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập giá cho người trẻ em';
        } else if($req['priceInfant'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập giá cho trẻ sơ sinh';
        } else if($req['startDate'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập ngày bắt đầu hành trình';
        } else if($req['endDate'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập ngày kết thúc hành trình';
        } else if($req['urlImage'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng chọn ảnh';
        }
        else {
            $tour = Tour::find($tourId);
            $tour->tourName = $req->tourName;
            $tour->schedule = $req->schedule;
            $tour->description = $req->description;
            $tour->location = $req->location;
            $tour->priceAdult = $req->priceAdult;
            $tour->priceChildren = $req->priceChildren;
            $tour->priceInfant = $req->priceInfant;
            $tour->startDate = $req->startDate;
            $tour->endDate = $req->endDate;

            // $image = Image::find($tourId);
            // $image->urlImage = $req->urlImage;

            $resultTour = $tour->save();
            // $resultImage = $image->save();
            if($resultTour) {
                $response['status'] = true;
                $response['message'] = 'Chỉnh sửa tour thành công';
            } else {
                $response['status'] = false;
                $response['message'] = 'Chỉnh sửa thất bại';
            }
        }

        return response()->json($response);
    }

    public function deleteTour($tourId) {
        $tour = Tour::find($tourId);
        $result = $tour->delete();

        if($result) {
            $response['status'] = true;
            $response['message'] = 'Xóa tour thành công';
        } else {
            $response['status'] = false;
            $response['message'] = 'Xóa tour thất bại';
        }

        return response()->json($response);
    }

    public function sortTour(Request $request)
    {

        $tour_query = Tour::with(['Image']);

        if ($request->sortBy && in_array($request->sortBy,['priceAdult','tourName', 'startDate'])) {
            $sortBy=$request->sortBy;
        }else{
            $sortBy='tourName';
        }

        if ($request->sortOrder && in_array($request->sortOrder,['asc','desc'])) {
            $sortOrder=$request->sortOrder;
        }else{
            $sortOrder='desc';
        }

        $tours = $tour_query->orderBY($sortBy,$sortOrder)->get();
        return response()->json($tours);
    }

    public function filterTour(Request $request)
    {
        $tour_query = Tour::with(['Image']);

        if ($request->keyword) {
            $tour_query->where('tourName','LIKE','%'.$request->keyword.'%');
        }

        if ($request->typetour) {
            $tour_query->where('typeTourId',$request->typetour);
        }

        if ($request->fromdate && $request->todate) {
            $fromdate=$request->input('fromdate');
            $todate=$request->input('todate');
            $tour_query->where('startDate','>=',$fromdate)->where('startDate','<=',$todate);
        }

        if ($request->fromprice && $request->toprice) {
            $fromprice=$request->input('fromprice');
            $toprice=$request->input('toprice');
            $tour_query->where('priceAdult','>=',$fromprice)->where('priceAdult','<=',$toprice);
        }

        $tours = $tour_query->get();
        return response()->json($tours);
    }
}
