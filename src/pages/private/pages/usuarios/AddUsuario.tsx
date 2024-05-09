import './Usuarios.css'
import { IonIcon } from '@ionic/react';
import { Alert, Button, Grid, Snackbar, TextField, styled } from '@mui/material';
import { arrowBackOutline, personOutline, layersOutline, medalOutline, starOutline, removeCircleOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Table } from '../../components/table';
import { AsignarProfesores, UsuariosInformacion, services } from '../../../../models';
import { api } from '../../../../services';
import { format, } from 'date-fns';
import AsignarProfesor from './AsignarProfesor';
import { useSelector } from 'react-redux';
import { AppStore } from '../../../../redux/store';

interface Props {
    VerRegistroUsuario: () => void;
    actualizarDatos?: () => void;
    idUsuario: number;
}

const AddUsuario: React.FC<Props> = (props) => {

    const usuario = useSelector((store: AppStore) => store.user);
    const [menu, setMenu] = useState(1);
    const [dataUsuario, setDataUsuario] = useState<UsuariosInformacion>();
    const [asignarProfesor, setAsignarProfesor] = useState(false);
    const [response, setResponse] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        hadleGetId();
    }, [props.idUsuario]);

    const StyledTextField = styled(TextField)({
        width: '100%',
        background: '#fff',
        marginBottom: '20px',
    });

    const hadleAsignarProfesor = async () => {
        setAsignarProfesor(!asignarProfesor);

    }

    const hadleGetId = async () => {
        try {
            const response = await api.get<UsuariosInformacion>('User/GetIdUser', { idUser: props.idUsuario });

            setDataUsuario({
                id: response.data.id,
                nombre: response.data.nombre,
                correo: response.data.correo,
                tipoDocumento: response.data.tipoDocumento,
                documento: response.data.documento,
                fechaNacimiento: response.data.fechaNacimiento,
                celular: response.data.celular,
                pais: response.data.pais,
                departamento: response.data.departamento,
                ciudad: response.data.ciudad,
                direccion: response.data.direccion,
                foto: response.data.foto,
                activo: response.data.activo,
                fechaRegistro: response.data.fechaRegistro,
                rol: response.data.rol,
                esProfesor: response.data.esProfesor
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const hadleAsinarAdmin = async () => {
        setIsSubmitting(true);
        try {

            const registro: AsignarProfesores = {
                accion: 0,
                idUsuario: props.idUsuario,
                profesion: '',
                foto: '',
            };

            let response = await api.post<any>('User/PostAssignAdmin', registro);
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

    const handleQuitarProfesor = async () => {
        setIsSubmitting(true);
        try {

            const registro: AsignarProfesores = {
                accion: 2,
                idUsuario: props.idUsuario,
                profesion: '',
                foto: '',
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

    const handleCloseSnackbar = () => {
        setIsSubmitting(false);
        setOpenSnackbar(false);
        hadleGetId();
    };

    const handleClose = () => {
        if (props.actualizarDatos) {
            props.actualizarDatos();
        }
        props.VerRegistroUsuario();
    };

    const data = [
        {
            id: 1,
            nombreCurso: "UX/UI Diseño y desarrollo de productos digitales centrados en el usuario",
            tipo: "Curso",
            fechaInicio: "2024-02-25",
            fechaFin: "2024-02-25",
            estado: 'Aprobado'
        },
        {
            id: 2,
            nombreCurso: "Estrategias pedagógicas innovadoras",
            tipo: "Seminario",
            fechaInicio: "2022-10-25",
            fechaFin: "2022-10-25",
            estado: 'En curso'
        },
        {
            id: 3,
            nombreCurso: "Ministerio musical",
            tipo: "Evento",
            fechaInicio: "2022-10-25",
            fechaFin: "2022-10-25",
            estado: 'No aprobado'
        }
    ];

    return (
        <div className='AddUsuario'>
            <div className="AddUsuario_Encabezado">
                <h3> Datos del usuario</h3>
                <div>
                    <Button
                        onClick={handleClose}
                        variant="outlined"
                        size="small"
                        startIcon={<IonIcon className='' icon={arrowBackOutline} />}
                    >
                        Volver a usuarios
                    </Button>
                </div>

            </div>
            <div className='AddUsuario_Content'>
                <div className="AddUsuario_Content-left">
                    <div className='AddUsuario_Content-left-Usuario'>
                        <img src={`${services.url}/${dataUsuario?.foto}`} alt="" />
                        <h2>{dataUsuario?.nombre}</h2>
                        <p>Se unió el {dataUsuario?.fechaRegistro ? format(new Date(dataUsuario.fechaRegistro), "dd 'de' MMMM 'de' yyyy ") : 'Fecha desconocida'}</p>
                    </div>
                    <div className='AddUsuario_Content-left-Usuario '>
                        {dataUsuario?.rol == 1 ? (
                            <div className='AddUsuario_Content-left-Usuario--rol'>
                                <p className={`es es${dataUsuario?.rol}`}> <IonIcon className='icono' icon={starOutline} />
                                    Administrador
                                </p>
                            </div>
                        ) : (
                            usuario.idUsuario == 1 && (
                                <Button
                                    disabled={isSubmitting}
                                    onClick={hadleAsinarAdmin}
                                    variant="outlined"
                                    size="small"
                                    color="warning"
                                    startIcon={<IonIcon className='' icon={starOutline} />}
                                >
                                    Asignar como Administrador
                                </Button>
                            )
                        )}
                        {usuario.tipoUsuario == 1 && (
                            dataUsuario?.esProfesor == true ? (
                                <>
                                    <p className={`es es2`}> <IonIcon className='icono' icon={medalOutline} />
                                        PROFESOR
                                    </p>
                                    <Button
                                        disabled={isSubmitting}
                                        onClick={handleQuitarProfesor}
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        startIcon={<IonIcon className='' icon={removeCircleOutline} />}
                                    >
                                        Quitar como profesor
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    onClick={hadleAsignarProfesor}
                                    variant="outlined"
                                    size="small"
                                    color="success"
                                    startIcon={<IonIcon className='' icon={medalOutline} />}
                                >
                                    Asignar como profesor
                                </Button>

                            )
                        )}


                    </div>
                    <div className='AddUsuario_Content-left-Usuario'>
                        <ul>
                            <li
                                className={`${menu == 1 ? 'LiActive' : ''}`}
                                onClick={() => setMenu(1)}
                            >
                                <IonIcon className='icono' icon={personOutline} />
                                Información personal
                            </li>
                            <li
                                className={`${menu == 3 ? 'LiActive' : ''}`}
                                onClick={() => setMenu(3)}
                            >
                                <IonIcon className='icono' icon={layersOutline} />
                                Cursos
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="AddUsuario_Content-right">
                    {menu == 1 ? (
                        <div className='AddUsuario_Content-right-Informacion'>
                            <h1>Información personal </h1>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <StyledTextField
                                        label="Nombre"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        defaultValue={dataUsuario?.nombre}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <StyledTextField
                                        label="Tipo Documento"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        defaultValue={dataUsuario?.tipoDocumento}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <StyledTextField
                                        label="Documento"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        defaultValue={dataUsuario?.documento}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <StyledTextField
                                        label="Correo"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        defaultValue={dataUsuario?.correo}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <StyledTextField
                                        label="Teléfono"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        defaultValue={dataUsuario?.celular}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <StyledTextField
                                        label="País"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        defaultValue={dataUsuario?.pais}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <StyledTextField
                                        label="Departamento"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        defaultValue={dataUsuario?.departamento}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <StyledTextField
                                        label="Ciudad"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        defaultValue={dataUsuario?.ciudad}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <StyledTextField
                                        label="Dirección de residencia"
                                        variant="outlined"
                                        size="small"
                                        color="secondary"
                                        defaultValue={dataUsuario?.direccion}
                                    />
                                </Grid>
                            </Grid>
                        </div>

                    ) : (
                        <div className='AddUsuario_Content-right-Informacion'>
                            <h1>Cursos</h1>
                            <Table
                                data={data}
                            />
                        </div>
                    )}

                </div>
            </div>
            {
                asignarProfesor &&
                <AsignarProfesor VerRegistroUsuario={() => hadleAsignarProfesor()} idUsuario={props.idUsuario} actualizarDatos={hadleGetId} />
            }
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
        </div >
    )
}

export default AddUsuario