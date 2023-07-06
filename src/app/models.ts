import { Interface } from "readline";

export interface Propiedad{
    id: string;
    id_propiedad: string;
    referencia: string;
    direccion:string;
    numero: Number;
    comuna: string;
    contacto: string;
    telefono: Number;
    fecha: Date;
    tipo: string;
    estado: String;
    condicion: String;
    ubicacion: any;
    
}
export interface Historial{
    id_historial: string;
    id_responsable:string;
    id_propiedad: string;
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
    id_propiedad: string 
    tipoCuenta: string,
    empresa: string,
    numCliente: string
}  
  
export interface Entidad{
    id_entidad: string;
    id_propiedad: string;
  //  id_responsable: string; // para cuando exista historial
    nombre: string;
    apellidop: string;
    apellidom: string;
    rut: string;
    tipoContacto: string;
    tipoEntidad: string; //persona natural / empresa 
    giro: string; //solo para empresas 
    email: string;
    direccion: string;
    telefono: string;
  //  whatsapp: string;
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