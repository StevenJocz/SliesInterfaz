import './Cursos.css'
import Img from '../../assets/img/imagenFondo.png'
import { IonIcon } from '@ionic/react';
import { layersOutline, arrowForwardOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ListCursos } from '../../models';
import { api } from '../../services';
import { format } from 'date-fns';

const Cursos = () => {
    const [cursos, setCursos] = useState<ListCursos[]>([]);

    useEffect(() => {
        handleGet();
        const intervalId = setInterval(() => {
            handleGet();
        }, 600000); // 600000 milisegundos = 10 minutos

        return () => clearInterval(intervalId);
    }, []);

    const handleGet = async () => {
        try {
            const response = await api.get<ListCursos[]>('Courses/GetListCourses', { accion: 2 });

            if (response.data.length > 0) {
                setCursos(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div className='Cursos' id='Cursos'>
            <div className='Cursos_titulo'>
                <h2>Nuestros seminarios, cursos y eventos</h2>
                <img src={Img} alt="" />
            </div>

            <div className='Cursos_body' >
                {cursos.map((curso, index) => (
                    <Link  key={index} to={`/Cursos/${curso.id}/${encodeURIComponent(curso.titulo.replace('/', '-').toLowerCase().replace(/ /g, '-'))}`}>
                        <div className={`Cursos_tarjetas bg${curso.categoría}s`} >
                            <div className="Cursos_tarjetas-header">
                                <h2 className={`text${curso.categoría}s`}>{curso.categoría}</h2>
                                <IonIcon className='icono' icon={layersOutline} />
                            </div>
                            <div className="Cursos_tarjetas-body">
                                <h1>{curso.titulo}</h1>
                                <div className='Cursos_tarjetas-body-descripcion' dangerouslySetInnerHTML={{ __html: curso.descripcion }}/>
                            </div>
                            <div className="Cursos_tarjetas-footer">
                                <h2>{format(new Date(curso.fechaInicio), "dd 'de' MMMM")} al { format(new Date(curso.fechaFin), "dd 'de' MMMM 'del' yyyy")}</h2>
                                <div className='Cursos_tarjetas-footer-boton'>
                                    <IonIcon className='icono' icon={arrowForwardOutline} />
                                    <p>Información</p>
                                </div>
                            </div>
                            <div className="Cursos_tarjetas-tipo">
                                <h1>{curso.categoría}</h1>
                            </div>
                        </div>
                    </Link>
                ))}

                <div className='Cursos_tarjetas bgotramass'>
                    <div className="Cursos_tarjetas-header">
                        <h2 className='textotramass'>Otros</h2>
                        <IonIcon className='icono' icon={layersOutline} />
                    </div>
                    <div className="Cursos_tarjetas-body">
                        <h1>Competencia numérica para el calculo de dosis y administración de medicamentos</h1>
                        <p>Desarrollar la habilidad numérica para extraer los datos pertinentes y hacer el calculo necesario para establecer la dosis de un medicamento para un paciente.</p>
                    </div>
                    <div className="Cursos_tarjetas-footer">
                        <h2>Del 9 al 25 de enero de 2024</h2>
                        <h3>$599.000</h3>
                        <div className='Cursos_tarjetas-footer-boton'>
                            <IonIcon className='icono' icon={arrowForwardOutline} />
                            <p>Información</p>
                        </div>
                    </div>
                    <div className="Cursos_tarjetas-tipo">
                        <h1>OTROS</h1>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Cursos