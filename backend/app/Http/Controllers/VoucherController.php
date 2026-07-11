<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckVoucherRequest;
use App\Http\Requests\GenerateVoucherRequest;
use App\Http\Resources\VoucherResource;
use App\Models\Voucher;
use App\Services\SeatGeneratorService;

class VoucherController extends Controller
{
    public function check(CheckVoucherRequest $request)
    {
        $exists=Voucher::where('flight_number',$request->flightNumber)
            ->where('flight_date',$request->date)
            ->exists();

        return response()->json([
            'exists'=>$exists
        ]);
    }

    public function generate(
        GenerateVoucherRequest $request,
        SeatGeneratorService $service
    ){

        $exists=Voucher::where('flight_number',$request->flightNumber)
            ->where('flight_date',$request->date)
            ->exists();

        if($exists){

            return response()->json([
                'success'=>false,
                'message'=>'Voucher already generated.'
            ],409);

        }

        $seats=$service->generate($request->aircraft);

        $voucher=Voucher::create([

            'crew_name'=>$request->name,
            'crew_id'=>$request->id,
            'flight_number'=>$request->flightNumber,
            'flight_date'=>$request->date,
            'aircraft_type'=>$request->aircraft,

            'seat1'=>$seats[0],
            'seat2'=>$seats[1],
            'seat3'=>$seats[2]

        ]);

        return new VoucherResource($voucher);

    }
}