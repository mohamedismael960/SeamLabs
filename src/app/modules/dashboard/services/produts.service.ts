import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Product } from '../models/product.interface';
import { environment } from 'src/environments/environment';
import { createRequestOption } from 'src/app/core/request/request';

export type EntityResponseType = HttpResponse<Product>;


@Injectable({
  providedIn: 'root'
})
export class ProdutsService {
  private readonly baseURL = environment.baseURL;
   allProductsBehaviorSubject = new BehaviorSubject<any>([]); 
  constructor(private http: HttpClient) { }

  getAllProducts(req?:any) : Observable<EntityResponseType[]>{
    const options = createRequestOption(req);
   return this.http.get(this.baseURL + "products" , { params: options }).pipe(
      map((products:EntityResponseType[] | any) => {
        this.allProductsBehaviorSubject.next(products);
        return products;
      })
    )
  }

  getAllProductById(id:number) : Observable<EntityResponseType[]>{
   return this.http.get(this.baseURL + "products/" , { params:{id} }).pipe(
      map((product:EntityResponseType[] | any) => {
        return product;
      })
    )
  }

}
