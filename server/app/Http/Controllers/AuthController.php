<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Account;
use App\Models\Customer;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{

    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request) {


        $username = Account::where('username', $request['username'])->first();
        $email = Account::where('email', $request['email'])->first();

        if($request['username'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập tài khoản';
        } else if($request['email'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập email';
        } else if($request['password'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập password';
        } else if($email) {
            $response['status'] = false;
            $response['message'] = 'Email đã tồn tại';
        } else if($username) {
            $response['status'] = false;
            $response['message'] = 'Tài khoản đã tồn tại';
        } else {
            $account = Account::create([
                'email' => $request->email,
                'username' => $request->username,
                'password' => bcrypt($request->password),
                'roles' => $request->roles,
                'avatar' => $request->avatar,
            ]);

            $customer = Customer::create([
                'accountId' => $account->accountId,
            ]);

            $response['account'] = $account;
            $response['customer'] = $customer;
            $response['status'] = true;
            $response['message'] = 'Đăng ký tài khoản thành công';
        }
        return response()->json($response);
    }

    public function login(Request $request) {
        $credentials = request(['username', 'password']);

        if($request['username'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập tài khoản';
        } else if($request['password'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập mật khẩu';
        } else if(!JWTAuth::attempt($credentials)) {
            $response['status'] = false;
            $response['data'] = null;
            $response['message'] = 'Tài khoản hoặc mật khẩu không đúng';
        } else {
            $account = auth()->user();
            $data['token'] = auth()->claims([
                'accountId' => $account->accountId,
                'username' => $account->username
            ])->attempt($credentials);

            $response['status'] = true;
            $response['data'] = $data;
            $response['account'] = $account;
            $response['message'] = 'Đăng nhập thành công';
        }

        return response()->json($response);
    }

}
