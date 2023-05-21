<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
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
    public function store(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'nombre_menu' => 'required',
        //     'precio_pax' => 'required',
        //     'imagen_menu' => 'nullable',
        //     'observaciones' => 'nullable',
        // ]);

        // if ($validator->fails()) {
        //     return response()->json(['error' => $validator->errors()], 400);
        // }

        $menu = new Menu();
        $menu->nombre_menu = $request->input('nombre_menu');
        $menu->id_admin = $request->input('id_admin');
        $menu->precio_pax = $request->input('precio_pax');
        $menu->imagen_menu =  $request->input('imagen_menu');
        $menu->observaciones = $request->input('observaciones');
        $menu->save();

        return response()->json($menu, 201);
    }
    public function show($id)
    {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json(['error' => 'Menu not found'], 404);
        }
        return response()->json($menu, 200);
    }
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nombre_menu' => 'nullable',
            'precio_pax' => 'nullable',
            'observaciones' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json(['error' => 'Menu not found'], 404);
        }

        $menu->nombre_menu = $request->input('nombre_menu');
        $menu->precio_pax = $request->input('precio_pax');
        $menu->imagen_menu = $request->input('imagen_menu');
        $menu->observaciones = $request->input('observaciones');
        $menu->save();
        return response()->json(['result' => 'ok','data' => $menu], 200);

    }

    public function destroy($id)
    {
        $menu = Menu::find($id);
        if (!$menu) {
            return response()->json(['error' => 'Menu not found'], 404);
        }
        $menu->delete();
        return response()->json(['message' => 'Menu deleted'], 200);
    }
    public function getByTurno($id_turno)
    {
        $reservas = Menu::where('id_turno', $id_turno)->get();
        return response()->json($reservas);
    }
    public function uploadImage(Request $request)
    { 
       if ($request->hasFile('imagen')) {
        $file = $request->file('imagen');

        if ($file->isValid()) {
            $fileName = $file->getClientOriginalName(). $file->getClientOriginalExtension();
            $fileName = pathinfo($fileName, PATHINFO_FILENAME);
            $name_file = str_replace(" ", "_", $fileName);

            $extension = $file->getClientOriginalExtension();

            $picture = date("His") . "-" . $name_file . "." . $extension;

            $file->move(public_path('public/imagenes_menus'), $picture); // Almacena la imagen en una carpeta llamada 'menu_images'
            $baseUrl = config('app.url');
            $imageUrl = $baseUrl . ':8000/public/imagenes_menus/' . $picture;

            return response()->json(['message' => 'Imagen subida exitosamente', 'url' => $imageUrl]);
        } else {
            return response()->json(['message' => 'Error al subir la imagen. Archivo no válido.']);
        }
    } else {
        return response()->json(['message' => 'Error al subir la imagen. No se ha enviado ningún archivo.']);
    }

    }
    public function deleteImage(Request $request)
    {
        $imageName = $request->input('imagen_menu');
    
        if (!empty($imageName)) {
            // Obtener la ruta completa de la imagen
            $imagePath = public_path('') . $imageName;
            // $imagePath ='C:\wamp64\www\ProyectoHosteleria\backend-api\public\public\imagenes_menus\073619-linux.jpg';
    
            // Verificar si la imagen existe
            if (file_exists($imagePath)) {
                // Eliminar la imagen
                unlink($imagePath);
    
                // Aquí puedes realizar cualquier otra acción necesaria, como eliminar el registro de la base de datos, etc.
    
                return response()->json(['message' => 'Imagen eliminada correctamente'], 200);
            } else {
                return response()->json(['message' => 'La imagen no existe'.$imagePath], 404);
            }
        } else {
            return response()->json(['message' => 'Nombre de imagen no proporcionado'], 400);
        }
    }

}