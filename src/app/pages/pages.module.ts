import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule} from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { ProductoComponent } from './producto/producto.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { TokenComponent } from './login/recuperar/token/token.component';
import { Not404Component } from './not404/not404.component';
import { Not403Component } from './not403/not403.component';
import { ProductoEdicionComponent } from './producto/producto-edicion/producto-edicion.component';
import { PresentacionEdicionComponent } from './presentacion/presentacion-edicion/presentacion-edicion.component';
import { ThreeDigitDecimaNumberDirective } from '../directives/three-digit-decima-number.directive';
import { VentaComponent } from './venta/venta.component';
import { VentaDetalleDialogoComponent } from './venta/venta-detalle-dialogo/venta-detalle-dialogo.component';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        PdfViewerModule,
        PagesRoutingModule
      ],
    exports: [],
    declarations: [
        LayoutComponent,
        ProductoComponent,
        PresentacionComponent,
        InicioComponent,
        RecuperarComponent,
        TokenComponent,
        Not404Component,
        Not403Component,
        ProductoEdicionComponent,
        PresentacionEdicionComponent,
        ThreeDigitDecimaNumberDirective,
        VentaComponent,
        VentaDetalleDialogoComponent
    ],
    providers: []
})
export class pagesModule { }
