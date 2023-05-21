export interface ReservaResponse {
    id: number;
    id_cliente: number;
    id_turno: number;
    observaciones_reserva: string;
    fecha: string;
    num_comensales: number;
    forma_pago: string;
    estado: string;
    precio_total: number;
    pagado_base: number;
    pagado_total: number;
    codigo_verificacion: string;
    producto_extra: string;
  }