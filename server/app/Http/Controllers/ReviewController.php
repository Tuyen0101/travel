<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use App\Http\Resources\ReviewResource;

class ReviewController extends Controller
{
    public function getAllReviews(Request $request)
    {
        return ReviewResource::collection(Review::all());
    }

    public function getAllReviewsByTour($tourId) {
        $reviews = ReviewResource::collection(Review::where("tourId",$tourId)->get());
        return response()->json($reviews);
    }

    public function createReview(Request $request) {
        if($request['rating'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng chọn sao đánh giá';
        } else if($request['title'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập Tiêu đề';
        } else if($request['content'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập nội dung';
        } else {
            $review = Review::create([
                'tourId' => $request->tourId,
                'customerId' => $request->customerId,
                'rating' => $request->rating,
                'title' => $request->title,
                'content' => $request->content,
            ]);
            $response['review'] = $review;
            $response['status'] = true;
            $response['message'] = 'Đánh giá thành công';
        }
        return response()->json($response);
    }

    public function updateReview($reviewId, Request $req) {
        if($req['rating'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng chọn sao đánh giá';
        } else if($req['title'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập Tiêu đề';
        } else if($req['content'] == "") {
            $response['status'] = false;
            $response['message'] = 'Vui lòng nhập nội dung';
        } else {
            $review = Review::find($reviewId);
            $review->rating = $req->rating;
            $review->title = $req->title;
            $review->content = $req->content;

            $result = $review->save();
            if($result) {
                $response['status'] = true;
                $response['message'] = 'Chỉnh sửa đánh giá thành công';
            } else {
                $response['status'] = false;
                $response['message'] = 'Chỉnh sửa thất bại';
            }
        }

        return response()->json($response);
    }

    public function deleteReview($reviewId) {
        $review = Review::find($reviewId);
        $result = $review->delete();

        if($result) {
            $response['status'] = true;
            $response['message'] = 'Xóa đánh giá thành công';
        } else {
            $response['status'] = false;
            $response['message'] = 'Xóa đánh giá thất bại';
        }

        return response()->json($response);
    }

}
