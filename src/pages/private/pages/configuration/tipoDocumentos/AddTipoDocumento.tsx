import { Alert, Button, Checkbox, Snackbar, TextField, Tooltip, styled } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { closeOutline, saveOutline, paperPlaneOutline } from 'ionicons/icons';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { api } from '../../../../../services';
import '../Configuracion.css'
import { TypeDocument } from '../../../../../models/configuracion';

interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idTipoDocumento: number;
}

const AddTipoDocumento: React.FC<Props> = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState('');
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [data, setData] = useState<TypeDocument>();
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
        if (props.idTipoDocumento > 0) {
            hadleGetId();
        }
    }, [props.idTipoDocumento]);

    const hadleGetId = async () => {
        try {
            const response = await api.get<TypeDocument[]>('Configuration/GetIdTypeDocument', { id: props.idTipoDocumento });

            if (response.data.length > 0) {
                setData({
                    id: response.data[0].id,
                    abbreviacion: response.data[0].abbreviacion,
                    nombre: response.data[0].nombre,
                    activo: response.data[0].activo,
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
                await api.put<any>('Configuration/PutTypeDocument', values);
            } else {
                await api.post<any>('Configuration/PostTypeDocument', values);
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
                        <h4>Registrar tipo de documento</h4>
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
                                {props.idTipoDocumento == 0 ? (
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
                                abbreviacion: data?.abbreviacion || '',
                                nombre: data?.nombre || '',
                                activo: data?.activo || false,
                            }}
                            validate={(valor) => {

                                let errors: any = {};

                                if (!valor.abbreviacion) {
                                    errors.abbreviacion = 'Introduce una abreviación para el tipo de documento';
                                }

                                if (!valor.nombre) {
                                    errors.nombre = 'Introduce un nombre para el tipo de documento';
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
                                        <div className='Configuracion_Formuario-left'>
                                            <StyledTextField
                                                name='titulo'
                                                label="Abreviación"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder='Introduce la abreviación del tipo de documento'
                                                value={values.abbreviacion}
                                                onChange={(e) => setFieldValue('abbreviacion', e.target.value)}
                                            />
                                            <ErrorMessage name='abbreviacion' component={() => <p className='Error'>{errors.abbreviacion}</p>} />
                                        </div>
                                        <div className='Configuracion_Formuario-right'>
                                            <StyledTextField
                                                name='titulo'
                                                label="Nombre"
                                                variant="outlined"
                                                size="small"
                                                color="secondary"
                                                placeholder='Introduce el nombre del tipo de documento'
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
                    {props.idTipoDocumento == 0 ? (
                        "¡Tipo de documento guardado exitosamente!" 
                    ) : (
                        "¡Tipo de documento actualizado exitosamente!"
                    )}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddTipoDocumento