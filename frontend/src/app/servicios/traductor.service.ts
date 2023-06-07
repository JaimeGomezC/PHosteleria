import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class TraductorService {
  public idiomaSeleccionado: string; // Idioma seleccionado
  private translations: any = {};

  constructor(private http: HttpClient,private localStorage: LocalStorageService) {
    this.idiomaSeleccionado = this.localStorage.get('idioma') || 'es'; // Obtener el idioma seleccionado del almacenamiento local
    this.loadTranslations(); // Cargar las traducciones
   }

  // Carga los archivos de traducción para todos los idiomas
  loadTranslations(): Promise<any> {
    const supportedLanguages = ['es', 'en','pt','fr','it']; // Agrega aquí los códigos de los idiomas que admites

    const translationPromises = supportedLanguages.map(lang => {
      const translationFile = `assets/i18n/${lang}.json`;
      return this.http.get(translationFile).toPromise()
        .then(translation => {
          this.translations[lang] = translation;
        })
        .catch(error => {
          console.error(`Error loading translation file "${translationFile}":`, error);
        });
    });

    return Promise.all(translationPromises);
  }

  // Obtiene el mensaje traducido para la clave y el idioma especificados
  translate(key: string, lang: string): string {
    if (this.translations[lang] && this.translations[lang][key]) {
      return this.translations[lang][key];
    }

    // console.warn(`Translation not found for key "${key}" and language "${lang}"`);
    return key;
  }

  // Cambia el idioma actual y recarga las traducciones
  cambiarIdioma(idioma: string): void {
    this.idiomaSeleccionado = idioma;
    this.localStorage.set('idioma', idioma);
    // Vuelve a cargar las traducciones para el nuevo idioma
    this.loadTranslations()
      .catch(error => {
        console.error('Error reloading translations:', error);
      });
  }
}