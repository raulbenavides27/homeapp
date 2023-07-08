import { Interface } from "readline";
// nuestro principal es la propiedad 
export interface Propiedad {
    id: string;
    id_propiedad: string;
    referencia: string;
    direccion: string;
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
// cliente es el usuario de la inmobiliaria
export interface Cliente {
    uid: string;
    email: string;
    password: string;
    nombre: string;
    foto: string;
    confirmacion: string;
    ubicacion: any;
}
// entidad es contacto el cual arrienda o es dueño de la propiedad 
export interface Entidad {
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
    tipoServicio: string;
    //  whatsapp: string;
}
export interface Cuentas {
    idCuentas: string,
    id_propiedad: string
    tipoCuenta: string,
    empresa: string,
    numCliente: string
}

export interface Gastos {
    Estado: string,
    Nombre_emisor: string,
    Num_documento: number,
    Numero_cliente: string,
    Total: string,
    fecha_emision: Date,
    fecha_vencimiento: Date,
    rut_emisor: string,
    neto: string,
    id_documento: string,
    iva: string,
    giro: string,
    
}
export interface Estado {
    id: string,
    idEstado: string,
    ventanas: string,
    paredes: string,
    suelo: string,
    muebles: string,
    wc: string,
    cocina: string
}
<<<<<<< HEAD




export interface Soporte{
    name: string,
    email: string,
    idSoporte: string,
    mensaje: string
}

export interface Historial{
=======
export interface Historial {
>>>>>>> fase_3
    id_historial: string;
    id_responsable: string;
    id_propiedad: string;
    fecha: Date;
    tipo: string;
    estado: String;
    condicion: String;
    ubicacion: any;
<<<<<<< HEAD
    
=======
>>>>>>> fase_3

}