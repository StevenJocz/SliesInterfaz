import { RoutesWithNotFound } from '../../../../utilities';
import { Route } from 'react-router-dom';
import { Cursos } from '../../pages/cursos';
import { Inicio } from '../../pages/inicio';
import { Usuarios } from '../../pages/usuarios';
import { Configuracion } from '../../pages/configuration';
import { Inscripciones } from '../../pages/incripciones';
import Informes from '../../pages/informes/Informes';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';
import { CursosProfesor } from '../../pages/cursosProfesor';

const Rutas = () => {
    const usuario = useSelector((store: AppStore) => store.user);

    return (
        <RoutesWithNotFound>
            {usuario.tipoUsuario == 1 ? (
                <>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/Cursos" element={<Cursos />} />
                    <Route path="/Usuarios" element={<Usuarios />} />
                    <Route path="/Configuracion/*" element={<Configuracion />} />
                    <Route path="/Inscripciones" element={<Inscripciones />} />
                    <Route path="/Informes" element={<Informes />} />
                    <Route path="/MisCursos" element={<CursosProfesor />} />
                </>
            ) : (
                <>
                    <Route path="/" element={<Inicio />} />
                    <Route path="/MisCursos" element={<CursosProfesor />} />
                </>
            )}

        </RoutesWithNotFound>
    )
}

export default Rutas