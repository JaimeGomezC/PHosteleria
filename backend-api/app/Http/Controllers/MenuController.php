<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Menu;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $menus = Menu::all();
        return response()->json($menus);
    }
    
    public function show($id)
    {
        $menu = Menu::find($id);
        return response()->json($menu);
    }
    
    public function store(Request $request)
    {
        $menu = new Menu();
        $menu->nombre_menu = $request->nombre_menu;
        $menu->imagen_menu = $request->imagen_menu;
        $menu->precio_pax = $request->precio_pax;
        $menu->observaciones = $request->observaciones;
        $menu->id_admin = $request->id_admin;
        $menu->save();
        return response()->json($menu);
    }
    
    public function update(Request $request, $id)
    {
        $menu = Menu::find($id);
        $menu->nombre_menu = $request->nombre_menu;
        $menu->imagen_menu = $request->imagen_menu;
        $menu->precio_pax = $request->precio_pax;
        $menu->observaciones = $request->observaciones;
        $menu->id_admin = $request->id_admin;
        $menu->save();
        return response()->json($menu);
    }
    
    public function destroy($id)
    {
        $menu = Menu::find($id);
        $menu->delete();
        return response()->json(['message' => 'Menu deleted successfully']);
    }
}