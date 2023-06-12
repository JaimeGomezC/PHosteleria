<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Almacen;

class AlmacenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $almacenes = Almacen::all();
        return view('almacen.index', compact('almacenes'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('almacen.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'codigo' => 'required',
            'producto' => 'required',
            'familia' => 'required',
            'id_proveedor' => 'required|exists:proveedores,id',
            'coste' => 'required',
            'iva' => 'required',
            'pvp' => 'required',
            'existencia_min' => 'required',
            'existencia_actual' => 'required',
            'estado' => 'required',
        ]);

        Almacen::create($data);

        return redirect()->route('almacen.index')->with('success', 'Registro creado exitosamente.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Almacen  $almacen
     * @return \Illuminate\Http\Response
     */
    public function show(Almacen $almacen)
    {
        return view('almacen.show', compact('almacen'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Almacen  $almacen
     * @return \Illuminate\Http\Response
     */
    public function edit(Almacen $almacen)
    {
        return view('almacen.edit', compact('almacen'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Almacen  $almacen
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Almacen $almacen)
    {
        $data = $request->validate([
            'codigo' => 'required',
            'producto' => 'required',
            'familia' => 'required',
            'id_proveedor' => 'required|exists:proveedores,id',
            'coste' => 'required',
            'iva' => 'required',
            'pvp' => 'required',
            'existencia_min' => 'required',
            'existencia_actual' => 'required',
            'estado' => 'required',
        ]);

        $almacen->update($data);

        return redirect()->route('almacen.index')->with('success', 'Registro actualizado exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Almacen  $almacen
     * @return \Illuminate\Http\Response
     */
    public function destroy(Almacen $almacen)
    {
        $almacen->delete();

        return redirect()->route('almacen.index')->with('success', 'Registro eliminado exitosamente.');
    }
}
