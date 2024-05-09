import { IonIcon } from '@ionic/react';
import { Alert, Button, Snackbar, TextField, styled } from '@mui/material';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { closeOutline, saveOutline, cameraOutline } from 'ionicons/icons';
import { useRef, useState } from 'react';
import foto from '../../../../assets/img/perfil-blanco.png';
import { api } from '../../../../services';
import { AsignarProfesores } from '../../../../models';

interface Props {
    VerRegistroUsuario: () => void;
    actualizarDatos?: () => void;
    idUsuario: number;
}

const AsignarProfesor: React.FC<Props> = (props) => {
    const [msg, setMsg] = useState('');
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fotoPreview, setFotoPreview] = useState('');
    const [base64Foto, setBase64Foto] = useState('');
    const [response, setResponse] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const handlePerfilIconClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleFotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files[0]) {
            const imageUrl = URL.createObjectURL(files[0]);
            setFotoPreview(imageUrl);

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const base64Image = e.target.result as string;
                    setBase64Foto(base64Image);
                }
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleClick = () => {
        if (submitButtonRef.current) {
            submitButtonRef.current.click();
        }
    };

    const handleRegistrar = async (values: FormikValues) => {
        setIsSubmitting(true);
        try {
            const registro: AsignarProfesores = {
                accion: 1,
                idUsuario: props.idUsuario,
                profesion: values.profesion || '',
                foto: base64Foto,
            };

            let response = await api.post<any>('User/PostAssignTeacher', registro);
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

    const StyledTextField = styled(TextField)({
        width: '100%',
        background: '#fff',
        marginBottom: '20px',
    });

    const handleCloseSnackbar = () => {
        setIsSubmitting(false);
        setOpenSnackbar(false);
        if (response) {
            if (props.actualizarDatos) {
                props.actualizarDatos();
            }
            props.VerRegistroUsuario();
        }
    };

    return (
        <div className="AsignarProfesor">
            <div className="AsignarProfesor_Content">
                <div className="AddUsuario_Encabezado">
                    <h3> Asignar profesor</h3>
                    <div>
                        <Button
                            onClick={props.VerRegistroUsuario}
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
                            Asignar
                        </Button>
                    </div>
                </div>
                <div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            profesion: '',
                            foto: '',
                        }}
                        validate={(valor) => {
                            let errors: any = {};
                            if (!valor.profesion) {
                                errors.profesion = 'Introduce la profesion del profesor';
                            }
                            return errors;
                        }}
                        onSubmit={handleRegistrar}
                    >
                        {({ errors, values, setFieldValue }) => (
                            <Form>
                                <div className='AsignarProfesor_Content-Formuario AddUsuario_Content-left-Usuario'>
                                    <div className='AsignarProfesor_Content-Formuario--img'>
                                        <img src={fotoPreview || foto} alt="" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={inputRef}
                                            name="foto"
                                            value={values.foto}
                                            onChange={handleFotoChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                    <div className='AsignarProfesor_Content-Formuario--input'>
                                        <ErrorMessage name='profesion' component={() => <p className='Error'>{errors.profesion}</p>} />
                                        <StyledTextField
                                            name='profesion'
                                            label="Profesión"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            placeholder='Ingrese la profesión del usuario'
                                            value={values.profesion}
                                            onChange={(e) => setFieldValue('profesion', e.target.value)}
                                        />
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="success"
                                            startIcon={<IonIcon className='' icon={cameraOutline} />}
                                            onClick={handlePerfilIconClick}
                                        >
                                            Seleccionar foto
                                        </Button>
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
    )
}

export default AsignarProfesor