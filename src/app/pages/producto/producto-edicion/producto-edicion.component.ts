import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductoService } from './../../../_service/producto.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Producto } from './../../../_model/producto';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {

  id: number;
  producto: Producto;
  form: FormGroup;
  edicion: boolean = false;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.producto = new Producto();
    this.form = new FormGroup({
      'id': new FormControl('0'),
      'codigo': new FormControl(''),
      'rubro': new FormControl(''),
      'seccion': new FormControl(''),
      'descripcion': new FormControl('')
    }); 

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm(); 
    });
  }

  initForm(){
    if(this.edicion){
      this.productoService.listarPorId(this.id).subscribe(data => {
        let id = data.idProducto;
        let codigo = data.codProducto;
        let rubro = data.codRubro;
        let seccion = data.codSeccion;
        let descripcion = data.descripcion;

        this.form = new FormGroup({
          'id': new FormControl(id),
          'codigo': new FormControl(codigo),
          'rubro': new FormControl(rubro),
          'seccion': new FormControl(seccion),
          'descripcion': new FormControl(descripcion)
        });
      });
    }
  }

  operar(){
    this.producto.idProducto = this.form.value['id'];
    this.producto.codProducto = this.form.value['codigo'];
    this.producto.codRubro = this.form.value['rubro'];
    this.producto.codSeccion = this.form.value['seccion'];
    this.producto.descripcion = this.form.value['descripcion'];
    //REGISTRO POR DEFAULT
    this.producto.estado = '001';

    if(this.producto != null && this.producto.idProducto > 0){
      this.productoService.modificar(this.producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio("Se modificó");
      });
    }else{
      this.productoService.registrar(this.producto).pipe(switchMap(() => {
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio("Se registró");
      });
    }

    this.router.navigate(['/pages/producto']);
  }
}
