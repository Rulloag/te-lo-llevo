export class Transporte {
  id: number;
  patente: string;
  anio: number;
  marca: string;
  modelo: string;

  constructor(id: number, patente: string, anio: number, marca: string, modelo: string) {
    this.id = id;
    this.patente = patente;
    this.anio = anio;
    this.marca = marca;
    this.modelo = modelo;
  }
}
