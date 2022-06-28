import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Presentacion } from '../_model/presentacion';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService extends GenericService<Presentacion>{

  private presentacionCambio = new Subject<Presentacion[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) { 
    super(http,`${environment.HOST}/presentaciones`);
  }

  //getSubjects
  getPresentacionCambio(){
    return this.presentacionCambio.asObservable();
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  //setSubjects
  setPresentacionCambio(presentaciones: Presentacion[]){
    this.presentacionCambio.next(presentaciones);
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

  listarPorIdProducto(id: number){
    return this.http.get<Presentacion[]>(`${environment.HOST}/presentaciones/producto/${id}`);
  }
}
