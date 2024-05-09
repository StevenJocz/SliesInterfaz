
export interface UsuarioLogin {
  idUsuario: number; 
  nombre: string; 
  correo: string; 
  foto: string; 
  tipoUsuario: number; 
  exp: string; 
  iat: string;
  nbf: string;
}


export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  tipoDocumento: number;
  documento: string;
  fechaNacimiento: Date;
  celular: string;
  pais: number;
  departamento: number;
  ciudad: number;
  direccion: string;
  foto: string;
  activo: boolean;
  fechaRegistro: Date;
  password: string;
}

export interface UsuariosInformacion {
  id: number;
  nombre: string;
  correo: string;
  tipoDocumento: string;
  documento: string;
  fechaNacimiento: string;
  celular: string;
  pais: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  foto: string;
  activo: boolean;
  fechaRegistro: string;
  rol: number;
  esProfesor : boolean;
}

export interface UserAcademicInformationDTOs {
  id: number;
  idUsuario: number;
  posgrado: string;
  posgradoInstitute: string;
  posgradoAgno: string;
  pregrado: string;
  pregradoInstitute: string;
  pregradoAgno: string;
}

export interface Profesores {
  id: number;
  foto: string;
  nombre: string;
  documento: string;
  correo: string;
  contacto: string;
  profesion: string;
  activo: boolean;
}

export interface AsignarProfesores {
  accion: number;
  idUsuario: number;
  profesion: string;
  foto: string;
}

