import { IonIcon } from "@ionic/react";
import { Alert, Button, Snackbar, TextField, styled } from "@mui/material";
import { closeOutline, saveOutline } from 'ionicons/icons';
import { Modulo } from "../../../../models";
import { useEffect, useRef, useState } from "react";
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import { api } from "../../../../services";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";

interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idModulo: number;
    idCurso: number;
}

const AddModulo: React.FC<Props> = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState(false);
    const [msg, setMsg] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [modulo, setModulo] = useState<Modulo>();
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const usuario = useSelector((store: AppStore) => store.user);

    useEffect(() => {
        if (props.idModulo > 0) {
            hadleGetId();
        }

        const mainContainer = document.getElementById('main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }

    }, [props.idModulo]);

    const hadleGetId = async () => {
        try {
            const response = await api.get<Modulo[]>('Courses/GetListCourseModulos', { accion: 2, id: props.idModulo });
            if (response.data.length > 0) {
                setModulo({
                    id: response.data[0].id,
                    titulo: response.data[0].titulo,
                    idUsuario: response.data[0].idUsuario,
                    nombreUsuario: response.data[0].nombreUsuario,
                    fechaRegistro: response.data[0].fechaRegistro,
                });
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleRegistrar = async (values: FormikValues) => {
        setIsSubmitting(true);
        try {
            // Solicitud POST
            let response;
            if (values.id > 0) {
                response = await api.put<any>('Courses/PutCourseModulo', values);
            } else {
                response = await api.post<any>('Courses/PostCourseModulo', values);
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
        if (props.actualizarDatos) {
            props.actualizarDatos();
        }
        props.mostrarRegistro();
    };

    const StyledTextField = styled(TextField)({
        width: '100%',
        background: '#fff',
        marginBottom: '20px',
    });

    const handleClick = () => {
        if (submitButtonRef.current) {
            submitButtonRef.current.click();
        }
    };

    return (
        <div className="AddModulo">
            <div className="AddModulo_Content">
                <div className="AddUsuario_Encabezado">
                    <h3>{props.idModulo == 0 ? 'Nuevo Módulo' : 'Editar Módulo'}</h3>
                    <div>
                        <Button
                            onClick={props.mostrarRegistro}
                            variant="outlined"
                            size="small"
                            startIcon={<IonIcon className='' icon={closeOutline} />}
                        >
                            Cancelar
                        </Button>
                        <Button
                            disabled={isSubmitting}
                            onClick={handleClick}
                            variant="contained"
                            size="small"
                            startIcon={<IonIcon className='' icon={saveOutline} />}
                        >
                            {props.idModulo == 0 ? 'Guardar' : 'Actualizar'}
                        </Button>
                    </div>
                </div>
                <div className="addModulo_info--formulario">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            id: modulo?.id || 0,
                            titulo: modulo?.titulo || '',
                            idUsuario: usuario.idUsuario,
                            idCurso: props.idCurso,
                        }}
                        validate={(valor) => {
                            let errors: any = {};
                            if (!valor.titulo) {
                                errors.titulo = 'Introduce un título del módulo';
                            }
                            return errors;
                        }}
                        onSubmit={handleRegistrar}
                    >
                        {({ errors, values, setFieldValue }) => (
                            <Form>
                                <div className='Configuracion_Formuario'>
                                    <div className='Configuracion_Formuario-right'>
                                        <StyledTextField
                                            name='titulo'
                                            label="Título del módulo"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            placeholder='Escribe el título completo del módulo, por ejemplo: "Módulo I: Fundamentos y Evolución de los Modelos de Lenguaje en IA"'
                                            value={values.titulo}
                                            onChange={(e) => setFieldValue('titulo', e.target.value)}
                                        />
                                        <ErrorMessage name='titulo' component={() => <p className='Error'>{errors.titulo}</p>} />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    style={{ display: 'none' }}
                                    ref={submitButtonRef}
                                >
                                    enviar
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
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

        </div>
    );
}


export default AddModulo;
