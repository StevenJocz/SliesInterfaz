
export interface RegistroCursos {
    id: number;
    titulo: string;
    activo: boolean;
    pago: boolean;
    formal: boolean;
    acompanante: boolean;
    menorEdad: boolean;
    grupal: boolean;
    descripcion: string;
    limitarCupos: boolean;
    cantidadCupos: number;
    categoría: string;
    tipoCurso: string;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    fechaLimiteInscripcion: Date | null;
    imagen?: string;
    baseImagen?: string;
    creador: number;
    nombreTipoCurso?: string;
    nombrecategoría?: string;
    lugar: string;
    dependencia: string;
    precios: {};
    profesores: {
        id: number;
        foto: string;
        nombre: string;
        documento: string | null;
        correo: string | null;
        contacto: string | null;
        profesion: string;
    }[];
}


export interface ListCursos {
    id: number;
    titulo: string;
    descripcion: string;
    categoría: string;
    tipoCurso: string;
    fechaInicio: Date;
    fechaFin: Date;
    fechaLimiteInscripcion: Date;
    activo: boolean;
}

export interface Tema {
    id: number;
    titulo: string;
    descripcion: string;
    video: string;
    enlace: string;
    idUsuario: number;
    nombreUsuario: string;
    fechaRegistro: Date;
}

export interface Modulo {
    id: number;
    titulo: string;
    idUsuario: number;
    nombreUsuario: string;
    fechaRegistro: Date;
}