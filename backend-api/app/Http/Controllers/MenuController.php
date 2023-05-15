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

    public function mostrarImagen($nombreImagen)
{

    // $path = storage_path("imagenes_menus" . DIRECTORY_SEPARATOR . $nombreImagen);

    // return response()->file($path);
    
    $rutaImagen = public_path('imagenes_menus\\' . $nombreImagen);
    if (File::exists($rutaImagen)) {
        return response()->file($rutaImagen);
    }
    if (File::exists($rutaImagen)) {

        $contenido = File::get($rutaImagen);
        $tipoImagen = File::mimeType($rutaImagen);

        return Response::make($contenido, 200, [
            'Content-Type' => $tipoImagen,
            'Content-Disposition' => 'inline; filename="'.$nombreImagen.'"'
        ]);
    }

    return response()->json(['message' => 'Error no se encuentra el archivo22: '.$rutaImagen],404);
}

}