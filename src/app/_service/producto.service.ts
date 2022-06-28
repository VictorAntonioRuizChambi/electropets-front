import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../_model/producto';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto>{

  private productoCambio = new Subject<Producto[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http,`${environment.HOST}/productos`);
  }

  //get Subjects
  getProductoCambio(){
    return this.productoCambio.asObservable();
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  //set Subjects
  setProductoCambio(productos: Producto[]){
    this.productoCambio.next(productos);
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }
}
