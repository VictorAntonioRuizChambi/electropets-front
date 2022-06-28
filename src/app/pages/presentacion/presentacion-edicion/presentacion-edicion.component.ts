import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Parametro } from 'src/app/_model/parametro';
import { ParametroService } from 'src/app/_service/parametro.service';
import { PresentacionService } from 'src/app/_service/presentacion.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductoService } from 'src/app/_service/producto.service';
import { Presentacion } from 'src/app/_model/presentacion';
import { Stock } from 'src/app/_model/stock';
import { Producto } from 'src/app/_model/producto';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-presentacion-edicion',
  templateUrl: './presentacion-edicion.component.html',
  styleUrls: ['./presentacion-edicion.component.css']
})
export class PresentacionEdicionComponent implements OnInit {

  unidadMedidaSeleccionada: Parametro;
  unidadesDeMedida: Parametro[];
  form: FormGroup;
  idPresentacion: number;
  urlConIdPresentacion: boolean = false;
  idProducto: number = 0;
  presentacion: Presentacion;
  listaStock: Stock[] = [];
  stock: Stock;


  constructor(
    private productoService: ProductoService,
    private presentacionService: PresentacionService,
    private parametroService: ParametroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'id': new FormControl('0'),
      'codigo': new FormControl(''),
      'descripcion': new FormControl(''),
      'precioCosto': new FormControl(''),
      'precioVentaMin': new FormControl(''),
      'precioVenta': new FormControl(''),
      'stockActual': new FormControl(''),
      'stockMinimo': new FormControl('')
    });

    this.listarParametrosUnidadesDeMedida();

    this.route.params.subscribe((params: Params) => {
      this.idPresentacion = params['idPresentacion'];
      this.urlConIdPresentacion = params['idPresentacion']!=null;
      
      this.init();
    });
  }

  init(){
    if(this.urlConIdPresentacion){
      this.initFromIdPresentacion();
    }else{
      this.initAll();
    }
  }

  initAll(){
    this.idProducto = Number(this.route.snapshot.queryParamMap.get('product'));
    
    this.presentacionService.listarPorIdProducto(this.idProducto).subscribe(data =>{
      if(data !== undefined && data.length > 0){
        data.sort((a,b) => a.codPresentacion.localeCompare(b.codPresentacion));
        let ultimoCodigo = data[data.length-1].codPresentacion;
        let etiquetaProducto = ultimoCodigo.substring(0,ultimoCodigo.length-3);
        let contadorString = ultimoCodigo.substring(ultimoCodigo.length-3,ultimoCodigo.length);
        let contadorNumber = Number(contadorString);
        contadorNumber += 1;
        contadorString = `00${contadorNumber}`;
        contadorString = contadorString.substring(contadorString.length-3, contadorString.length);
        
        this.form = new FormGroup({
          'id': new FormControl('0'),
          'codigo': new FormControl(`${etiquetaProducto}${contadorString}`),
          'descripcion': new FormControl(''),
          'precioCosto': new FormControl(''),
          'precioVentaMin': new FormControl(''),
          'precioVenta': new FormControl(''),
          'stockActual': new FormControl(''),
          'stockMinimo': new FormControl('')
        });

        console.log(etiquetaProducto);
        console.log(contadorString);
      }else{
        this.productoService.listarPorId(this.idProducto).subscribe(data => {
          let codigoPresentacion = `${data.codProducto}001`;

          this.form = new FormGroup({
            'id': new FormControl('0'),
            'codigo': new FormControl(codigoPresentacion),
            'descripcion': new FormControl(''),
            'precioCosto': new FormControl(''),
            'precioVentaMin': new FormControl(''),
            'precioVenta': new FormControl(''),
            'stockActual': new FormControl(''),
            'stockMinimo': new FormControl('')
          });
        });
      }
    });

    
     

    /* this.presentacionService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }); */
  }

  initFromIdPresentacion(){
    if(this.urlConIdPresentacion){
      this.presentacionService.listarPorId(this.idPresentacion).subscribe(data => {
        this.idProducto = data.producto.idProducto;
        let idPresentacion = data.idPresentacion;
        let codigo = data.codPresentacion;
        let descripcion = data.descripcion;
        let precioCosto = data.precioCosto;
        let precioVentaMin = data.precioVentaMinima;
        let precioVenta = data.precioVentaMaxima;
        let stock = data.stock[0];

        for (let i = 0; i < this.unidadesDeMedida.length; i++) {
          if (data.unidadMedida === this.unidadesDeMedida[i].etiquetaParametro) {
            this.unidadMedidaSeleccionada = this.unidadesDeMedida[i];
            break;
          }
        }

        this.form = new FormGroup({
          'id': new FormControl(idPresentacion),
          'codigo': new FormControl(codigo),
          'descripcion': new FormControl(descripcion),
          'precioCosto': new FormControl(precioCosto),
          'precioVentaMin': new FormControl(precioVentaMin),
          'precioVenta': new FormControl(precioVenta),
          'stockActual': new FormControl(stock.cantidadActual),
          'stockMinimo': new FormControl(stock.cantidadMinima)
        });
      });
    }
  }

  seleccionarUnidadMedida(e: any) {
    this.unidadMedidaSeleccionada = e.value;
  }

  listarParametrosUnidadesDeMedida(){
    this.parametroService.listarParametroPorIdCabecera('002').subscribe( data => {
      this.unidadesDeMedida = data;
    });
  }

  operar(){
    this.presentacion = new Presentacion();
    let producto = new Producto();
    producto.idProducto = this.idProducto;
    this.stock = new Stock();

    this.presentacion.codPresentacion = this.form.value['codigo'];
    this.presentacion.producto = producto;
    this.presentacion.descripcion = this.form.value['descripcion'];
    this.presentacion.unidadMedida = this.unidadMedidaSeleccionada.etiquetaParametro;
    this.presentacion.precioCosto = this.form.value['precioCosto'];
    this.presentacion.precioVentaMinima = this.form.value['precioVentaMin'];
    this.presentacion.precioVentaMaxima = this.form.value['precioVenta'];
    this.presentacion.estado = '001';

    this.stock.cantidadMinima = this.form.value['stockMinimo'];
    this.stock.cantidadActual = this.form.value['stockActual'];
    this.stock.estado = '001';
    this.listaStock.push(this.stock);
    this.presentacion.stock = this.listaStock;

    this.presentacionService.registrar(this.presentacion).pipe(switchMap(() => {
      return this.presentacionService.listarPorIdProducto(this.idProducto);
    })).subscribe(data => {
      this.presentacionService.setPresentacionCambio(data);
      this.presentacionService.setMensajeCambio("Se registró");
    });

    this.router.navigate([`/pages/presentacion/${this.idProducto}`]);
  }

  cancelar(){
      this.router.navigate([`/pages/presentacion/${this.idProducto}`]);
  }
}
