
import './CursosProfesor.css'
import { Breadcrumbs, Typography } from "@mui/material";
import { Table } from "../../components/table";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../../../services";
import { format, } from 'date-fns';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';
import ModulosCursos from './ModulosCursos';

const CursosProfesor = () => {
    const [dataCursos, setDataCursos] = useState<any>(null);
    const [modulos, setModulos] = useState(false);
    const [verParticipantes, setVerParticipantes] = useState(false);
    const [idCurso, setIdCurso] = useState(0);
    const usuario = useSelector((store: AppStore) => store.user);

    useEffect(() => {
        hadleGetCursos();
    }, []);

    const hadleGetCursos = () => {
        // Solicitud GET
        api.get<any>('Courses/GetListCoursesTeacher', { idProfesor: usuario.idUsuario }).then((response) => {
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
    

    const haddleModulos = (id: number) => {
        setIdCurso(id);
        setModulos(!modulos);
    };

    const VerParticipantes = (id: number) => {
        setIdCurso(id);
        setVerParticipantes(!verParticipantes);
    };

    return (
        <div className="Curso">
            <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    SLIES
                </Link>
                {modulos == true && (
                    <Link to="/Dashboard/MisCursos" onClick={() => setModulos(false)} color="inherit">
                        Mis cursos
                    </Link>
                )}
                <Typography color="text.primary">{modulos == true ? ('Configuración del curso') : verParticipantes == true ? ('Lista participantes') : ('Mis Cursos')}</Typography>
            </Breadcrumbs>
            {modulos == true ? (
                < ModulosCursos mostrarRegistro={() => setModulos(false)} idCurso={idCurso} />
            ) : (
                <>
                    <h2> Mis Cursos</h2>
                    <div className="Layout_contenedor">
                        {dataCursos && (
                            <Table
                                data={dataCursos}
                                verBotonBuscador={true}
                                mostrarConfiguracion={haddleModulos}
                                verBotonConfigurar={true}
                                mostrarLista={VerParticipantes}
                                verListaEstudiantes={true}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default CursosProfesor