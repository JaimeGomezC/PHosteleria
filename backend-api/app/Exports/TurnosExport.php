<?php

namespace App\Exports;

use App\Models\Turnos;
use Maatwebsite\Excel\Concerns\FromCollection;

class TurnosExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Turnos::all();
    }
}
