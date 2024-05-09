import { useEffect, useRef, useState } from 'react';
import '../Configuracion.css'
import { FrequentlyQuestion } from '../../../../../models';
import { api } from '../../../../../services';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { Alert, Button, Checkbox, Snackbar, TextField, Tooltip, styled } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { closeOutline, saveOutline, paperPlaneOutline } from 'ionicons/icons';

interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idRespuesta: number;
}

const addPreguntas: React.FC<Props> = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState('');
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [data, setData] = useState<FrequentlyQuestion>();
    const [openSnackbar, setOpenSnackbar] = useState(false);


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

    useEffect(() => {
        if (props.idRespuesta > 0) {
            hadleGetId();
        }
    }, [props.idRespuesta]);

    const hadleGetId = async () => {
        try {
            const response = await api.get<FrequentlyQuestion[]>('Configuration/GetIdFrequentlyQuestions', { id: props.idRespuesta });

            if (response.data.length > 0) {
                setData({
                    id: response.data[0].id,
                    pregunta: response.data[0].pregunta,
                    respuesta: response.data[0].respuesta,
                    activo: response.data[0].activo,
                    expandida: false,
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setMsg('Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const handleRegistrar = async (values: FormikValues) => {
        setIsSubmitting(true);
        try {
            // Solicitud POST
            if (values.id > 0) {
                await api.put<any>('Configuration/PutFrequentlyQuestions', values);
            } else {
                await api.post<any>('Configuration/PostFrequentlyQuestions', values);
            }

            setOpenSnackbar(true);


        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
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
    return (
        <>
            <div className='Configuracion_Modal'>
                <div className='Configuracion_Modal-Content Configuracion_Modal-Content-preguntas'>
                    <div className="AddCursos_Encabezado">
                        <h4>Registrar Pregunta</h4>
                        <div>
                            <Button
                                onClick={() => props.mostrarRegistro()}
                                variant="outlined"
                                size="small"
                                startIcon={<IonIcon className='' icon={closeOutline} />}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                startIcon={isSubmitting == true ? (<IonIcon className='' icon={paperPlaneOutline} />) : (<IonIcon className='' icon={saveOutline} />)}
                                disabled={isSubmitting}
                                onClick={handleClick}
                            >
                                {props.idRespuesta == 0 ? (
                                    isSubmitting == true ? ('Registrando...') : ('Registrar')
                                ) : (
                                    isSubmitting == true ? ('Actualizando...') : ('Actualizar')
                                )}

                            </Button>
                        </div>

                    </div>
                    <div className="AddCursos_Formulario">
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                id: data?.id || 0,
                                pregunta: data?.pregunta || '',
                                respuesta: data?.respuesta || '',
                                activo: data?.activo || false,
                            }}
                            validate={(valor) => {

                                let errors: any = {};

                                if (!valor.pregunta) {
                                    errors.pregunta = 'Introduce una pregunta';
                                }

                                if (!valor.respuesta) {
                                    errors.respuesta = 'Introduce una respuesta';
                                }

                                return errors;
                            }}
                            onSubmit={handleRegistrar}
                        >
                            {({ errors, values, setFieldValue }) => (
                                <Form>
                                    <div className='Configuracion_Formuario'>
                                        <div className='Configuracion_Formuario-check'>
                                            <Tooltip title="Activo/No activo" placement="top" disableInteractive>
                                                <Checkbox
                                                    checked={values.activo}
                                                    onChange={() => setFieldValue('activo', !values.activo)}
                                                />
                                            </Tooltip>
                                        </div>
                                        <div className='Configuracion_Formuario-right'>
                                            <StyledTextField
                                                name='Pregunta'
                                                label="Pregunta"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder='Introduce la pregunta'
                                                value={values.pregunta}
                                                onChange={(e) => setFieldValue('pregunta', e.target.value)}
                                            />
                                            <ErrorMessage name='pregunta' component={() => <p className='Error'>{errors.pregunta}</p>} />
                                        </div>

                                    </div>
                                    <div className='Configuracion_Formuario-right'>
                                        <StyledTextField
                                            name='Respuesta'
                                            label="Respuesta"
                                            multiline
                                            maxRows={8}
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            placeholder='Introduce la respuesta'
                                            value={values.respuesta}
                                            onChange={(e) => setFieldValue('respuesta', e.target.value)}
                                        />
                                        <ErrorMessage name='respuesta' component={() => <p className='Error'>{errors.respuesta}</p>} />
                                    </div>
                                    <button
                                        type="submit"
                                        style={{ display: 'none' }}
                                        ref={submitButtonRef}
                                    >
                                        enviar
                                    </button>
                                    <i className='mensaje'>{msg}</i>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {props.idRespuesta == 0 ? (
                        "¡Categoría guardada exitosamente!"
                    ) : (
                        "¡Categoría actualizada exitosamente!"
                    )}
                </Alert>
            </Snackbar>
        </>
    )
}

export default addPreguntas