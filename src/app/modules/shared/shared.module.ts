import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    MatBadgeModule,
    MatCheckboxModule,
    MatSelectModule
  ]
})
export class SharedModule { }
