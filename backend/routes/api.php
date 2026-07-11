<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoucherController;
 

//[POST] untuk check voucher
Route::post('/check',[VoucherController::class,'check']);


//[POST] untuk generate voucher
Route::post('/generate',[VoucherController::class,'generate']);


//ini kalo methodnya salah 
Route::fallback(function () {
    return response()->json([
        'success' => false,
        'message' => 'Endpoint tidak ditemukan.'
    ], 404);
});