<?php

namespace App\Exports;

use App\Models\Reserva;
use Maatwebsite\Excel\Concerns\FromCollection;

class ReservaExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Reserva::all();
    }
}
