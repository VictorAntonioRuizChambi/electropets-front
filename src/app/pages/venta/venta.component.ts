import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { FiltroVentaDTO } from 'src/app/_dto/filtroVentaDTO';
import { VentaService } from 'src/app/_service/venta.service';
import * as moment from 'moment';
import { Venta } from 'src/app/_model/venta';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { VentaDetalleDialogoComponent } from './venta-detalle-dialogo/venta-detalle-dialogo.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  form: FormGroup;
  displayedColumns = ['cliente', 'codComprobante', 'descripcion', 'total', 'utilidad', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<Venta>;

  @ViewChild('tab') tabGroup: MatTabGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private ventaService: VentaService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'razonSocial': new FormControl(''),
      'numDocumento': new FormControl(''),
      'nombreCompleto': new FormControl(''),
      'fechaConsulta1': new FormControl(),
      'fechaConsulta2': new FormControl(),
    });
  }


  buscar() {
    if (this.tabGroup.selectedIndex == 0) {
      let numDocumento = this.form.value['numDocumento']; //this.form.get('dni').value;
      let nombreCompleto = this.form.value['nombreCompleto']; //this.form.get('nombreCompleto').value;
      let razonSocial = this.form.value['razonSocial'];

      let filtro = new FiltroVentaDTO(numDocumento, nombreCompleto, razonSocial);

      if (filtro.numDocumento.length === 0) {
        delete filtro.numDocumento;
      }

      if (filtro.nombreCompleto.length === 0) {
        delete filtro.nombreCompleto
      }   

      if (filtro.razonSocial.length === 0) {
        delete filtro.razonSocial
      }
      
      this.ventaService.buscarOtros(filtro).subscribe(data => {
        this.crearTabla(data);
      });

    } else {
      let fecha1 = this.form.value['fechaConsulta1'];
      let fecha2 = this.form.value['fechaConsulta2'];

      fecha1 = moment(fecha1).format('YYYY-MM-DDTHH:mm:ss');
      fecha2 = moment(fecha2).format('YYYY-MM-DDTHH:mm:ss');

      this.ventaService.buscarFecha(fecha1, fecha2).subscribe(data => {
        this.crearTabla(data);
      });
    }
  }

  crearTabla(data: Venta[]) {    
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  verDetalle(venta: Venta){
    this.dialog.open(VentaDetalleDialogoComponent, {
      width: '750px',
      data: venta
    });
  }

  nuevaVenta(){
    this.dialog.open(VentaDetalleDialogoComponent, {
      width: '1000px',
      data: null
    });
  }

}
