export interface Modulo {
    modulo: number;
    nombre: string;
    items: string[];
}

const modulosData: Modulo[] = [
    {
        modulo: 1,
        nombre: "Cursos",
        items: ["Cursos", "Otro"]
    },
    {
        modulo: 2,
        nombre: "Usuarios",
        items: ["Usuarios", "Modulos 2", "Modulos 3"]
    },
    {
        modulo: 3,
        nombre: "Configuración",
        items: ["Videos", "Tipo de documentos", "Paises", "Preguntas", "Tipo de cursos"]
    }
];

export default modulosData;