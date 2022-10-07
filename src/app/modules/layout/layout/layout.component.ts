import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../dashboard/models/product.interface';
import { ProdutsService } from '../../dashboard/services/produts.service';
import { fromEvent, Observable , Subscription } from 'rxjs';
import { debounceTime, first } from 'rxjs/operators';
import { AuthService } from '../../auth/services/auth-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('searchBox' , {static:true})
  private searchBox!: ElementRef;

  @ViewChild('searchBox') set content(content: ElementRef) {
    if(content) { 
        this.searchBox = content;
        this.seachInput();
    }
 }

 seachKey!:string;

  allProduct$!:Observable<Product[]>;

  countCart:number = 0;
  constructor(private produtsService:ProdutsService,public authService: AuthService) {
    this.allProduct$ = this.produtsService.allProductsBehaviorSubject;
   }

  ngOnInit(): void {
    let count:any = localStorage.getItem('countCart');
    if(count){
      this.countCart = parseInt(count);
    }
  }

  reset(){
    this.seachKey = '';
    this.searchProduct();
  }

  seachInput(){
      const keyup$ = fromEvent(this.searchBox.nativeElement, 'keyup');
      keyup$.pipe(
        debounceTime(500)
      )
      .subscribe(()=>this.searchProduct());
  }

  searchProduct(){
    this.produtsService.getAllProducts({q:this.seachKey}).subscribe();
  }

}
