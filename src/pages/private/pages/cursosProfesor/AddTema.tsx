import { IonIcon } from "@ionic/react";
import { Alert, Button, Snackbar, TextField, styled } from "@mui/material";
import { closeOutline, saveOutline } from 'ionicons/icons';
import { Tema } from "../../../../models";
import { useEffect, useRef, useState } from "react";
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import { api } from "../../../../services";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../redux/store";
import { Editor } from "@tinymce/tinymce-react";

interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idModulo: number;
    idTema: number;
}

const AddTema: React.FC<Props> = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState(false);
    const [msg, setMsg] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [tema, setTema] = useState<Tema>();
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const usuario = useSelector((store: AppStore) => store.user);

    useEffect(() => {
        if (props.idTema > 0) {
            hadleGetId();
        }

        const mainContainer = document.getElementById('main');
        if (mainContainer) {
            mainContainer.scrollTop = 0;
        }

    }, [props.idTema]);

    const hadleGetId = async () => {
        try {
            const response = await api.get<Tema[]>('Courses/GetListCoursesTemas', { accion: 2, id: props.idTema });
            if (response.data.length > 0) {
                setTema({
                    id: response.data[0].id,
                    titulo: response.data[0].titulo,
                    descripcion: response.data[0].descripcion,
                    video: response.data[0].video,
                    enlace: response.data[0].enlace,
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
                response = await api.put<any>('Courses/PutCourseTema', values);
            } else {
                response = await api.post<any>('Courses/PostCourseTema', values);
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
            <div className="AddModulo_Content  AddModulo_Content_tema">
                <div className="AddUsuario_Encabezado">
                    <h3>{props.idTema == 0 ? 'Nuevo tema' : 'Editar tema'}  {props.idModulo}</h3>
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
                            {props.idTema == 0 ? 'Guardar' : 'Actualizar'}
                        </Button>
                    </div>
                </div>
                <div className="">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            id: tema?.id || 0,
                            idModulo: props.idModulo,
                            titulo: tema?.titulo || '',
                            descripcion: tema?.descripcion || '',
                            video: tema?.video || '',
                            enlace: tema?.enlace || '',
                            idUsuario: usuario.idUsuario
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
                                <div className=''>
                                    <div className='Configuracion_Formuario-right'>
                                        <StyledTextField
                                            name='tema'
                                            label="Título del tema"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            value={values.titulo}
                                            onChange={(e) => setFieldValue('titulo', e.target.value)}
                                            placeholder='Escribe el título completo del tema, por ejemplo: "Análisis sintáctico, semántico y pragmático del lenguaje humano"'
                                        />
                                        <ErrorMessage name='titulo' component={() => <p className='Error'>{errors.titulo}</p>} />
                                    </div>
                                    <div className="addModulo_info--formulario-temas-content">
                                        <h4>Descripción</h4>
                                        <Editor
                                            onEditorChange={(content) => setFieldValue('descripcion', content)}
                                            apiKey='tuezbpkp2ehsxvmrxtl2szjjtayo5yx9fm90xwbjrpbvopkv'
                                            value={values.descripcion}
                                            init={{
                                                height: 400,
                                                content_style: "font-size: 16px; font-family: 'Roboto', sans-serif;",
                                                menubar: false,
                                                plugins: [
                                                    'lists', 'link'
                                                ],
                                                toolbar: 'undo redo formatselect bold italic underline strikethrough alignleft aligncenter alignright bullist link'
                                            }}
                                        />
                                    </div>

                                    <div className="">
                                        <h4>Material de apoyo</h4>
                                        <StyledTextField
                                            name='urlYoutube'
                                            label="Enlace de youtube"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            placeholder='Pegue el enlace de YouTube aquí (por ejemplo: https://www.youtube.com/watch?v=xxxxx)'
                                            value={values.video}
                                            onChange={(e) => setFieldValue('video', e.target.value)}
                                        />
                                    </div>
                                    <div className="">
                                        <StyledTextField
                                            name='urldrive'
                                            label="Pegue el enlace de Google Drive u otro enlace externo aquí"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            placeholder='Pegue el enlace de Google Drive aquí (por ejemplo: https://drive.google.com/file/d/xxxxxxx/view?usp=sharing)'
                                            value={values.enlace}
                                            onChange={(e) => setFieldValue('enlace', e.target.value)}
                                        />
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
    )
}

export default AddTema