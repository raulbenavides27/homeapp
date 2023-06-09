export interface Propiedad{
    nombre: string;
    direccion:string;
    numero: Number;
    comuna: string;
    contacto: string;
    telefono: Number;
    id: string;
    fecha: Date;
    tipo: string;
    foto: string;
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
    estado: string
}