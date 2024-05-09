import './MisCursos.css'
import { IonIcon } from "@ionic/react";
import { closeOutline, layersOutline } from "ionicons/icons";
import { Link } from 'react-router-dom';

interface Props {
    onClose: () => void;
}
const MisCursos: React.FC<Props> = (props) => {
    return (
        <div className='MisCursos'>
            <div className='MisCursos_content-cerrar' onClick={props.onClose}> </div>
            <div className='MisCursos_content'>
                <div className="MisCursos_content_header">
                    <h2>Mis Cursos</h2>
                    <IonIcon
                        className="icono"
                        onClick={props.onClose}
                        icon={closeOutline}
                    />
                </div>
                <ul className='MisCursos_content-ul'>
                    <Link to={'/CourseView/VENNVjEyMzQ1NkEyMDIyMDQwODAwMQ=='}>
                        <li className='MisCursos_content-li bgEventos'>
                            <div>
                                <h3 className='textEventos'>Evento</h3>
                                <p>Explorando la IA con ChatGPT-4: Técnicas y Estrategias del Futuro</p>
                            </div>
                            <IonIcon className='icono' icon={layersOutline} />
                        </li>
                    </Link>
                    <li className='MisCursos_content-li bgDiplomados'>
                        <div>
                            <h3 className='textDiplomados'>Diplomado</h3>
                            <p>Explorando la IA con ChatGPT-4: Técnicas y Estrategias del Futuro</p>
                        </div>
                        <IonIcon className='icono' icon={layersOutline} />
                    </li>
                    <li className='MisCursos_content-li bgCursos'>
                        <div>
                            <h3 className='textCursos'>Curso</h3>
                            <p>Explorando la IA con ChatGPT-4: Técnicas y Estrategias del Futuro</p>
                        </div>
                        <IonIcon className='icono' icon={layersOutline} />
                    </li>
                    <li className='MisCursos_content-li bgSeminarios'>
                        <div>
                            <h3 className='textSeminarios'>Seminario</h3>
                            <p>Explorando la IA con ChatGPT-4: Técnicas y Estrategias del Futuro</p>
                        </div>
                        <IonIcon className='icono' icon={layersOutline} />
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MisCursos