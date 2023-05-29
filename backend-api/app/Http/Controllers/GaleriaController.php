<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Galeria;


class GaleriaController extends Controller
{
    public function index()
    {
        $galeria = Galeria::all();
        return response()->json($galeria);
    }

    public function store(Request $request)
    {
        $galeria = new Galeria();
        $galeria->nombre_imagen = $request->input('nombre_imagen');
        $galeria->id_admin = $request->input('id_admin');
        $galeria->descripcion = $request->input('descripcion');
        $galeria->tipo =  $request->input('tipo');
        $galeria->imagen_url =  $request->input('imagen_url');
        $galeria->observaciones = $request->input('observaciones');
        $galeria->save();

        return response()->json($galeria, 201);

        /*$galeria = Galeria::create($request->all());
        return response()->json($galeria, 201);*/
    }

    public function show($id)
    {

        $imagen = Galeria::find($id);
        if (!$imagen) {
            return response()->json(['error' => 'Imagen not found'], 404);
        }
        return response()->json($imagen, 200);
        
        /*$galeria = Galeria::findOrFail($id);
        return response()->json($galeria);*/
    }

    public function update(Request $request, $id)
    {
        /*$validator = Validator::make($request->all(), [
            'nombre_imagen' => 'nullable',
            'descripcion' => 'nullable',
            'observaciones' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }*/

        $imagen = Galeria::find($id);
        if (!$imagen) {
            return response()->json(['error' => 'Menu not found'], 404);
        }

        $imagen->nombre_imagen = $request->input('nombre_imagen');
        $imagen->descripcion = $request->input('descripcion');
        $imagen->imagen_url = $request->input('imagen_url');
        $imagen->tipo =  $request->input('tipo');
        $imagen->observaciones = $request->input('observaciones');
        $imagen->save();
        return response()->json(['result' => 'ok','data' => $imagen], 200);



        /*$galeria = Galeria::findOrFail($id);
        $galeria->update($request->all());
        return response()->json($galeria);*/
    }
    public function searchByTipo($tipo)
    {
        $galeria = Galeria::where('tipo', $tipo)->get();
        return response()->json($galeria);
    }
    public function destroy($id)
    {

        $imagen = Galeria::find($id);
        if (!$imagen) {
            return response()->json(['error' => 'Imagen not found'], 404);
        }
        $imagen->delete();
        return response()->json(['message' => 'Imagen deleted'], 200);

        /*Galeria::destroy($id);
        return response()->json(null, 204);*/
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
        $imageName = $request->input('imagen_url');
    
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
            return response()->json(['message' => 'Nombre de imagen no proporcionado' . $imageName], 400);
        }
    }






}
