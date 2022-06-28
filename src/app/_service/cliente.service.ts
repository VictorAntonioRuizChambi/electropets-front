import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../_model/cliente';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends GenericService<Cliente>{
  private clienteCambio = new Subject<Cliente[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(http,`${environment.HOST}/clientes`);
  }

  //get Subjects
  getClienteCambio(){
    return this.clienteCambio.asObservable();
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  //set Subjects
  setProductoCambio(clientes: Cliente[]){
    this.clienteCambio.next(clientes);
  }

  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }
}
