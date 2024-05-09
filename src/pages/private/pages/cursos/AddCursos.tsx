import './Cursos.css'
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { Alert, Button, MenuItem, Snackbar, Switch, TextField, styled } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { saveOutline, closeOutline, paperPlaneOutline, linkOutline, trashOutline, addOutline, cameraOutline, medalOutline, closeCircleOutline, warningOutline, cashOutline, arrowBackOutline, leafOutline, peopleOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Checkbox from '@mui/material/Checkbox';
import Img from '../../../../assets/img/check.png'
import React, { ChangeEvent } from 'react';
import { CoursesCategories, CoursesType, Dependence, Profesores, RegistroCursos, TypeAttendees, services } from '../../../../models';
import { api } from '../../../../services';
import foto from '../../../../assets/img/noImagen.jpg';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';
import dayjs from 'dayjs';

interface Props {
    mostrarRegistro: () => void;
    actualizarDatos?: () => void;
    idCurso: number;
}

interface Precio {
    idTipoAsistente: number;
    tipoAsistente: string;
    precio: string;
}

const AddCursos: React.FC<Props> = (props) => {
    const usuario = useSelector((store: AppStore) => store.user);
    const [msg, setMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState(false);
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const [addTipoAsistente, setAddTipoAsistente] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [fotoPreview, setFotoPreview] = useState('');
    const [base64Foto, setBase64Foto] = useState('');
    const [categoria, setCategoria] = useState<CoursesCategories[] | null>(null);
    const [modalidad, setModalidad] = useState<CoursesType[] | null>(null);
    const [dependencia, setDependencia] = useState<Dependence[] | null>(null);
    const [tipoAsistentes, setTipoAsistentes] = useState<TypeAttendees[]>([]);
    const [profesores, setProfesores] = useState<Profesores[]>([]);
    const [idProfesor, setIdProfesor] = useState(0);
    const [profesorSeleccionado, setProfesorSeleccionado] = useState<Profesores[]>([]);

    // Pagos
    const [tipoAsistenteValue, setTipoAsistenteValue] = useState<number>(0);
    const [tipoAsistenteLabel, setTipoAsistenteLabel] = useState<string>('');
    const [precioValue, setPrecioValue] = useState<string>('');
    const [precios, setPrecios] = useState<Precio[]>([]);
    const [precioMensaje, setPrecioMensaje] = useState<string>('');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [data, setData] = useState<RegistroCursos>();

    useEffect(() => {
        hadleGetCategorias();
        hadleGetModalidad();
        hadleGetTipoAsistentes();
        hadleGetProfesores();
        hadleGetDependencia();
        if (props.idCurso > 0) {
            hadleGetId();
        }
    }, []);

    const hadleGetId = async () => {
        try {
            const response = await api.get<RegistroCursos[]>('Courses/GetIdCourses', { idCurso: props.idCurso });
            if (response.data.length > 0) {
                setData({
                    id: response.data[0].id,
                    titulo: response.data[0].titulo,
                    activo: response.data[0].activo,
                    pago: response.data[0].pago,
                    formal: response.data[0].formal,
                    acompanante: response.data[0].acompanante,
                    menorEdad: response.data[0].menorEdad,
                    grupal: response.data[0].grupal,
                    descripcion: response.data[0].descripcion,
                    limitarCupos: response.data[0].limitarCupos,
                    cantidadCupos: response.data[0].cantidadCupos,
                    categoría: response.data[0].categoría,
                    tipoCurso: response.data[0].tipoCurso,
                    fechaInicio: response.data[0].fechaInicio,
                    fechaFin: response.data[0].fechaFin,
                    fechaLimiteInscripcion: response.data[0].fechaLimiteInscripcion,
                    lugar: response.data[0].lugar,
                    dependencia: response.data[0].dependencia,
                    imagen: response.data[0].imagen,
                    creador: response.data[0].creador,
                    precios: response.data[0].precios,
                    profesores: response.data[0].profesores,
                });

                setProfesorSeleccionado(response.data[0].profesores as Profesores[]);

                setPrecios(response.data[0].precios as Precio[]);

            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setMsg('Error al cargar los datos. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    const hadleGetCategorias = () => {
        // Solicitud GET
        api.get<any>('Configuration/GetCoursesCategories', { accion: 2 }).then((response) => {
            setCategoria(response.data);
        });
    };

    const hadleGetModalidad = () => {
        // Solicitud GET
        api.get<any>('Configuration/GetCoursesType', { accion: 2 }).then((response) => {
            setModalidad(response.data);
        });
    };

    const hadleGetDependencia = () => {
        // Solicitud GET
        api.get<any>('Configuration/GetDependence', { accion: 2 }).then((response) => {
            setDependencia(response.data);
        });
    };

    const hadleGetTipoAsistentes = () => {
        // Solicitud GET
        api.get<any>('Configuration/GetTypeAttendees', { accion: 2 }).then((response) => {
            setTipoAsistentes(response.data);
        });
    };

    const hadleGetProfesores = () => {
        // Solicitud GET
        api.get<any>('User/GetListUserTeacher').then((response) => {
            setProfesores(response.data);
        });
    };

    const handleAsignarProfesor = (Idprofesor: number) => {
        const profesorExistente = profesores.find(profe => profe.id === Idprofesor);

        if (profesorExistente && !profesorSeleccionado.some(profesor => profesor.id === profesorExistente.id)) {
            setProfesorSeleccionado([...profesorSeleccionado, profesorExistente]);
        }
        setIdProfesor(0);
    };

    const handleEliminarProfesor = (idProfesor: number) => {
        const nuevosProfesoresSeleccionados = profesorSeleccionado.filter(profesor => profesor.id !== idProfesor);
        setProfesorSeleccionado(nuevosProfesoresSeleccionados);
    };



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
            const registroCursos: RegistroCursos = {
                id: props.idCurso,
                titulo: values.titulo || '',
                activo: values.activo,
                pago: !!values.pago,
                formal: !!values.formal,
                acompanante: !!values.acompanante,
                menorEdad: !!values.menorEdad,
                grupal: !!values.grupal,
                descripcion: values.descripcion || '',
                limitarCupos: !!values.limitarCupos,
                cantidadCupos: parseInt(values.cantidadCupos) || 0,
                categoría: values.categoría || '0',
                tipoCurso: values.tipoCurso || '0',
                fechaInicio: values.fechaInicio ? new Date(values.fechaInicio) : null,
                fechaFin: values.fechaFin ? new Date(values.fechaFin) : null,
                fechaLimiteInscripcion: values.fechaLimiteInscripcion ? new Date(values.fechaLimiteInscripcion) : null,
                lugar: values.lugar || '',
                dependencia: values.dependencia || '0',
                imagen: values.imagen || '',
                baseImagen: base64Foto,
                creador: usuario.idUsuario,
                precios: precios,
                profesores: profesorSeleccionado,
            };

            // console.log(JSON.stringify(registroCursos, null, 2));
            let response;
            if (props.idCurso == 0) {
                response = await api.post<any>('Courses/PostCourse', registroCursos);
            } else {
                response = await api.put<any>('Courses/PutCourse', registroCursos);
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
        setIsSubmitting(false);
        setOpenSnackbar(false);
        if (props.idCurso == 0) {
            if (response) {
                if (props.actualizarDatos) {
                    props.actualizarDatos();
                }
                props.mostrarRegistro();
            }
        }
    };

    const StyledTextField = styled(TextField)({
        width: '100%',
        background: '#fff',
        marginBottom: '20px',
    });

    const handleTipoAsistenteChange = (newValue: number) => {
        const selectedType = tipoAsistentes.find(option => option.id === newValue);
        const typeName = selectedType ? selectedType.nombre : '';
        setTipoAsistenteValue(newValue);
        setTipoAsistenteLabel(typeName);
    };

    const handlePrecioChange = (e: ChangeEvent<HTMLInputElement>) => {
        // Actualizar el estado cuando el usuario sale del campo
        setPrecioValue(e.target.value);
    };

    const handleAddTipo = () => {
        const tipo = tipoAsistenteValue;
        const label = tipoAsistenteLabel;
        const precio = precioValue;

        const tipoExistente = precios.find(precio => precio.idTipoAsistente === tipo);

        if (!tipoExistente && (tipo !== 0 && precio !== '')) {
            setPrecios([...precios, { idTipoAsistente: tipo, tipoAsistente: label, precio: precio }]);
            setAddTipoAsistente(false);
        } else {
            setPrecioMensaje('El tipo de asistente ya fue agregado anteriormente o tiene tienes un campo sin seleccionar');
        }
    };

    const handleEliminarTipo = (idTipo: number) => {
        // Filtra los tipos de asistentes para excluir el que queremos eliminar
        const nuevosPrecios = precios.filter(precio => precio.idTipoAsistente !== idTipo);
        setPrecios(nuevosPrecios);
    };


    const handleAddTipoAsistente = () => {
        setPrecioMensaje('');
        setTipoAsistenteValue(0);
        setPrecioValue('');
        setTipoAsistenteLabel('');
        setAddTipoAsistente(!addTipoAsistente);
    };

    const handleVolver = () => {
        if (props.actualizarDatos) {
            props.actualizarDatos();
        }
        props.mostrarRegistro();
    };

    const formatCurrency = (amount: string) => {
        // Formatea el número con punto como separador de miles y coma como separador decimal
        const formattedAmount = parseInt(amount).toLocaleString()
        return `$ ${formattedAmount}`;
    }

    return (
        <div className="AddCursos">
            <div className="AddCursos_Encabezado">
                {props.idCurso == 0 ? (
                    <h3> Crear curso</h3>
                ) : (
                    <h3> Actualizar curso</h3>
                )}
                <div>
                    {props.idCurso == 0 ? (
                        <Button
                            onClick={props.mostrarRegistro}
                            variant="outlined"
                            size="small"
                            startIcon={<IonIcon className='' icon={closeOutline} />}
                        >
                            Cancelar
                        </Button>
                    ) : (
                        <Button
                            onClick={handleVolver}
                            variant="outlined"
                            size="small"
                            startIcon={<IonIcon className='' icon={arrowBackOutline} />}
                        >
                            Volver a la lista
                        </Button>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        startIcon={isSubmitting == true ? (<IonIcon className='' icon={paperPlaneOutline} />) : (<IonIcon className='' icon={saveOutline} />)}
                        disabled={isSubmitting}
                        onClick={handleClick}
                    >
                        {props.idCurso == 0 ? (
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
                        titulo: data?.titulo || '',
                        activo: data?.activo || false,
                        pago: data?.pago || false,
                        formal: data?.formal || false,
                        acompanante: data?.acompanante || false,
                        menorEdad: data?.menorEdad || false,
                        grupal: data?.grupal || false,
                        descripcion: data?.descripcion || '',
                        limitarCupos: data?.limitarCupos || false,
                        cantidadCupos: data?.cantidadCupos || 0,
                        categoría: data?.categoría || '0',
                        tipoCurso: data?.tipoCurso || '0',
                        fechaInicio: data?.fechaInicio ? dayjs(data.fechaInicio) : null,
                        fechaFin: data?.fechaFin ? dayjs(data.fechaFin) : null,
                        fechaLimiteInscripcion: data?.fechaLimiteInscripcion ? dayjs(data.fechaLimiteInscripcion) : null,
                        lugar: data?.lugar || '',
                        dependencia: data?.dependencia || '0',
                        foto: '',
                    }}
                    validate={(valor) => {

                        let errors: any = {};

                        if (!valor.titulo) {
                            errors.titulo = 'Introduce un titulo para el curso';
                        }
                        if (!valor.descripcion) {
                            errors.descripcion = 'Introduce una descripción para el curso';
                        }

                        if (valor.categoría == '0') {
                            errors.categoría = 'campo requerido';
                        }

                        if (valor.tipoCurso == '0') {
                            errors.tipoCurso = 'campo requerido';
                        }

                        if (valor.fechaInicio == null) {
                            errors.fechaInicio = 'campo requerido';
                        }
                        if (valor.fechaFin == null) {
                            errors.fechaFin = 'campo requerido';
                        }
                        if (valor.fechaLimiteInscripcion == null) {
                            errors.fechaLimiteInscripcion = 'campo requerido';
                        }

                        if (valor.limitarCupos == true && valor.cantidadCupos == 0) {
                            errors.cantidadCupos = "Por favor, asegúrese de ingresar la cantidad de cupos para el curso, ya que ha seleccionado la opción de 'Limitar Cupos'.";
                        }

                        if (valor.lugar == '') {
                            errors.lugar = 'campo requerido';
                        }

                        if (valor.dependencia == '0') {
                            errors.dependencia = 'campo requerido';
                        }

                        if (valor.pago) {
                            if (precios.length === 0) {
                                errors.pago = 'Por favor, asegúrese de agregar al menos un precio para un tipo de asistente, ya que ha seleccionado la opción de "Requiere Pago".';
                            }
                        }


                        return errors;
                    }}
                    onSubmit={handleRegistrar}
                >
                    {({ errors, values, setFieldValue }) => (
                        <Form>
                            <div className='AddCursos_Formulario-content'>
                                <div className='AddCursos_Formulario-content-left'>
                                    <StyledTextField
                                        name='titulo'
                                        label="Nombre del curso"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        placeholder='Escribe el nombre completo del curso, por ejemplo: "Introducción a la programación en JavaScript"'
                                        value={values.titulo}
                                        onChange={(e) => setFieldValue('titulo', e.target.value)}
                                    />
                                    <ErrorMessage name='titulo' component={() => <p className='Error'>{errors.titulo}</p>} />

                                    <h4>Descripción</h4>
                                    <Editor
                                        value={values.descripcion}
                                        onEditorChange={(content) => setFieldValue('descripcion', content)}
                                        apiKey='tuezbpkp2ehsxvmrxtl2szjjtayo5yx9fm90xwbjrpbvopkv'
                                        init={{
                                            height: 450,
                                            content_style: "font-size: 16px; font-family: 'Roboto', sans-serif;",
                                            menubar: false,
                                            plugins: [
                                                'lists'
                                            ],
                                            toolbar: 'undo redo formatselect bold italic underline strikethrough alignleft aligncenter alignright bullist'
                                        }}
                                    />
                                    <ErrorMessage name='descripcion' component={() => <p className='Error'>{errors.descripcion}</p>} />
                                    <h4>Profesores</h4>
                                    <i>No te olvides de asignar al menos un profesor al curso o diplomado, ya que esto permite configurar adecuadamente el contenido del mismo.</i>
                                    <div className='AddCursos_Formulario-content-asignarProfesor'>
                                        <div className='AddCursos_Formulario-content-asignarProfesor-select'>
                                            <StyledTextField
                                                id="outlined-select-profesor"
                                                select
                                                label="Profesor"
                                                size="small"
                                                variant="outlined"
                                                value={idProfesor}
                                                onChange={(e) => setIdProfesor(parseInt(e.target.value))}
                                            >
                                                <MenuItem value={'0'}>Seleccione</MenuItem>
                                                {profesores.map((option) => (
                                                    <MenuItem key={option.id} value={option.id.toString()}>
                                                        <div className='contetOption'>
                                                            <img className='SelectImagen' src={`${services.url}/${option.foto}`} alt={option.nombre} /> {option.nombre}
                                                        </div>
                                                    </MenuItem>
                                                ))}
                                            </StyledTextField>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="success"
                                                startIcon={<IonIcon className='' icon={medalOutline} />}
                                                onClick={() => handleAsignarProfesor(idProfesor)}
                                            >
                                                Asignar profesor

                                            </Button>
                                        </div>
                                        <div className='AddCursos_Formulario-content-asignarProfesor-select-imagen'>
                                            {profesorSeleccionado.length > 0 && (
                                                <h4>Profesores asignados</h4>
                                            )}

                                            {profesorSeleccionado && profesorSeleccionado.map((option) => (
                                                <div className='AddCursos_Formulario-content-asignarProfesor-select-content' key={option.id}>
                                                    <img src={`${services.url}/${option.foto}`} alt={option.nombre} />
                                                    <div>
                                                        <h2>{option.nombre}</h2>
                                                        <h3>{option.profesion}</h3>
                                                    </div>
                                                    <IonIcon className='icono' icon={closeOutline} onClick={() => handleEliminarProfesor(option.id)} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <h4>Opciones</h4>
                                    <div className="AddCursos_Formulario-content-left-otrasOpciones">
                                        <div className="otrasOpciones-left">
                                            <ul>
                                                <li>
                                                    <IonIcon className='icono' icon={warningOutline} />
                                                    <Checkbox
                                                        checked={values.limitarCupos}
                                                        onChange={() => setFieldValue('limitarCupos', !values.limitarCupos)}
                                                    />
                                                    ¿Limitar cupos?
                                                    {values.limitarCupos && (<div></div>)}
                                                </li>
                                                <li>
                                                    <IonIcon className='icono' icon={cashOutline} />
                                                    <Checkbox
                                                        checked={values.pago}
                                                        onChange={() => setFieldValue('pago', !values.pago)}
                                                    />
                                                    ¿Requiere Pago?
                                                    {values.pago && (<div></div>)}
                                                </li>
                                                <li>
                                                    <IonIcon className='icono' icon={leafOutline} />
                                                    <Checkbox
                                                        checked={values.formal}
                                                        onChange={() => setFieldValue('formal', !values.formal)}
                                                    />
                                                    ¿Es formal?
                                                </li>
                                                <li>
                                                    <IonIcon className='icono' icon={warningOutline} />
                                                    <Checkbox
                                                        checked={values.menorEdad}
                                                        onChange={() => setFieldValue('menorEdad', !values.menorEdad)}
                                                    />
                                                    ¿Incripcion a menor de edad?
                                                </li>
                                                <li>
                                                    <IonIcon className='icono' icon={peopleOutline} />
                                                    <Checkbox
                                                        checked={values.grupal}
                                                        onChange={() => setFieldValue('grupal', !values.grupal)}
                                                    />
                                                    ¿Incripcion grupal?
                                                </li>
                                                <li>
                                                    <IonIcon className='icono' icon={leafOutline} />
                                                    <Checkbox
                                                        checked={values.acompanante}
                                                        onChange={() => setFieldValue('acompanante', !values.acompanante)}
                                                    />
                                                    ¿Aplica Acompañante?
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="otrasOpciones-right">
                                            {addTipoAsistente && (
                                                <div className='Modal_Precio'>
                                                    <div className='Modal_Precio_Content'>
                                                        <div className='Modal_Precio_Content-Encabezado'>
                                                            <h3>Agregar precios</h3>
                                                            <IonIcon className='icono' icon={closeCircleOutline} onClick={handleAddTipoAsistente} />
                                                        </div>
                                                        <div className='Modal_Precio_Content-body'>
                                                            <p className='Error'>{precioMensaje}</p>
                                                            <StyledTextField
                                                                id="outlined-select-currency"
                                                                select
                                                                label="Tipo de asistente"
                                                                size="small"
                                                                variant="outlined"
                                                                value={tipoAsistenteValue}
                                                                onChange={(e) => handleTipoAsistenteChange(parseInt(e.target.value))}
                                                            >
                                                                <MenuItem value={'0'}>
                                                                    Seleccione
                                                                </MenuItem>
                                                                {tipoAsistentes && tipoAsistentes.map((option) => (
                                                                    <MenuItem key={option.id} value={option.id}>
                                                                        {option.nombre}
                                                                    </MenuItem>
                                                                ))}
                                                            </StyledTextField>

                                                            <input
                                                                type="text"
                                                                value={precioValue}
                                                                onChange={handlePrecioChange}
                                                                className='InputValor'
                                                                placeholder='$0'
                                                            />
                                                        </div>
                                                        <div className='Modal_Precio_Content-footer'>
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                color="success"
                                                                startIcon={<IonIcon className='' icon={addOutline} />}
                                                                onClick={handleAddTipo}
                                                            >
                                                                Agregar

                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {values.limitarCupos == false && values.pago == false && (
                                                <div className='otrasOpciones-right-img'>
                                                    <div>
                                                        <i> Recuerda que puedes marcar cualquiera de estas casillas según las necesidades específicas del curso que estés configurando.</i>
                                                        <img src={Img} alt="" />
                                                    </div>
                                                </div>
                                            )}
                                            {values.limitarCupos == true && (
                                                <div className='otrasOpciones-right-cupos'>
                                                    <ErrorMessage name='cantidadCupos' component={() => <p className='Error'>{errors.cantidadCupos}</p>} />
                                                    <StyledTextField
                                                        label="Cantidad de cupos"
                                                        variant="outlined"
                                                        size="small"
                                                        color="secondary"
                                                        inputProps={{
                                                            inputMode: 'numeric',
                                                            pattern: '[0-9]*', // Esto permite solo números
                                                        }}
                                                        value={values.cantidadCupos}
                                                        onChange={(e) => setFieldValue('cantidadCupos', e.target.value)}
                                                    />
                                                </div>
                                            )}

                                            {values.pago == true && (
                                                <>
                                                    <h4>Precios</h4>
                                                    {precios.map((tipoAsistente, index) => (
                                                        <div className='otrasOpciones-right-Pago' key={index}>
                                                            <div className="otrasOpciones-right-Pago-left">
                                                                <StyledTextField
                                                                    label="Tipo de asistente"
                                                                    size="small"
                                                                    variant="outlined"
                                                                    disabled
                                                                    value={tipoAsistente.tipoAsistente}
                                                                >
                                                                </StyledTextField>
                                                            </div>
                                                            <div className="otrasOpciones-right-Pago-right">
                                                                <StyledTextField
                                                                    label="$$$$"
                                                                    variant="outlined"
                                                                    size="small"
                                                                    disabled
                                                                    color="secondary"
                                                                    value={formatCurrency(tipoAsistente.precio)}
                                                                />
                                                                <IonIcon
                                                                    className='icono iconoTrash'
                                                                    icon={trashOutline}
                                                                    onClick={() => handleEliminarTipo(tipoAsistente.idTipoAsistente)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <ErrorMessage name='pago' component={() => <p className='Error'>{errors.pago}</p>} />
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        color="success"
                                                        startIcon={<IonIcon className='' icon={cashOutline} />}
                                                        onClick={handleAddTipoAsistente}
                                                    >
                                                        Agregar precio

                                                    </Button>
                                                </>
                                            )}

                                        </div>
                                    </div>

                                </div>
                                <div className='AddCursos_Formulario-content-right'>
                                    <div className="AddCursos_Formulario-content-right-contect">
                                        <h4>Estado</h4>
                                        <div className='AddCursos_Formulario-content-right-switch'>
                                            <Switch
                                                checked={values.activo}
                                                onChange={() => setFieldValue('activo', !values.activo)}
                                                color="secondary"
                                            />
                                            <label className={values.activo ? 'Activo' : ''}>{values.activo ? 'Activo' : 'Inactivo'}</label>
                                        </div>
                                    </div>
                                    {props.idCurso !== 0 ? (
                                        <div className="AddCursos_Formulario-content-right-contect">
                                            <div className='AddCursos_Formulario-content-right-contect-previsual'>
                                                <IonIcon className='icono' icon={linkOutline} />
                                                <a
                                                    href={`/Cursos/${data?.id}/${data?.titulo ? encodeURIComponent(data.titulo.replace('/', '-').toLowerCase().replace(/ /g, '-')) : ''}`}
                                                    target="_blank"
                                                >
                                                    Visualizar
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    <div className="AddCursos_Formulario-content-right-contect">
                                        <h4>Imagen</h4>
                                        <div className="AddCursos_Formulario-content-right-contect-imagen">
                                            <img
                                                src={props.idCurso === 0 ? (fotoPreview || foto) : (fotoPreview ? fotoPreview : `${services.url}/${data?.imagen}`)}
                                                alt=""
                                            />

                                            <div className='AddCursos_Formulario-content-right-contect-button'>
                                                <Button
                                                    variant="outlined"
                                                    size="small"
                                                    color="success"
                                                    startIcon={<IonIcon className='' icon={cameraOutline} />}
                                                    onClick={handlePerfilIconClick}
                                                >
                                                    Seleccionar imagen

                                                </Button>
                                            </div>

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

                                    </div>
                                    <div className="AddCursos_Formulario-content-right-contect">
                                        <h4>Organizar</h4>
                                        <ErrorMessage name='categoría' component={() => <p className='Error'>{errors.categoría}</p>} />
                                        <StyledTextField
                                            id="outlined-select-currency"
                                            select
                                            label="Categoria"
                                            size="small"
                                            variant="outlined"
                                            value={values.categoría}
                                            onChange={(e) => setFieldValue('categoría', e.target.value)}
                                        >
                                            <MenuItem value={'0'}>
                                                Seleccione
                                            </MenuItem>

                                            {categoria && categoria.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.nombre}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                        <ErrorMessage name='tipoCurso' component={() => <p className='Error'>{errors.tipoCurso}</p>} />
                                        <StyledTextField
                                            id="outlined-select-currency"
                                            select
                                            label="Modalidad"
                                            size="small"
                                            variant="outlined"
                                            value={values.tipoCurso}
                                            onChange={(e) => setFieldValue('tipoCurso', e.target.value)}
                                        >
                                            <MenuItem value={'0'}>
                                                Seleccione
                                            </MenuItem>
                                            {modalidad && modalidad.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.nombre}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                        <ErrorMessage name='lugar' component={() => <p className='Error'>{errors.lugar}</p>} />
                                        <StyledTextField
                                            name='titulo'
                                            label="Lugar"
                                            variant="outlined"
                                            size="small"
                                            color="secondary"
                                            placeholder='Lugar donde se realizara'
                                            value={values.lugar}
                                            onChange={(e) => setFieldValue('lugar', e.target.value)}
                                        />
                                        <ErrorMessage name='dependencia' component={() => <p className='Error'>{errors.dependencia}</p>} />
                                        <StyledTextField
                                            id="outlined-select-currency"
                                            select
                                            label="Dependencia"
                                            size="small"
                                            variant="outlined"
                                            value={values.dependencia}
                                            onChange={(e) => setFieldValue('dependencia', e.target.value)}
                                        >
                                            <MenuItem value={'0'}>
                                                Seleccione
                                            </MenuItem>

                                            {dependencia && dependencia.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    {option.nombre}
                                                </MenuItem>
                                            ))}
                                        </StyledTextField>
                                    </div>

                                    <div className="AddCursos_Formulario-content-right-contect">
                                        <h4>Fechas</h4>
                                        <ErrorMessage name='fechaInicio' component={() => <p className='Error'>{errors.fechaInicio}</p>} />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    className='Pickers'
                                                    label="FECHA DE INICIO"
                                                    value={values.fechaInicio}
                                                    onChange={(date) => setFieldValue('fechaInicio', date)}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <ErrorMessage name='fechaFin' component={() => <p className='Error'>{errors.fechaFin}</p>} />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    className='Pickers'
                                                    label="FECHA FIN"
                                                    value={values.fechaFin}
                                                    onChange={(date) => setFieldValue('fechaFin', date)}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <ErrorMessage name='fechaLimiteInscripcion' component={() => <p className='Error'>{errors.fechaLimiteInscripcion}</p>} />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    className='Pickers'
                                                    label="FECHA LIMITE DE INSCRIPCIÓN"
                                                    value={values.fechaLimiteInscripcion}
                                                    onChange={(date) => setFieldValue('fechaLimiteInscripcion', date)}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>

                                    </div>

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
                    {props.idCurso == 0 ? (
                        msg
                    ) : (
                        msg
                    )}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AddCursos