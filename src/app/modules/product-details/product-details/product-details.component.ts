import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../dashboard/models/product.interface';
import { ProdutsService } from '../../dashboard/services/produts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit , OnDestroy {
  private unsubscribe: Subscription[] = [];

  id: any = this.route.snapshot.paramMap.get('id');
  product!:Product | any;

  countProduct:number = 0;
  constructor(private produtsService:ProdutsService,private route:ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
   const sub = this.produtsService.getAllProductById(this.id).subscribe((data) =>{
      this.product = data[0];
    });
   this.unsubscribe.push(sub);
  }

  increase(){
    this.countProduct++;
  }

  decrease(){
    if(this.countProduct >= 1 ){
      this.countProduct--;
    }
  }

  addToCart(){
    var storeCount = localStorage.getItem('countCart');
    if(storeCount){
      this.countProduct += parseInt(storeCount);
    }
    localStorage.setItem('countCart',this.countProduct.toString());
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
