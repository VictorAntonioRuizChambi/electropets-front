import { Presentacion } from "./presentacion";
import { Venta } from "./venta";

export class DetalleVenta {
    idDetalleVenta: number;
	presentacion: Presentacion;
	cantidad: number;
	precioVentaUnitario: number;
	precioVentaTotal: number;
	utilidad: number;
	estado: string;
}