import { Alert, Button, Checkbox, Snackbar, TextField, Tooltip, styled } from '@mui/material';
import '../Configuracion.css'
import { useEffect, useRef, useState } from 'react';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { api } from '../../../../../services';
import { IonIcon } from '@ionic/react';
import { closeOutline, saveOutline, paperPlaneOutline } from 'ionicons/icons';
import { Dependence } from '../../../../../models';

interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idDependencia: number;
}

const AddDependencia: React.FC<Props> = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [msg, setMsg] = useState('');
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [data, setData] = useState<Dependence>();
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
        if (props.idDependencia > 0) {
            hadleGetId();
        }
    }, [props.idDependencia]);

    const hadleGetId = async () => {
        try {
            const response = await api.get<Dependence[]>('Configuration/GetIdDependence', { id: props.idDependencia });

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
                await api.put<any>('Configuration/PutDependence', values);
            } else {
                await api.post<any>('Configuration/PostDependence', values);
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
                        <h4>Registrar Dependencia</h4>
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
                                {props.idDependencia == 0 ? (
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

                                if (!valor.nombre) {
                                    errors.nombre = 'Introduce un nombre para la dependencia';
                                }

                                if (!valor.codigo) {
                                    errors.codigo = 'Introduce un codigo para la dependencia';
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
                                                placeholder='Introduce el código del tipo de curso'
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
                                                placeholder='Introduce el nombre del tipo de curso'
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
                    {props.idDependencia == 0 ? (
                        "¡Dependencia guardada exitosamente!"
                    ) : (
                        "¡Dependencia actualizada exitosamente!"
                    )}

                </Alert>
            </Snackbar>
        </>
    )
}

export default AddDependencia