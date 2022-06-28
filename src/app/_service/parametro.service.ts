import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Parametro } from '../_model/parametro';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ParametroService extends GenericService<Parametro>{

  private parametroCambio = new Subject<Parametro[]>();
  
  constructor( http: HttpClient) { 
    super(http,`${environment.HOST}/parametros`);
  }

  listarParametroPorIdCabecera(cabecera: string){
    return this.http.get<Parametro[]>(`${this.url}/detalle/cabecera/${cabecera}`);
  }

  getParametroCambio(){
    return this.parametroCambio.asObservable();
  }

  setParametroCambio(parametros: Parametro[]){
    this.parametroCambio.next(parametros);
  }
}
