

import { useState } from 'react';
import './Login.css'
import { ComponenteActual } from '../../models/login';
import { Iniciar, Registro, Recordar } from '../loginDos';


interface Props {
    mostrarInicio: () => void;
    onClose: () => void;
}

const Login: React.FC<Props> = (props) => {

    const [componenteActual, setComponenteActual] = useState(ComponenteActual.Iniciar);

    const mostrarRecordar = () => {
        setComponenteActual(ComponenteActual.Recordar);
    };

    const mostrarRegistro = () => {
        setComponenteActual(ComponenteActual.Registro);
    };

    const mostrarIniciar = () => {
        setComponenteActual(ComponenteActual.Iniciar);
    };

    return (
        <div className='Login'>
            <div className='Login_content-cerrar' onClick={props.onClose}> </div>
            {componenteActual === ComponenteActual.Iniciar && (
                <div className="Login_content">
                    <Iniciar mostrarRecordar={mostrarRecordar} mostrarRegistro={mostrarRegistro} onClose={props.onClose} mostrarInicio={props.mostrarInicio}/>
                </div>
            )}
            {componenteActual === ComponenteActual.Registro && (
                <div className="Login_content">
                    <Registro mostrarInicio={mostrarIniciar} onClose={props.onClose} />
                </div>
            )}

            {componenteActual === ComponenteActual.Recordar && (
                <div className="Login_content">
                    <Recordar mostrarInicio={mostrarIniciar} onClose={props.onClose} />
                </div>
            )}

        </div>
    )
}

export default Login