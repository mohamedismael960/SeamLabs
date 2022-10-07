import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../dashboard/models/product.interface';

@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  transform(products: any, filters:any): any {
    // if(filters.cellPhones || filters.electronics){
    //   products = products
    //   .filter((product:any) => {
    //     if(filters.cellPhones && product.type == 'phone'){
    //       return true;
    //     }
    //     if(filters.electronics && product.type == 'electronics'){
    //       return true;
    //     }
    //     return false;
    //   });
    // }
    if(filters.price100To250 || filters.price250To400){
      products = products.filter((product:any) => {
        if(filters.price100To250){
          if((product.price >= 100 && product.price <= 250)){
            return true;
          }
        }
         if(filters.price250To400){
          if((product.price >= 250 && product.price <= 400)){
            return true;
          }
        }
        return false;
      });
    }    
    if(filters.lowHighPrice == 'low'){
      products.sort((a:any,b:any) => a.price - b.price);
    }
    if(filters.lowHighPrice == 'high'){
      products.sort((a:any,b:any) =>  b.price - a.price);
    }
    return products;
  }

}
