import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Producto } from './../../_model/producto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductoService } from 'src/app/_service/producto.service';
import { PresentacionService} from 'src/app/_service/presentacion.service';
import { Presentacion } from 'src/app/_model/presentacion';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit {

  displayedColumns = ['codPresentacion', 'descripcion', 'unidadMedida', 'precioCosto', 'precioVentaMaxima', 'precioVentaMinima', 'stock', 'acciones' ];
  dataSource: MatTableDataSource<Presentacion>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  urlConIdProducto: boolean = false;
  idProducto: number;

  constructor(
    private presentacionService: PresentacionService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.presentacionService.getPresentacionCambio().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.presentacionService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'Aviso', {
        duration: 2000
      });
    });

    this.route.params.subscribe((params: Params) => {
      this.idProducto = params['idProducto'];
      this.urlConIdProducto = params['idProducto']!=null;
      this.init();
    });

    
  }

  init(){
    if(this.urlConIdProducto){
      this.initFromProductId();
    }
  }

  initListAll(){
    this.presentacionService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  initFromProductId(){
    this.presentacionService.listarPorIdProducto(this.idProducto).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

  eliminar(presentacion: Presentacion){
    this.presentacionService.eliminar(presentacion.idPresentacion).pipe(switchMap(() => {
      return this.presentacionService.listar();
    })).subscribe(data => {
      this.presentacionService.setPresentacionCambio(data);
      this.presentacionService.setMensajeCambio('Se Eliminó');
    });
  }

  nuevaPresentacion(){
    this.router.navigate([`/pages/presentacion/${this.idProducto}/nuevo`], {queryParams:{product:this.idProducto}});
}
}
