import { useEffect, useRef, useState } from 'react';
import '../Configuracion.css'
import { TypeAttendees } from '../../../../../models';
import { api } from '../../../../../services';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { Alert, Button, Checkbox, Snackbar, TextField, Tooltip, styled } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { closeOutline, saveOutline, paperPlaneOutline } from 'ionicons/icons';


interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idTipoAsistente: number;
}

const AddTipoAsistente: React.FC<Props> = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState('');
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [data, setData] = useState<TypeAttendees>();
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
        if (props.idTipoAsistente > 0) {
            hadleGetId();
        }
    }, [props.idTipoAsistente]);

    const hadleGetId = async () => {
        try {
            const response = await api.get<TypeAttendees[]>('Configuration/GetIdTypeAttendees', { id: props.idTipoAsistente });

            if (response.data.length > 0) {
                setData({
                    id: response.data[0].id,
                    nombre: response.data[0].nombre,
                    activo: response.data[0].activo,
                    codigo: response.data[0].codigo,
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
                await api.put<any>('Configuration/PutTypeAttendees', values);
            } else {
                await api.post<any>('Configuration/PostTypeAttendees', values);
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
                <div className='Configuracion_Modal-Content'>
                    <div className="AddCursos_Encabezado">
                        <h4>Registrar tipo de asistente</h4>
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
                                {props.idTipoAsistente == 0 ? (
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
                                nombre: data?.nombre || '',
                                activo: data?.activo || false,
                                codigo: data?.codigo || '',
                            }}
                            validate={(valor) => {

                                let errors: any = {};

                                if (!valor.codigo) {
                                    errors.codigo = 'Introduce un código para el tipo de asistente';
                                }

                                if (!valor.nombre) {
                                    errors.nombre = 'Introduce un nombre para el tipo de asistente';
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
                                                name='codigo'
                                                label="Código"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder='Introduce el codigo tipo de asistente'
                                                value={values.codigo}
                                                onChange={(e) => setFieldValue('codigo', e.target.value)}
                                            />
                                            <ErrorMessage name='codigo' component={() => <p className='Error'>{errors.codigo}</p>} />
                                        </div>
                                        <div className='Configuracion_Formuario-right'>
                                            <StyledTextField
                                                name='titulo'
                                                label="Nombre"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder='Introduce el nombre tipo de asistente'
                                                value={values.nombre}
                                                onChange={(e) => setFieldValue('nombre', e.target.value)}
                                            />
                                            <ErrorMessage name='nombre' component={() => <p className='Error'>{errors.nombre}</p>} />
                                        </div>
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
                    {props.idTipoAsistente == 0 ? (
                        "¡Categoría guardada exitosamente!"
                    ) : (
                        "¡Categoría actualizada exitosamente!"
                    )}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddTipoAsistente