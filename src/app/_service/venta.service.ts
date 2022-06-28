import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FiltroVentaDTO } from '../_dto/filtroVentaDTO';
import { Venta } from '../_model/venta';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class VentaService extends GenericService<Venta>{

  private ventaCambio = new Subject<Venta[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http,`${environment.HOST}/ventas`)
  }

  //getSubjects
  getVentaCambio(){
    return this.ventaCambio.asObservable();
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  //setSubjects
  setVentaCambio(ventas: Venta[]){
    this.ventaCambio.next(ventas);
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

  buscarFecha(fecha1: string, fecha2: string) {
    return this.http.get<Venta[]>(`${this.url}/buscar/fecha?fecha1=${fecha1}&fecha2=${fecha2}`);
  }

  buscarOtros(filtroVenta: FiltroVentaDTO) {
    return this.http.post<Venta[]>(`${this.url}/buscar/otros`, filtroVenta);
  }
}
