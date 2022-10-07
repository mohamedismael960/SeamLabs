import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    //canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: 'product-details/:id',
    //canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/product-details/product-details.module').then((m) => m.ProductDetailsModule),
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollOffset:[0,0]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
