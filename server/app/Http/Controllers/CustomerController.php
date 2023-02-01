<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\Account;
use App\Http\Resources\CustomerResource;

class CustomerController extends Controller
{
    public function getAllCustomers() {
        // $customer = Customer::all();
        // return response()->json($customer);
        return CustomerResource::collection(Customer::all());
    }

    public function getOneCustomer($customerId) {
        $customer = Customer::find($customerId);
        $account = Account::where("accountId",$customerId)->get();
        $response['customer'] = $customer;
        $response['account'] = $account;
        return response()->json($response);
    }

    public function updateCustomer(Request $req) {
        $customer = Customer::find($req->customerId);
        $customer->firstName = $req->firstName;
        $customer->lastName = $req->lastName;
        $customer->phone = $req->phone;
        $customer->address = $req->address;
        $customer->dob = $req->dob;
        $customer->gender = $req->gender;

        $account = Account::find($req->accountId);
        $account->avatar = $req->avatar;

        $resultCustomer = $customer->save();
        $resultAccount = $account->save();
        if($resultCustomer && $resultAccount) {
            $response['message'] = 'Chỉnh sửa hồ sơ cá nhân thành công';
        } else {
            $response['message'] = 'Chỉnh sửa thất bại';
        }

        return response()->json($response);
    }

    public function sortCustomer(Request $request)
    {
        $customer_query = Customer::with(['Account']);

        if ($request->sortBy && in_array($request->sortBy,['lastName','firstName','customerId'])) {
            $sortBy=$request->sortBy;
        }else{
            $sortBy='lastName';
        }

        if ($request->sortOrder && in_array($request->sortOrder,['asc','desc'])) {
            $sortOrder=$request->sortOrder;
        }else{
            $sortOrder='desc';
        }

        $customers = $customer_query->orderBY($sortBy,$sortOrder)->get();
        return response()->json($customers);
    }

    public function filterCustomer(Request $request)
    {
        $customer_query = Customer::with(['Account']);

        if ($request->keyword) {
            $customer_query->where('firstName','LIKE','%'.$request->keyword.'%');
        }

        if ($request->has('month')) {

            $customer_query->where('dob', 'LIKE', '%'.$request->month.'%');
        }

        if ($request->fromdate && $request->todate) {
            $fromdate=$request->input('fromdate');
            $todate=$request->input('todate');
            $customer_query->where('dob','>=',$fromdate)->where('dob','<=',$todate);
        }

        $customers = $customer_query->get();
        return response()->json($customers);
    }

}
