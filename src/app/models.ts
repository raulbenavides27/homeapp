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
  