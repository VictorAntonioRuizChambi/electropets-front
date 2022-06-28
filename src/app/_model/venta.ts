import { Cliente } from "./cliente";

export class Venta {
    idVenta: number;
	cliente: Cliente;
	codComprobante: string;
    descripcion: string;
	total: number;
	utilidad: number;
	fecha: Date;
	estado: string;
}