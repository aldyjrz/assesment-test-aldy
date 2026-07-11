<?php
namespace App\Services;

class SeatGeneratorService
{
    public function generate($aircraft)
    {
        if($aircraft=="ATR"){
            //Kalau ATR, row hanya 18 dengan letter ACDF
            $rows=18;
            $letters=['A','C','D','F'];
        }else{
            //aribus dan boeing 737 sama
            $rows=32;
            $letters=['A','B','C','D','E','F'];
        }

        $all=[];

        foreach(range(1,$rows) as $row){
            foreach($letters as $letter){
                $all[]=$row.$letter;
            }
        }

        shuffle($all);

        return array_slice($all,0,3);
    }
}