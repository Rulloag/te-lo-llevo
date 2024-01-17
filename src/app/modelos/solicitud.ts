import {Transporte} from "./transporte";

export class Solicitud {
  id: number;
  numeroDeOrden: string;
  origen: string;
  destino: string;
  descripcion: string;
  direccionOrigen: string;
  direccionDestino: string;
  codigoSeguimiento: string;
  estado: string;
  transporte: Transporte | null;
  transporteSeleccionado: Transporte | null;
  transportesFiltrados: Transporte[];
  textoBusqueda: string;

  constructor(id: number, numeroDeOrden: string, origen: string, destino: string, descripcion: string, direccionOrigen: string, direccionDestino: string, codigoSeguimiento: string, estado: string, transporte: Transporte | null) {
    this.id = id;
    this.numeroDeOrden = numeroDeOrden;
    this.origen = origen;
    this.destino = destino;
    this.descripcion = descripcion;
    this.direccionOrigen = direccionOrigen;
    this.direccionDestino = direccionDestino;
    this.codigoSeguimiento = codigoSeguimiento;
    this.estado = estado;
    this.transporte = transporte;
    this.transporteSeleccionado = null;
    this.transportesFiltrados = [];
    this.textoBusqueda = '';
  }
}
