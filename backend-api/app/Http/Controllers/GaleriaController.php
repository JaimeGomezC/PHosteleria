<?php

namespace App\Http\Controllers;

use App\Models\Galeria;
use Illuminate\Http\Request;

class GaleriaController extends Controller
{
    public function index()
    {
        $galeria = Galeria::all();
        return response()->json($galeria);
    }

    public function store(Request $request)
    {
        $galeria = Galeria::create($request->all());
        return response()->json($galeria, 201);
    }

    public function show($id)
    {
        $galeria = Galeria::findOrFail($id);
        return response()->json($galeria);
    }

    public function update(Request $request, $id)
    {
        $galeria = Galeria::findOrFail($id);
        $galeria->update($request->all());
        return response()->json($galeria);
    }

    public function destroy($id)
    {
        Galeria::destroy($id);
        return response()->json(null, 204);
    }
}
