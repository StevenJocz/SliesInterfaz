export interface TypeDocument {
    id: number;
    abbreviacion: string;
    nombre: string;
    activo: boolean;
}

export interface CoursesType {
    id: number;
    nombre: string;
    activo: boolean;
    codigo: string;
}

export interface CoursesCategories {
    id: number;
    nombre: string;
    activo: boolean;
    codigo: string;
}

export interface TypeAttendees {
    id: number;
    nombre: string;
    activo: boolean;
    codigo: string;
}

export interface FrequentlyQuestion {
    id: number;
    pregunta: string;
    respuesta: string;
    activo: boolean;
    expandida: boolean;
}

export interface Dependence {
    id: number;
    nombre: string;
    activo: boolean;
    codigo: string;
}
