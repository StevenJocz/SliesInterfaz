import { Breadcrumbs, Typography } from "@mui/material";
import { Table } from "../../components/table";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddCursos, Participantes } from ".";
import { api } from "../../../../services";
import { format, } from 'date-fns';
import { ModulosCursos } from "../cursosProfesor";


const Cursos = () => {
    const [dataCursos, setDataCursos] = useState<any>(null);
    const [modalRegistro, setModalRegistro] = useState(false);
    const [verParticipantes, setVerParticipantes] = useState(false);
    const [modulos, setModulos] = useState(false);
    const [idCurso, setIdCurso] = useState(0);

    useEffect(() => {
        hadleGetCursos();
    }, []);

    const hadleGetCursos = () => {
        // Solicitud GET
        api.get<any>('Courses/GetListCourses', { accion: 1 }).then((response) => {
            const cursosFiltrados = response.data.map((curso: any) => ({
                id: curso.id,
                categoría: curso.categoría,
                modalidad: curso.modalidad,
                nombre: curso.titulo,
                desde_hasta: format(new Date(curso.fechaInicio), "dd 'de' MMMM 'del' yyyy")  + ' hasta ' + format(new Date(curso.fechaFin), "dd 'de' MMMM 'del' yyyy"),
                Limite_Inscripción: format(new Date(curso.fechaLimiteInscripcion), "dd 'de' MMMM 'del' yyyy"),
                activo: curso.activo
            }));
            setDataCursos(cursosFiltrados);
        });
    };
    

    const VerRegistro = (id: number) => {
        setIdCurso(id);
        setModalRegistro(!modalRegistro);
    };

    const VerParticipantes = (id: number) => {
        setIdCurso(id);
        setVerParticipantes(!verParticipantes);
    };

    const haddleModulos = (id: number) => {
        setIdCurso(id);
        setModulos(!modulos);
    };

    return (
        <div className="Curso">
            <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    SLIES
                </Link>
                {modalRegistro == true && (
                    <Link to="/Dashboard/Cursos" onClick={() => setModalRegistro(false)} color="inherit">
                        Cursos
                    </Link>
                )}

                {verParticipantes == true && (
                    <Link to="/Dashboard/Cursos" onClick={() => setVerParticipantes(false)} color="inherit">
                        Cursos
                    </Link>
                )}

                <Typography color="text.primary">{modalRegistro == true ? ('Crear curso') : verParticipantes == true ? ('Lista participantes') : ('Cursos')}</Typography>
            </Breadcrumbs>

            {modalRegistro == true ? (
                <AddCursos mostrarRegistro={() => setModalRegistro(false)} idCurso={idCurso} actualizarDatos={hadleGetCursos} />

            ) : verParticipantes == true ? (
                <Participantes VerParticipantes={() => setVerParticipantes(false)} idCurso={idCurso} />

            ) : modulos == true ? (
                < ModulosCursos mostrarRegistro={() => setModulos(false)} idCurso={idCurso} />

            ) :(
                <>
                    <h2>Cursos</h2>
                    <div className="Layout_contenedor">
                        {dataCursos && (
                            <Table
                                data={dataCursos}
                                mostrarRegistro={VerRegistro}
                                mostrarLista={VerParticipantes}
                                verBotonRegistro={true}
                                verBotonEditar={true}
                                verBotonBuscador={true}
                                verBotonExportar={true}
                                verListaEstudiantes={true}
                                mostrarConfiguracion={haddleModulos}
                                verBotonConfigurar={true}
                            />
                        )}

                    </div>
                </>
            )}


        </div>
    );
}

export default Cursos;
