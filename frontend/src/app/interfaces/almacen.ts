export interface Almacen {
    id: number;
    codigo: string;
    producto: string;
    familia: string;
    id_proveedor: number;
    coste: number;
    iva: number;
    pvp: number;
    existencia_min: number;
    existencia_actual: number;
    estado: string;
  }