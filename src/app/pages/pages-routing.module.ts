import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from '../_service/guard.service';
import { Not403Component } from './not403/not403.component';
import { InicioComponent } from './inicio/inicio.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductoEdicionComponent } from './producto/producto-edicion/producto-edicion.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { PresentacionEdicionComponent } from './presentacion/presentacion-edicion/presentacion-edicion.component';
import { VentaComponent } from './venta/venta.component';

export const routes: Routes = [
  { path: 'inicio', component: InicioComponent, canActivate: [GuardService] },
  {
    path: 'producto', 
    component: ProductoComponent,
    children: [
      { path:"nuevo", component: ProductoEdicionComponent },
      { path: "edicion/:id", component: ProductoEdicionComponent }
    ],
    canActivate: [GuardService]
  },
  {
    path: 'presentacion/:idProducto', 
    component: PresentacionComponent,
    children: [
      { path:"nuevo", component: PresentacionEdicionComponent },
      { path: "edicion/:idPresentacion", component: PresentacionEdicionComponent }
    ],
    canActivate: [GuardService]
  },
  { path: 'venta', component: VentaComponent, canActivate: [GuardService] },
  {path: 'not-403', component: Not403Component}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PagesRoutingModule { }