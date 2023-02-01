<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use App\Http\Resources\ContactResource;
use Carbon\Carbon;

class ContactController extends Controller
{
    public function getAllContacts(Request $request)
    {
        return ContactResource::collection(Contact::all());
    }

    public function createContact(Request $request) {
        if($request['content'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập nội dung';
        } else {
            $contact = Contact::create([
                'content' => $request->content,
                'createdAt' => Carbon::now(),
                'customerId' => $request->customerId,
            ]);
            $response['contact'] = $contact;
            $response['status'] = true;
            $response['message'] = 'Gửi phản hồi thành công';
        }
        return response()->json($response);
    }
}
