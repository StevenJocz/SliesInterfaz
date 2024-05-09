import './view.css';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline, logoFacebook, logoInstagram, logoWhatsapp, callOutline, mailOutline, calendarOutline, bookmarksOutline, locationOutline } from "ionicons/icons";
import { Link, useLocation } from 'react-router-dom';
import { Inscripcion } from '../../../componentes/inscripcion';
import { useEffect, useState } from 'react';
import imglogo from '../../../assets/img/unac.png'
import { Field, Form, Formik } from 'formik';
import { Footer } from '../../../componentes/footer';
import { RegistroCursos, services } from '../../../models';
import { api } from '../../../services';
import { format } from 'date-fns';
import { Login } from '../../../componentes/loginDos';

const View = () => {
    const [verInscripcion, setVerInscripcion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [cursos, setCursos] = useState<RegistroCursos[]>([]);
    const location = useLocation();
    const idCurso = location.pathname.split("/")[2];
    const [verContacto, setVerContacto] = useState(false);

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    useEffect(() => {
        handleGet();
    }, []);


    const handleGet = async () => {
        try {
            setIsLoading(true);
            const response = await api.get<RegistroCursos[]>('Courses/GetIdCourses', { idCurso: idCurso });
            if (response.data.length > 0) {
                setCursos(response.data);
            }
            const intervalId = setInterval(() => {
                setIsLoading(false);
            }, 1000);

            return () => clearInterval(intervalId);

        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const VerInscripcion = () => {
        setVerInscripcion(!verInscripcion);
    };

    const haddleVerContacto = () => {
        setVerContacto(!verContacto);
    };

    const EnviarContacto = async () => {
        try {
            setIsLoading(true);
            // Aquí va la lógica para enviar el contacto
            setIsLoading(false);

        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsLoading(false);
        }
    };

    return isLoading ? (
        <div className='Loader'>
            <p>SLIES</p>
            <div className="Loader_circulo">
                <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div>
        </div>
    ) : (
        cursos && (
            cursos.map((curso, index) => (
                <div className='view' key={index}>
                    <div >
                        <div className={`view_fondo viewFondo${curso.nombrecategoría}`}></div>
                        <div className='view_fondoDos'></div>
                    </div>
                    <div className='view_info'>
                        <div className="view_info-tipo">
                            <Link to='/#Cursos'>
                                <div className='view_info-tipo-atras'>
                                    <IonIcon className="icono" icon={chevronBackOutline} />
                                    <h4>Volver a inicio</h4>
                                </div>
                            </Link>
                            <h2 className={`textinfo-tipo${curso.nombrecategoría}`}>{curso.nombrecategoría}</h2>
                        </div>
                        <div className="view_info-titulo">
                            <img src={`${services.url}/${curso.imagen}`} alt={curso.nombrecategoría} />
                            <h1>{curso.titulo}</h1>
                            <div className='view_info-compartir'>
                                <h2>Compartir en:</h2>
                                <IonIcon className="icono" icon={logoFacebook} />
                                <IonIcon className="icono" icon={logoInstagram} />
                                <IonIcon className="icono" icon={logoWhatsapp} />
                            </div>
                            <div className='viewCursos_body--contenido-acciones'>
                                <div className='viewCursos_acciones-content'>
                                    <div className='viewCursos_acciones--content-link'>
                                        <IonIcon className="icono" icon={calendarOutline} />
                                        <div>
                                            <h2>Fecha</h2>
                                            <p> {curso.fechaInicio && curso.fechaFin &&
                                                `${format(new Date(curso.fechaInicio), "dd 'de' MMMM")} hasta ${format(new Date(curso.fechaFin), "dd 'de' MMMM 'del' yyyy")}`}</p>
                                        </div>
                                    </div>
                                    <div className='viewCursos_acciones--content-linea'></div>
                                </div>
                                <div className='viewCursos_acciones--content'>
                                    <div className='viewCursos_acciones--content-link'>
                                        <IonIcon className="icono" icon={bookmarksOutline} />
                                        <div>
                                            <h2>Modalidad</h2>
                                            <p> {curso.nombreTipoCurso}</p>
                                        </div>
                                    </div>
                                    <div className='viewCursos_acciones--content-linea'></div>
                                </div>
                                <div className='viewCursos_acciones--content'>
                                    <div className='viewCursos_acciones--content-link'>
                                        <IonIcon className="icono" icon={locationOutline} />
                                        <div>
                                            <h2>Lugar</h2>
                                            <p> {curso.lugar}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='view_info-contenido'>
                                <div dangerouslySetInnerHTML={{ __html: curso.descripcion }} />
                            </div>
                            {curso.profesores.length > 0 && (
                                <div className='view_info-profesores'>
                                    <h4>Profesores</h4>
                                    <div className='view_info-profesores-view'>
                                        {curso.profesores.map((profesor, index) => (
                                            <div className='view_info-profesores-content' key={index}>
                                                <img src={`${services.url}/${profesor.foto}`} alt={profesor.nombre} />
                                                <div>
                                                    <h2>{profesor.nombre}</h2>
                                                    <h3>{profesor.profesion}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            )}
                            <Footer />
                        </div>
                    </div>

                    <div className='view_contect'>
                        <div className='view_contect--contacto'>
                            <h2>¿Quieres recibir más información?</h2>
                            <div className='view_contect--contacto-formulario'>
                                <Formik
                                    initialValues={{
                                        correoElectronico: '',
                                        nombre: '',
                                        celular: '',
                                    }}
                                    validate={(valor) => {
                                        let errors: any = {};
                                        if (!valor.correoElectronico) {
                                            errors.correoElectronico = '* Introduce tu correo electrónico.';
                                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valor.correoElectronico)) {
                                            errors.correoElectronico = '* Introduce una dirección de correo electrónico válida.';
                                        }

                                        if (!valor.nombre) {
                                            errors.nombre = '* Introduce tu nombre.';
                                        }

                                        if (!valor.celular) {
                                            errors.celular = '* Introduce tu numero de teléfono.';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        // Lógica para enviar los datos del formulario (usando la función EnviarContacto)
                                        EnviarContacto();
                                        values
                                        setSubmitting(false);
                                    }}
                                >
                                    {({ errors, isSubmitting }) => (
                                        <Form>
                                            <div className="">
                                                <Field
                                                    type='text'
                                                    name='nombre'
                                                    placeholder='Nombre completo*'
                                                    className={errors.nombre ? 'Input_Border_Red' : ''}
                                                />
                                            </div>
                                            <div className="">
                                                <Field
                                                    type='email'
                                                    name='correoElectronico'
                                                    placeholder='tu@correo.com*'
                                                    className={errors.correoElectronico ? 'Input_Border_Red' : ''}
                                                />
                                            </div>
                                            <div className="">
                                                <Field
                                                    type='text'
                                                    name='celular'
                                                    placeholder='Celular*'
                                                    className={errors.celular ? 'Input_Border_Red' : ''}
                                                />
                                            </div>
                                            <div className='view_contect--contacto-formulario-datos'>
                                                <a href="">Ver autorización de datos personales</a>
                                                <div>
                                                    <input type="checkbox" /> <p>Acepto el tratamiento de datos personales.*</p>
                                                </div>
                                                <div>
                                                    <input type="checkbox" /> <p>Acepto el tratamiento de datos sensibles.*</p>
                                                </div>
                                            </div>
                                            <i className='mensaje'>{msg}</i>
                                            <button type="submit" disabled={isSubmitting}>
                                                Enviar
                                            </button>

                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        <div className='view_contect--contacto-acciones'>
                            <button className='view_contect--contacto-acciones-incripcion' onClick={VerInscripcion}>Inscríbete</button>
                            <button className='view_contect--contacto-acciones-incripcion-Dos'>Consulta nuestra política de descuento y formas de pago</button>
                            {verContacto && (
                                <div className='view_contect--contacto-acciones-incripcion--contacto'>
                                    <a href="tel: (60+1)3324363"> <IonIcon className="icono" icon={callOutline} />(60+1)0000000</a>
                                    <a target="_blank" href="https://api.whatsapp.com/send?phone=312 0000000"><IonIcon className="icono" icon={logoWhatsapp} /> +(57) 312 0000000 </a>
                                    <p > <IonIcon className="icono" icon={mailOutline} />educacioncontinua@unac.edu.co</p>
                                </div>
                            )}

                            <button className='view_contect--contacto-acciones-incripcion' onClick={haddleVerContacto} >Contáctanos</button>
                        </div>
                    </div>
                    <div className='view_tipo'>
                        <h1 key={index}>{curso.nombrecategoría}</h1>

                    </div>
                    <img className='LogoUnac' src={imglogo} alt="" />
                    {verInscripcion && (
                        token && user ? (
                            <Inscripcion onClose={VerInscripcion} idCurso={parseInt(idCurso)} data={cursos}/>
                        ) : (
                            <Login
                                onClose={() => VerInscripcion()}
                                mostrarInicio={() => setVerInscripcion(true)}
                            />
                        )
                    )}

                </div>
            ))
        )
    );
}

export default View;
