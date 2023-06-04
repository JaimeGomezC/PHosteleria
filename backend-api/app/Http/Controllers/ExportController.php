<?php

namespace App\Http\Controllers;

use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    public function exportToExcel()
    {
        return response()->json(['message' => 'Hola']);
        // Excel::create('data', function ($excel) {
        //     $excel->sheet('Sheet 1', function ($sheet) {
        //         $sheet->fromArray([
        //             ['Column 1', 'Column 2', 'Column 3'],
        //             ['Value 1', 'Value 2', 'Value 3'],
        //             ['Value 4', 'Value 5', 'Value 6']
        //         ]);
        //     });
        // })->export('xlsx');
    }
}
