<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\BookingDetail;
use App\Models\Customer;
use App\Models\Tour;
use App\Models\Account;
use App\Http\Resources\BookingResource;

class BookingController extends Controller
{
    public function getAllBookings(Request $request)
    {
        return BookingResource::collection(Booking::all());
    }

    public function getOneBooking($bookingId) {
        $booking = Booking::find($bookingId);
        $bookingDetail = BookingDetail::where("bookingId",$bookingId)->get();
        $customer = Customer::where("customerId",$booking->customerId)->get();
        $account = Account::where("accountId",$customer[0]->accountId)->get();
        $tour = Tour::where("tourId",$bookingDetail[0]->tourId)->get();

        $response['booking'] = $booking;
        $response['bookingDetail'] = $bookingDetail;
        $response['customer'] = $customer;
        $response['account'] = $account;
        $response['tour'] = $tour;
        return response()->json($response);
    }

    public function createBooking(Request $request) {
        $booking = Booking::create([
            'customerId' => $request->customerId,
            'bookingTime' => $request->bookingTime,
            'status' => $request->status,
            'totalPrice' => $request->totalPrice,
        ]);

        $detail = BookingDetail::create([
            'bookingId' => $booking->bookingId,
            'tourId' => $request->tourId,
            'typeRoomId' => $request->typeRoomId,
            'numberAdult' => $request->numberAdult,
            'numberChildren' => $request->numberChildren,
            'numberInfant' => $request->numberInfant,
        ]);

        $response['booking'] = $booking;
        $response['detail'] = $detail;
        $response['status'] = true;
        $response['message'] = 'Đặt Tour thành công';
        return response()->json($response);
    }

    public function updateBooking($bookingId, Request $req) {
        if($request['customerId'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập thông tin khách hàng';
        }  else if($request['bookingTime'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng chọn thời gian đặt tour';
        } else if($request['status'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập trạng thái booking';
        } else if($request['totalPrice'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập tổng giá tour';
        } else if($request['tourId'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập thông tin tour';
        } else if($request['typeRoomId'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập thông tin loại phòng';
        } else if($request['numberAdult'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập số lượng người lớn';
        } else if($request['numberChildren'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập số lượng người trẻ em';
        } else if($request['numberInfant'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập số lượng trẻ em';
        }
        else {
            $booking = Booking::find($bookingId);
            $booking->customerId = $req->customerId;
            $booking->bookingTime = $req->bookingTime;
            $booking->status = $req->status;
            $booking->totalPrice = $req->totalPrice;

            $detail = BookingDetail::find($bookingId);
            $detail->tourId = $req->tourId;
            $detail->typeRoomId = $req->typeRoomId;
            $detail->numberAdult = $req->numberAdult;
            $detail->numberChildren = $req->numberChildren;
            $detail->numberInfant = $req->numberInfant;

            $resultBooking = $booking->save();
            $resultDetail = $detail->save();
            if($resultBooking && $resultDetail) {
                $response['status'] = true;
                $response['message'] = 'Chỉnh sửa thành công';
            } else {
                $response['status'] = false;
                $response['message'] = 'Chỉnh sửa thất bại';
            }
        }

        return response()->json($response);
    }

    public function deleteBooking($bookingId) {
        $booking = Booking::find($bookingId);
        $result = $booking->delete();

        if($result) {
            $response['status'] = true;
            $response['message'] = 'Xóa booking thành công';
        } else {
            $response['status'] = false;
            $response['message'] = 'Xóa booking thất bại';
        }

        return response()->json($response);
    }
}
