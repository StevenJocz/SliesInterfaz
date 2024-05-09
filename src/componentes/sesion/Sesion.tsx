import { useEffect, useState } from 'react';
import './Sesion.css'
import { Login } from '../loginDos';
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';
import { PrivateRoutes, services } from '../../models';
import { clearLocalStorage } from '../../utilities';
import { TokenKey, UserKey, resetUser } from '../../redux/states/user';
import { IonIcon } from '@ionic/react';
import { exitOutline, layersOutline, settingsOutline, fingerPrintOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { MisCursos } from '../misCursos';


const Sesion = () => {
    const [isSesion, setSesion] = useState(false);
    const [isLogin, setLogin] = useState(false);
    const [misCursos, setMisCursos] = useState(false);
    const usuario = useSelector((store: AppStore) => store.user);
    const dispatch = useDispatch();

    useEffect(() => {
        // Verificar si el usuario tiene un token en localStorage
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            setLogin(true);
        }
    }, []);

    const logOut = () => {
        clearLocalStorage(UserKey);
        clearLocalStorage(TokenKey);
        dispatch(resetUser());
        setLogin(false);
    };

    const handle = () => {
        setMisCursos(!misCursos);
    };

    return (
        <div className='Sesion'>
            {isLogin ? (
                <div className='Sesion_Iniciada'>
                    <div className='Sesion_Iniciada-user'>
                        <img src={`${services.url}/${usuario.foto}`} alt="" />
                        <div>
                            <h2>{usuario.nombre}</h2>
                            <p>{usuario.correo}</p>
                        </div>
                    </div>
                    <ul>
                        <a onClick={handle}>
                            <div className='nav_linea'></div>
                            <div className='nav_space'></div>
                            <li className=""><IonIcon className='icono' icon={layersOutline} />Mis cursos</li>
                        </a>
                        <a href="">
                            <div className='nav_linea'></div>
                            <div className='nav_space'></div>
                            <li className=""><IonIcon className='icono' icon={settingsOutline} />Configuración</li>
                        </a>
                        {usuario.tipoUsuario == 1 && (
                            <Link to={`${PrivateRoutes.PRIVATE}`} >
                                <div className='nav_linea'></div>
                                <div className='nav_space'></div>
                                <li className=""><IonIcon className='icono' icon={fingerPrintOutline} />Modulo administrador</li>
                            </Link>
                        )}
                        {usuario.tipoUsuario == 2 && (
                            <Link to={`${PrivateRoutes.PRIVATE}`} >
                                <div className='nav_linea'></div>
                                <div className='nav_space'></div>
                                <li className=""><IonIcon className='icono' icon={fingerPrintOutline} />Modulo profesor</li>
                            </Link>
                        )}
                        <a onClick={logOut}>
                            <div className='nav_linea'></div>
                            <div className='nav_space'></div>
                            <li className=""><IonIcon className='icono' icon={exitOutline} />Cerrar</li>
                        </a>

                    </ul>
                </div>
            ) : (

                <div className='Sesion_NoIniciada'>
                    <button onClick={() => setSesion(!isSesion)}>Iniciar</button>
                </div>

            )
            }
            {isSesion && (
                <Login
                    onClose={() => setSesion(!isSesion)}
                    mostrarInicio={() => setLogin(true)}
                />
            )}

            {misCursos && (
                <MisCursos
                 onClose={() => setMisCursos(false)}
                />
            )}

        </div>
    )
}

export default Sesion