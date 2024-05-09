import { Link } from 'react-router-dom';
import './ViewCursos.css';
import { IonIcon } from '@ionic/react';
import { chevronBackOutline, schoolOutline, megaphoneOutline, logoWhatsapp, tvOutline, calendarOutline, chevronDownOutline, closeOutline, readerOutline, chatboxEllipsesOutline, alertCircleOutline } from "ionicons/icons";
import { useState } from 'react';
import imglogo from '../../../assets/img/unac.png'
import ReactPlayer from 'react-player';
import { FormularioContaco } from '../../../componentes/contacto';
import { Comentarios } from '../../../componentes/comentarios';
import { Notas } from '../../../componentes/notas';

const viewCursos = () => {
    const [verInformacion, setVerInformacion] = useState(true);
    const [verTipoMenu, setVerTipoMenu] = useState(1);

    const VerInformacion = () => {
        setVerInformacion(!verInformacion);
    };

    const VerTipoMenu = (tipo: number) => {
        setVerTipoMenu(tipo);
    };

    const [modulos, setModulos] = useState([{
        id: 1,
        titulo: "Fundamentos y Evolución de los Modelos de Lenguaje en IA",
        temas: [
            {
                id: 1,
                expandida: false,
                titulo: "Fundamentos e introducción a Chat GPT y otros modelos de LLMs.",
                video: "https://www.youtube.com/watch?v=UVsX7A2wfLo",
                descripcion: `<p><strong>Este curso de &ldquo;Explorando la IA con ChatGPT-4: T&eacute;cnicas y</strong> Estrategias del Futuro&rdquo; proporcionar&aacute; a los estudiantes una s&oacute;lida comprensi&oacute;n de los fundamentos del procesamiento del lenguaje natural, el modelado del lenguaje y el aprendizaje autom&aacute;tico, as&iacute; como habilidades pr&aacute;cticas en el dise&ntilde;o y desarrollo de la ing de prompt y la generaci&oacute;n de im&aacute;genes a partir del uso de CHATGPT4.0. Los estudiantes aprender&aacute;n a aplicar t&eacute;cnicas avanzadas de aprendizaje autom&aacute;tico para el an&aacute;lisis y la generaci&oacute;n de texto, lo que les permitir&aacute; crear sistemas de conversaci&oacute;n m&aacute;s sofisticados e interactivos. La experiencia del estudiante ser&aacute; altamente pr&aacute;ctica, con oportunidades para trabajar en proyectos pr&aacute;cticos que les permitir&aacute;n aplicar los conceptos aprendidos a situaciones del mundo real. El diferencial del curso radica en su enfoque pr&aacute;ctico en el dise&ntilde;o y desarrollo de sistemas de conversaci&oacute;n, lo que lo hace altamente relevante para aquellos que buscan actualizar sus habilidades en el procesamiento del lenguaje natural y la inteligencia artificial.</p>
                <p>A diferencia de otros cursos que se centran principalmente en la teor&iacute;a del procesamiento del lenguaje natural y el aprendizaje autom&aacute;tico, este curso brinda a los estudiantes la oportunidad de aplicar lo que han aprendido a trav&eacute;s de proyectos pr&aacute;cticos. Adem&aacute;s, el curso est&aacute; dise&ntilde;ado para ser impartido por profesores altamente experimentados en el campo del procesamiento del lenguaje natural y la inteligencia artificial, lo que garantiza una experiencia de aprendizaje de alta calidad. Adem&aacute;s, el contenido del curso se actualiza regularmente para reflejar las &uacute;ltimas tendencias y avances en el campo, lo que lo convierte en una excelente opci&oacute;n para aquellos que buscan mantenerse al d&iacute;a en esta &aacute;rea en constante evoluci&oacute;n.</p>
                <p>&nbsp;</p>
                <p><strong>Dirigido a</strong></p>
                <p><br>Profesionales y estudiantes de tecnolog&iacute;a, ingenieros de software, entusiastas de los modelos de lenguaje computacional, analistas de datos y cient&iacute;ficos de datos, as&iacute; como estudiantes de inform&aacute;tica, ingenier&iacute;a y ciencias de la computaci&oacute;n que desean desarrollar habilidades avanzadas en el procesamiento del lenguaje natural y el aprendizaje autom&aacute;tico.Si bien no se requieren conocimientos previos espec&iacute;ficos para tomar el curso, se recomienda tener una comprensi&oacute;n b&aacute;sica de la programaci&oacute;n y la estad&iacute;stica, ya que esto facilitar&aacute; el proceso de aprendizaje.</p>
                <p>&nbsp;</p>
                <p><strong>Objetivos</strong></p>
                <p><br>Al finalizar el curso, el estudiante estar&aacute; en capacidad de:<br>Comprender los fundamentos del procesamiento del lenguaje natural, incluyendo el an&aacute;lisis sint&aacute;ctico, sem&aacute;ntico y pragm&aacute;tico del lenguaje humano.<br>Aplicar t&eacute;cnicas de modelado del lenguaje, incluyendo el modelado de temas, el modelado de secuencias y el modelado de relaciones entre palabras, para resolver problemas del mundo real.<br>Comprender los fundamentos del aprendizaje autom&aacute;tico, incluyendo redes neuronales, aprendizaje profundo y aprendizaje supervisado y no supervisado.<br>Dise&ntilde;ar y desarrollar im&aacute;genes y asistentes virtuales utilizando tecnolog&iacute;as de procesamiento del lenguaje natural.<br>Aplicar t&eacute;cnicas avanzadas de an&aacute;lisis y generaci&oacute;n de texto utilizando modelos de lenguaje.</p>
                <p>&nbsp;</p>
                <p><strong>Metodolog&iacute;a</strong></p>
                <p><br>La metodolog&iacute;a en la que se basa este curso es una combinaci&oacute;n entre la teor&iacute;a y ejercicios pr&aacute;cticos, la profundizaci&oacute;n de la plataforma de Chat GPT en su versi&oacute;n pro, ejercicios programados en lenguaje Python, donde los participantes pueden aplicar los conceptos aprendidos en su carrera profesional, as&iacute; como una serie de sesiones donde el instructor cubre los conceptos b&aacute;sicos del material, finalmente se realiza un proyecto donde los estudiantes aprenden a desarrollar una app a partir de la inteligencia artificial y la ingenier&iacute;a de prompt.</p>`,
            },
            {
                id: 2,
                expandida: false,
                titulo: "Evolución histórica de los modelos de lenguaje LLMs.",
                video: "",
                descripcion: `<p>Introducci&oacute;n a Python Aprenda a crear programas y proyectos en Python. Trabaje con cadenas, listas, bucles, diccionarios y funciones.</p>
                <p>En esta ruta de aprendizaje, har&aacute; lo siguiente:</p>
                <ul>
                <li>
                <p>Escribir su primer programa en Python</p>
                </li>
                <li>
                <p>Explorar paquetes para administrar proyectos mejor</p>
                </li>
                <li>
                <p>Descubra los conceptos b&aacute;sicos de Python, incluidos los siguientes elementos:</p>
                <ul>
                <li>tipos booleanos</li>
                <li>Cadenas</li>
                <li>Operaciones matem&aacute;ticas</li>
                <li>Listas y bucles</li>
                <li>Diccionarios</li>
                <li>Functions</li>
                <li>Comprobaci&oacute;n de errores</li>
                </ul>
                </li>
                <li>
                <p>Familiarizarse con los cuadernos de Jupyter Notebook</p>
                </li>
                </ul>`,
            },
            {
                id: 3,
                expandida: false,
                video: "",
                titulo: "Análisis sintáctico, semántico y pragmático del lenguaje humano.",
                descripcion: `<p>A trav&eacute;s de este curso aprender&aacute;s a utilizar las mejores herramientas de Inteligencia Artificial y de realidad aumentada para la creaci&oacute;n de contenidos m&aacute;s din&aacute;micos y atractivos.</p>`,
            }
        ]
    }, {
        id: 2,
        titulo: "Dominando el Arte de los Prompts en ChatGPT-4",
        temas: [
            {
                id: 1,
                expandida: false,
                titulo: "¿Qué es el prompt engineering?",
                video: "https://www.youtube.com/watch?v=UVsX7A2wfLo",
                descripcion: "Descripción del primer tema del segundo módulo...",
            },
            {
                id: 2,
                expandida: false,
                titulo: "Lab de ing de prompts: Cómo diseñar prompts efectivos para los modelos de LLMs ",
                video: "",
                descripcion: "Descripción del segundo tema del segundo módulo...",
            },
            {
                id: 3,
                expandida: false,
                titulo: "Generación de imágenes y arte desde la ingeniería de prompt y sus consideraciones éticas.",
                video: "",
                descripcion: "Descripción del tercer tema del segundo módulo...",
            }
        ]
    },
    {
        id: 3,
        titulo: "DALL-E y su Aplicación en ChatGPT-4",
        temas: [
            {
                id: 1,
                expandida: false,
                titulo: "Visión general de los modelos generativos DE IMÁGENES en OpenAI.",
                video: "",
                descripcion: "Descripción del primer tema del segundo módulo...",
            },
            {
                id: 2,
                expandida: false,
                titulo: "Lab de prompts: Generación, parámetros y limitaciones",
                video: "",
                descripcion: "Descripción del segundo tema del segundo módulo...",
            },
            {
                id: 3,
                expandida: false,
                titulo: "Ejemplos de prompts diseñados para diferentes tareas.",
                video: "",
                descripcion: "Descripción del tercer tema del segundo módulo...",
            }
        ]
    },
    {
        id: 4,
        titulo: "Arquitectura de código basada en ingeniera de PROMPT",
        temas: [
            {
                id: 1,
                expandida: false,
                titulo: "Construyendo códigos PYTHON sin conocimiento de programación.",
                video: "",
                descripcion: "Descripción del primer tema del segundo módulo...",
            },
            {
                id: 2,
                expandida: false,
                titulo: "¿Conociendo los pluggins de CHAT GPT 4-0 para programación en IA.",
                video: "",
                descripcion: "Descripción del segundo tema del segundo módulo...",
            },
            {
                id: 3,
                expandida: false,
                titulo: "Optimizando problemas de redes neuronales artificiales desde CHAT GPT 4.0",
                video: "https://www.youtube.com/watch?v=UVsX7A2wfLo",
                descripcion: "Descripción del tercer tema del segundo módulo...",
            }
        ]
    }

    ]);


    const handleToggleTema = (moduloIndex: number, temaIndex: number) => {
        const nuevosModulos = [...modulos];
        nuevosModulos[moduloIndex].temas[temaIndex].expandida = !nuevosModulos[moduloIndex].temas[temaIndex].expandida;
        setModulos(nuevosModulos);
    };

    return (
        <div className='view '>
            <div className={`view_fondo viewFondoCurso`}></div>
            <div className='view_fondoDos'></div>
            <div className='viewCursos'>
                <div className="view_info-tipo">
                    <Link to='/#Cursos'>
                        <div className='view_info-tipo-atras'>
                            <IonIcon className="icono" icon={chevronBackOutline} />
                            <h4>Volver a inicio</h4>
                        </div>
                    </Link>
                    <h2 className={`textinfo-tipoCurso`}>Curso</h2>
                </div>
                <div className='viewCursos_header'>
                    <h2>Explorando la IA con ChatGPT-4: Técnicas y Estrategias del Futuro</h2>
                    <div className='viewCursos_header--Profesor'>
                        <img src="http://localhost:5180/ImagenesUser/517704eb-1296-46d8-b4d2-c38ce90105b6.jpg" alt="" />
                        <div>
                            <h3>Hamilton Steven Espinal Areiza</h3>
                            <h4>Ingeniero en sistemas</h4>
                        </div>
                    </div>
                    <div className='viewCursos_body'>
                        <div className='viewCursos_body--contenido'>
                            <div className='viewCursos_body--contenido--img'>
                                <img src="http://localhost:5180/ImagenesCourse/47a1ddfd-0744-46aa-9752-0b802f188826.jpg" alt="" />
                            </div>
                            <div className='viewCursos_body--contenido--acciones'>
                                <div className='viewCursos_acciones--content'>
                                    <div className='viewCursos_acciones--content--link' onClick={VerInformacion}>
                                        <IonIcon className="icono" icon={megaphoneOutline} />
                                        <p>INFORMACIÓN</p>
                                    </div>
                                    <div className='viewCursos_acciones--content--linea'></div>
                                </div>
                                <div className='viewCursos_acciones--content'>
                                    <div className='viewCursos_acciones--content--link'>
                                        <IonIcon className="icono" icon={logoWhatsapp} />
                                        <p>GRUPO WHATSAPP</p>
                                        <div className='viewCursos_acciones--content--linea'></div>
                                    </div>
                                </div>
                                <div className='viewCursos_acciones--content'>
                                    <div className='viewCursos_acciones--content--link'>
                                        <IonIcon className="icono" icon={schoolOutline} />
                                        <p>DESCARGA TU CERTIFICADO</p>
                                    </div>
                                </div>
                            </div>
                            {verInformacion && (
                                <div className='viewCursos_acciones--content--info'>
                                    <div className='viewCursos_acciones--content--info--link'>
                                        <IonIcon className="icono" icon={calendarOutline} />
                                        <p>Fecha de la clase: 21 de April a las 03:25</p>
                                    </div>
                                    <div className='viewCursos_acciones--content--info--link'>
                                        <IonIcon className="icono" icon={tvOutline} />
                                        <p>Enlace de la clase</p>
                                    </div>
                                </div>
                            )}
                            <div className='viewCursos_body--contenido--temario'>
                                <h2>Temario y recursos</h2>
                                {modulos.map((modulo, index) => (
                                    <div className='viewCursos_temario--lista' key={index}>
                                        <h2><span>Módulo {index + 1}:</span> {modulo.titulo}</h2>
                                        {modulo.temas.map((tema, indexTema) => (
                                            <div className='viewCursos_temario--lista-Caja' key={index} onClick={() => handleToggleTema(index, indexTema)}>
                                                <div className='viewCursos_temario--lista-Caja-encabezado'>
                                                    <h4><span>Tema {indexTema + 1}:</span> {tema.titulo}</h4>
                                                    <IonIcon className={`icono ${tema.expandida ? "icono-cerrar" : ""}`} icon={tema.expandida ? closeOutline : chevronDownOutline} />
                                                </div>
                                                {tema.expandida &&
                                                    <>
                                                        <div className='view_info-contenido'>
                                                            <div dangerouslySetInnerHTML={{ __html: tema.descripcion }} />
                                                        </div>
                                                        {tema.video && (
                                                            <div className="addModulo_info-video">
                                                                <ReactPlayer
                                                                    url={tema.video}
                                                                    controls={true}
                                                                    width='100%'
                                                                    height='360px'
                                                                />
                                                            </div>
                                                        )}

                                                    </>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='viewCursos_body--right'>
                            <div className='viewCursos_body--right-menu'>
                                <ul>
                                    <li className="" onClick={() => VerTipoMenu(1)}>
                                        <IonIcon className="icono" icon={chatboxEllipsesOutline} />
                                        <p className={`${verTipoMenu == 1 ? "active" : ""}`}>Comentarios</p>
                                    </li>
                                    <li className="" onClick={() => VerTipoMenu(2)}>
                                        <IonIcon className="icono" icon={readerOutline} />
                                        <p className={`${verTipoMenu == 2 ? "active" : ""}`}>Notas</p>
                                    </li>
                                    <li className="" onClick={() => VerTipoMenu(3)}>
                                        <IonIcon className="icono" icon={alertCircleOutline} />
                                        <p className={`${verTipoMenu == 3 ? "active" : ""}`}>Ayuda</p>
                                    </li>
                                </ul>
                            </div>
                            {verTipoMenu === 1 ? <Comentarios />
                                : verTipoMenu === 2 ? <Notas />
                                    : <FormularioContaco />
                            }

                        </div>
                    </div>
                </div>
            </div>
            <img className='LogoUnac' src={imglogo} alt="" />
        </div>
    )
}

export default viewCursos