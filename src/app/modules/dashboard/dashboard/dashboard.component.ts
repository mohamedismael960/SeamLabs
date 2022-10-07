import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProdutsService } from '../services/produts.service';
import { Observable , Subscription } from 'rxjs';
import { Product } from '../models/product.interface';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit , OnDestroy {
  private unsubscribe: Subscription[] = [];

  allProduct$!:Observable<Product[]> | any;

  categoryFilter = this._formBuilder.group({
    electronics: false,
    cellPhones: false,

    any1:false,
    any2:false,
    any3:false,
    any4:false,
    any5:false,
  });

  priceFilter = this._formBuilder.group({
    price100To250:false,
    price250To400:false,
    lowHighPrice:['']
  });

  constructor(private produtsService:ProdutsService , private _formBuilder: FormBuilder) {
    this.allProduct$ = this.produtsService.allProductsBehaviorSubject;
   }

  ngOnInit(): void {
    this.getProducts();
    const sub = this.categoryFilter.valueChanges.subscribe(()=>{
        this.getProducts();
    });
    this.unsubscribe.push(sub);
  }

  getProducts(){
    const obj:any = {
      type:[]
    };
    var categories:any = this.categoryFilter.value;
    for(const category in categories){
      if(categories[category]){
        obj.type.push(category);
      }
    }
    const sub = this.produtsService.getAllProducts(obj).subscribe();
    this.unsubscribe.push(sub);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
