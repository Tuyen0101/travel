<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Resources\AccountResource;
use App\Models\User;
use App\Models\Tour;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ChartController;
use App\Http\Controllers\TourCollection;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//AUTH
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login'])->name('login');

// TOUR
Route::get('getAllTours',  [TourController::class, 'getAllTours']);

Route::get('getOneTour/{tourId}',  [TourController::class, 'getOneTour']);

Route::post('createTour', [TourController::class, 'createTour']);

Route::put('updateTour/{tourId}', [TourController::class, 'updateTour']);

Route::delete('deleteTour/{tourId}', [TourController::class, 'deleteTour']);

Route::get('sortTour',  [TourController::class, 'sortTour']);

Route::get('filterTour',  [TourController::class, 'filterTour']);

//CUSTOMER
Route::get('getAllCustomers',  [CustomerController::class, 'getAllCustomers']);

Route::get('getOneCustomer/{customerId}',  [CustomerController::class, 'getOneCustomer']);

Route::put('updateCustomer', [CustomerController::class, 'updateCustomer']);

Route::get('sortCustomer',  [CustomerController::class, 'sortCustomer']);

Route::get('filterCustomer',  [CustomerController::class, 'filterCustomer']);

//REVIEW
Route::get('getAllReviews',  [ReviewController::class, 'getAllReviews']);

Route::get('getAllReviewsByTour/{tourId}', [ReviewController::class, 'getAllReviewsByTour']);

Route::post('createReview', [ReviewController::class, 'createReview']);

Route::put('updateReview/{reviewId}', [ReviewController::class, 'updateReview']);

Route::delete('deleteReview/{reviewId}', [ReviewController::class, 'deleteReview']);

//CONTACT
Route::get('getAllContacts',  [ContactController::class, 'getAllContacts']);

Route::post('createContact', [ContactController::class, 'createContact']);

//BOOKING
Route::get('getAllBookings',  [BookingController::class, 'getAllBookings']);

Route::get('getOneBooking/{bookingId}',  [BookingController::class, 'getOneBooking']);

Route::post('createBooking', [BookingController::class, 'createBooking']);

//CHART
Route::get('customerChart', [ChartController::class, 'customerChart']);

Route::get('priceChart', [ChartController::class, 'priceChart']);

//PASSWORD
Route::post('reset-password', 'ResetPasswordController@sendMail');

Route::put('reset-password/{token}', 'ResetPasswordController@reset');


// Route::group([
//     'middleware' => 'api',
//     'prefix' => 'auth'
// ], function ($router) {
//     Route::post('login', [AuthController::class, 'login'])->name('login');
// });

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
