import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Producto } from './../../_model/producto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/_service/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayedColumns = ['id', 'codigo', 'rubro', 'seccion', 'descripcion', 'acciones'];
  dataSource: MatTableDataSource<Producto>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private productoService: ProductoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.productoService.getProductoCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.productoService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000
      });
    });

    this.productoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  filtrar(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  eliminar(producto: Producto){
    this.productoService.eliminar(producto.idProducto).pipe(switchMap(() => {
      return this.productoService.listar();
    })).subscribe(data => {
      this.productoService.setProductoCambio(data);
      this.productoService.setMensajeCambio("se eliminó");
    });
  }

}
