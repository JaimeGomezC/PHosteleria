import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor(private http: HttpClient) { }

  charge(cantidad: number, tokenId: any){
    return this.http.post('http://localhost:8000/api/payment', {
      stripeToken: tokenId,
      cantidad: cantidad
    }).toPromise();
  }

}
