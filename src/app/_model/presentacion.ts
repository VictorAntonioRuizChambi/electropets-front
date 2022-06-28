import { Producto } from "./producto";
import { Stock } from "./stock";

export class Presentacion {
    idPresentacion: number;
    codPresentacion: string;
    producto: Producto;
    descripcion: string;
    unidadMedida: string;
    precioCosto: number;
    precioVentaMinima: number;
    precioVentaMaxima: number;
    estado: string;
    stock: Stock[];
}