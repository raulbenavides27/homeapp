import { Interface } from "readline";

export interface Propiedad{
    referencia: string;
    direccion:string;
    numero: Number;
    comuna: string;
    contacto: string;
    telefono: Number;
    id: string;
    fecha: Date;
    tipo: string;
    estado: String;
    condicion: String;
    ubicacion: any;
    
}

export interface Cliente{
    uid: string;
    email: string;
    password: string;
    nombre: string;
    foto: string;
    confirmacion: string;
    ubicacion: any;
}

export interface Cuentas{
    idCuentas: string,
    tipoCuenta: string,
    valor: string,
    estado: string,
    idPropiedad: string
}  
export interface Tarea{
    id_tarea: string;
    tipo_tarea: string;
    fecha: Date;
    responsable: string;
    propiedad: string; 
    
}
export interface entidad_comercial{
    id_entidad: string;
    rut: string;
    tipo_entidad: string; //persona natural / empresa 
    giro: string; //solo para empresas 
    email: string;
    direcion: string;
    telefono: string;
}

export interface Estado{
    id: string,
    idEstado: string,
    ventanas: string,
    paredes: string,
    suelo: string,
    muebles: string,
    wc: string,
    cocina: string    
}