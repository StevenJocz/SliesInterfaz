import { IonIcon } from "@ionic/react";
import { arrowBackOutline, linkOutline, addOutline, listOutline, trashOutline, createOutline } from 'ionicons/icons';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField, styled } from "@mui/material";
import { Modulo, Tema } from "../../../../models";
import { useEffect, useState } from "react";
import Img from '../../../../assets/img/Course.png'
import { api } from "../../../../services";
import AddModulo from "./AddModulo";
import { format } from "date-fns";
import AddTema from "./AddTema";
import ReactPlayer from 'react-player/youtube'

interface Props {
    mostrarRegistro: () => void;
    idCurso: number;
}

const ModulosCursos: React.FC<Props> = (props) => {
    const [msg, setMsg] = useState('');
    const [modulo, setModulo] = useState<Modulo[]>([]);
    const [moduloSeleccionado, setModuloSeleccionado] = useState<Modulo[]>([]);
    const [addModulo, setAddModulo] = useState(false);
    const [idModulo, setIdModulo] = useState(0);
    const [idModuloEliminar, setIdModuloEliminar] = useState(0);
    const [liModulo, setLiModulo] = useState(0);
    const [tema, setTema] = useState<Tema[]>([]);
    const [temaSeleccionado, setTemaSeleccionado] = useState<Tema[]>([]);
    const [addTema, setAddTema] = useState(false);
    const [idTema, setIdTema] = useState(0);
    const [liTema, setLiTema] = useState(0);
    const [accionEliminar, setAccionEliminar] = useState(0);
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleClose = () => {
        props.mostrarRegistro();
    };

    useEffect(() => {
        if (props.idCurso > 0) {
            hadleGet(1, props.idCurso);
        }
    }, [props.idCurso]);

    const hadleGet = async (accion: number, id: number) => {
        try {
            const response = await api.get<Modulo[]>('Courses/GetListCourseModulos', { accion: accion, id: id });
            if (response.data.length > 0) {
                if (accion == 1) {
                    setModulo(response.data);
                    setModuloSeleccionado([]);
                }
                else {
                    setModuloSeleccionado(response.data);
                    setTemaSeleccionado([]);
                    setLiTema(0);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setMsg('Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const hadleGetTema = async (accion: number, id: number) => {
        try {
            const response = await api.get<Tema[]>('Courses/GetListCoursesTemas', { accion: accion, id: id });
            if (response.data.length > 0) {
                if (accion == 1) {
                    setTema(response.data);
                    setTemaSeleccionado([]);
                    console.log('aja');
                }
                else {
                    setTemaSeleccionado(response.data);
                    setLiTema(id);
                    console.log('ok');
                }
            } else {
                setTema([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setMsg('Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleVerModulo = (id: number) => {
        hadleGet(2, id);
        hadleGetTema(1, id);
        setLiModulo(id);
    };

    const handleAddModulo = (id: number) => {
        setIdModulo(id);
        setAddModulo(!addModulo);
    };

    const handleAddTema = (id: number) => {
        setIdTema(id);
        setAddTema(!addTema);
    };


    const StyledTextField = styled(TextField)({
        width: '100%',
        background: '#fff',
        marginBottom: '20px',
    });


    const handleClickOpen = (accion: number, id: number) => {
        setIdModuloEliminar(id);
        setAccionEliminar(accion);
        setOpen(true);
    };

    const handleClickClose = (id: number) => {
        if (id == 0) {
            setOpen(false);
            setIdModuloEliminar(0);
        } else {
            handleEliminar(accionEliminar, id);
            setOpen(false);
        }

    };

    const handleEliminar = async (accion: number, id: number) => {
        setIsSubmitting(true);
        try {

            console.log(id)
            let response;
            if (accion == 1) {
                response = await api.delete<any>(`Courses/DeleteCourseModulo?idModulo=${id}`);
            } else {
                response = await api.delete<any>(`Courses/DeleteCourseTema?idTema=${id}`);
            }

            if (response.data.resultado === true) {
                setMsg(response.data.message);
                setOpenSnackbar(true);

            } else {
                setMsg(response.data.message);
                setOpenSnackbar(true);
                setIsSubmitting(false);
            }
            setResponse(response.data.resultado);

        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setResponse(false);
            setOpenSnackbar(true);
            setIsSubmitting(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setIsSubmitting(false);
        if (accionEliminar == 1) {
            hadleGet(1, props.idCurso);
        } else {
            hadleGetTema(1, liModulo);
        }
    };


    return (
        <div className='ModulosCursos'>
            <div className="ModulosCursos_Encabezado">
                <h3>Configuración del curso</h3>
                <div>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        size="small"
                        startIcon={<IonIcon className='' icon={arrowBackOutline} />}
                    >
                        Volver a mis cursos
                    </Button>
                </div>
            </div>
            <div className="ModulosCursos_titulo Layout_contenedor">
                <h5>Curso</h5>
                <h3>Explorando la IA con ChatGPT-4: Técnicas y Estrategias del Futuro {props.idCurso}</h3>
                <div className='ModulosCursos_titulo-previsual'>
                    <a
                        href={`/Cursos/11/${'Explorando la IA con ChatGPT-4: Técnicas y Estrategias del Futuro' ? encodeURIComponent('Explorando la IA con ChatGPT-4: Técnicas y Estrategias del Futuro'.replace('/', '-').toLowerCase().replace(/ /g, '-')) : ''}`}
                        target="_blank"
                    >
                        <Button
                            variant="outlined"
                            size="small"
                            color="warning"
                            startIcon={<IonIcon className='' icon={linkOutline} />}
                        >
                            Ver curso
                        </Button>
                    </a>
                </div>
            </div>
            <div className="ModulosCursos_content">
                <div className="ModulosCursos_content--addModulo">
                    <div className="addModulo_lista">
                        <h4>Lista</h4>
                        <Button
                            variant="outlined"
                            size="small"
                            color="success"
                            startIcon={<IonIcon className='' icon={addOutline} />}
                            onClick={() => handleAddModulo(0)}
                        >
                            Nuevo módulo
                        </Button>
                        <ul>
                            {modulo.map((modulo, index) => (
                                <li className={modulo.id === liModulo ? "LiActive" : ""} key={modulo.id}>
                                    <div onClick={() => handleVerModulo(modulo.id)}>
                                        <IonIcon className='icono' icon={listOutline} />
                                        Módulo {index + 1}
                                    </div>
                                    <IonIcon className='iconoCrear' icon={createOutline} onClick={() => handleAddModulo(modulo.id)} />
                                    <IonIcon className='iconoBorrar' icon={trashOutline} onClick={() => handleClickOpen(1, modulo.id)} />
                                </li>
                            ))}

                        </ul>
                    </div>
                    {moduloSeleccionado && moduloSeleccionado.length > 0 ? (
                        <div className="addModulo_info">
                            <div>
                                <div className="addModulo_info--formulario">
                                    <div className="addModulo_info--encabezado">
                                        <h4>Módulo</h4>
                                        <div className="addModulo_info--encabezado-user">
                                            <p>Creado o actualizado por</p>
                                            <p className="addModulo_info--encabezado-nombre"> {moduloSeleccionado[0].nombreUsuario}</p>
                                            <p className="addModulo_info--encabezado-fecha">El {`${format(new Date(moduloSeleccionado[0].fechaRegistro), "dd 'de' MMMM 'del' yyyy")}`}</p>
                                        </div>
                                    </div>

                                    <div className="">
                                        <StyledTextField
                                            name='titulo'
                                            label="Título del módulo"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            disabled={true}
                                            value={moduloSeleccionado[0].titulo}
                                        />
                                    </div>
                                </div>
                                <div className="addModulo_info--formulario-temas">
                                    <div className="addModulo_info--formulario-temas-menu">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="success"
                                            startIcon={<IonIcon className='' icon={addOutline} />}
                                            onClick={() => handleAddTema(0)}
                                        >
                                            Nuevo tema
                                        </Button>
                                        <ul>
                                            {tema.map((tema, index) => (
                                                <li className={tema.id === liTema ? "LiActive" : ""} key={tema.id} >
                                                    <div onClick={() => hadleGetTema(2, tema.id)}>
                                                        <IonIcon className='icono' icon={listOutline} />
                                                        Tema {index + 1}
                                                    </div>
                                                    <IonIcon className='iconoCrear' icon={createOutline} onClick={() => handleAddTema(tema.id)} />
                                                    <IonIcon className='iconoBorrar' icon={trashOutline} onClick={() => handleClickOpen(2, tema.id)} />
                                                </li>
                                            ))
                                            }

                                        </ul>
                                    </div>
                                    {temaSeleccionado && temaSeleccionado.length > 0 ? (
                                        <div className="addModulo_info--formulario-temas-ri">
                                            <div>
                                                <div className="addModulo_info--formulario-temas-content">
                                                    <div className="addModulo_info--encabezado-tema">
                                                        <h4>Tema {temaSeleccionado[0].titulo}</h4>
                                                        <div className="addModulo_info--encabezado-user">
                                                            <p className="addModulo_info--encabezado-nombre">Creado o actualizado por {temaSeleccionado[0].nombreUsuario} - {`${format(new Date(temaSeleccionado[0].fechaRegistro), "dd 'de' MMMM 'del' yyyy")}`}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="addModulo_info--formulario-temas-content-info">
                                                    <div dangerouslySetInnerHTML={{ __html: temaSeleccionado[0].descripcion }} />
                                                    {temaSeleccionado[0].video && (
                                                        <div className="addModulo_info-video">
                                                            <ReactPlayer
                                                                url={temaSeleccionado[0].video}
                                                                controls={true}
                                                                width='100%'
                                                                height='360px'
                                                            />
                                                        </div>
                                                    )}
                                                    <div className=''>
                                                        <h4>Enlace de documento</h4>
                                                        <a href={temaSeleccionado[0].enlace} target="_blank" >
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                color="warning"
                                                                startIcon={<IonIcon className='' icon={linkOutline} />}
                                                            >
                                                                Ver Documento
                                                            </Button>
                                                        </a>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    ) : (
                                        <div className='otrasOpciones-right-img'>
                                            <div>
                                                <i>Es importante ajustar la configuración del curso de manera adecuada para garantizar una experiencia óptima para los estudiantes y facilitar el proceso de aprendizaje.</i>
                                                <img src={Img} alt="" />
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='otrasOpciones-right-img'>
                            <div>
                                <i>Es importante ajustar la configuración del curso de manera adecuada para garantizar una experiencia óptima para los estudiantes y facilitar el proceso de aprendizaje.</i>
                                <img src={Img} alt="" />
                            </div>
                        </div>
                    )}

                </div>

            </div>
            {addModulo && (
                <AddModulo
                    idModulo={idModulo}
                    mostrarRegistro={() => setAddModulo(false)}
                    idCurso={props.idCurso}
                    actualizarDatos={() => hadleGet(1, props.idCurso)}
                />
            )}
            {addTema && (
                <AddTema
                    idModulo={liModulo}
                    mostrarRegistro={() => setAddTema(false)}
                    idTema={idTema}
                    actualizarDatos={() => hadleGetTema(1, liModulo)}
                />
            )}

            <Dialog
                open={open}
                onClose={handleClickClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Eliminar Módulo"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        ¿Estás seguro de que deseas eliminar este módulo? Esta acción es irreversible
                        y eliminará todos los temas asociados a este módulo.
                        Por favor, confirma si deseas proceder con la eliminación.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => handleClickClose(0)}>Cancelar</Button>
                    <Button
                        disabled={isSubmitting}
                        variant="contained"
                        size="small"
                        color="error"
                        startIcon={<IonIcon className='' icon={trashOutline} />}
                        onClick={() => handleClickClose(idModuloEliminar)}
                    >
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={response == true ? "success" : "error"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ModulosCursos