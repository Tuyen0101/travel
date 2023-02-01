<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\Booking;
use Illuminate\Support\Facades\DB;


class ChartController extends Controller
{
    public function customerChart(){
        $accounts = Account::select(DB::raw("COUNT(*) as count"))
                    ->whereYear('createdAt',date('Y'))
                    ->groupBy(DB::raw("Month(createdAt)"))
                    ->pluck('count');

        $months = Account::select(DB::raw("Month(createdAt) as month"))
                ->whereYear('createdAt',date('Y'))
                ->groupBy(DB::raw("Month(createdAt)"))
                ->pluck('month');

        $datas = array(0,0,0,0,0,0,0,0,0,0,0,0);
        foreach($months as $index => $month)
        {
            $datas[$month-1] = $accounts[$index];
        }
        // return view('bar-chart',compact('datas'));
        return response()->json($datas);
    }

    public function priceChart(){
        $bookings = Booking::select(DB::raw("sum(totalPrice) as DoanhThu"))
                    ->groupBy(DB::raw("Month(bookingTime)"))
                    ->pluck('DoanhThu');

        $months = Booking::select(DB::raw("Month(bookingTime) as month"))
                ->groupBy(DB::raw("Month(bookingTime)"))
                ->pluck('month');

        $datas = array(0,0,0,0,0,0,0,0,0,0,0,0);
        foreach($months as $index => $month)
        {
            $datas[$month-1] = $bookings[$index];
        }
        // return view('bar-chart',compact('datas'));
        return response()->json($datas);
    }
}
