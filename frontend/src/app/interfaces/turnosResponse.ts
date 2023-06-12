export interface TurnosResponse{
    id?:number;
    id_admin:number;
    id_menu?:number;
    n_plazas:number;
    observaciones:string;
    fecha:Date;
    turno:string;
    visible:number;
    formas_pago:string;
    updated_at?:string;
    created_at?:string;
}