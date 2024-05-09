import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeOutline, addOutline } from "ionicons/icons";
import { Button, Checkbox, MenuItem, TextField, ThemeProvider, createTheme } from '@mui/material';
import { RegistroCursos, TypeDocument } from '../../models';
import styled from '@emotion/styled';
import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import { BotonSubmit } from '../boton';
import './Inscripcion.css'
import { api } from '../../services';

interface Props {
    onClose: () => void;
    idCurso: number;
    data: RegistroCursos[];
}

const Inscripcion: React.FC<Props> = (props) => {
    const [msg, setMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [grupal, setGrupal] = useState(false);
    const [addPersona, setAddPersona] = useState(false);
    const [menor, setMenor] = useState(false);
    const [acompañante, setAcompañante] = useState(false);
    const [tipoDocumentos, setTipoDocumentos] = useState<TypeDocument[] | null>(null);

    useEffect(() => {
        hadleGeTipoDocumentos();
    }, []);


    const handleChangeDiv = (accion: number) => {
        if (accion === 1) {
            setGrupal(prevGrupal => !prevGrupal)
        } else if (accion === 2) {
            setMenor(prevMenor => !prevMenor);
        } else if (accion === 3) {
            setAcompañante(prevAcompañante => !prevAcompañante);
        }
    };

    const handleAddDiv = (accion: number) => {
        if (accion === 1) {
            setAddPersona(!addPersona)
        }
    };

    const hadleGeTipoDocumentos = () => {
        // Solicitud GET
        api.get<any>('Configuration/GetTypeDocument', { accion: 2 }).then((response) => {
            setTipoDocumentos(response.data);
        });
    };


    const handleInscripcion = async (values: FormikValues) => {
        setIsLoading(true);
        setMsg('bien');
    };



    const handleAgregar = async (values: FormikValues) => {
        setIsLoading(true);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: '#00000000',
                light: '#00000000',
                dark: '#00000000',
                contrastText: '#c4c8ce',
            },
        },
    });

    // Estilos personalizados para el TextField
    const StyledTextField = styled(TextField)({
        width: '100%',
        '& .MuiFormLabel-root': {
            color: '#c4c8ce',
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: '#c4c8ce4f',
        },
        '& .MuiInputBase-input::placeholder': {
            color: '#d5d5d5c2',
        },
        '& .MuiInputBase-input': {
            color: '#ffffff',
        },
        '& .MuiInputBase-root': {
            border: 'none',
        },

        '& .MuiInputBase-root.Mui-focused': {
            color: '#ffff',
        },
    });

    return (
        <div className='Login Inscripcion'>
            <div className='Login_content-cerrar' onClick={props.onClose}> </div>
            <ThemeProvider theme={theme}>
                <div className="Login_content">
                    <div className="Login_content_header">
                        <IonIcon
                            className="icono"
                            onClick={props.onClose}
                            icon={closeOutline}
                        />
                    </div>
                    <div className="Login_content_titulo">
                        <h2>SLIES</h2>
                        <h3>Inscripción {props.idCurso}</h3>
                    </div>
                    {props.data && (
                        props.data.map((curso, index) => (
                            <div className="Login_content_body Incripciones" key={index}>
                                <p className='Login_content_body-p'>Gracias por tu interés en nuestros cursos. Por favor, completa el siguiente formulario.</p>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        tipoAsistente: 0,
                                        contraseña: '',
                                    }}
                                    validate={(valor) => {
                                        let errors: any = {};
                                        if (!valor.tipoAsistente) {
                                            errors.tipoAsistente = 'Campo obligatorio';
                                        }

                                        if (!valor.contraseña) {
                                            errors.contraseña = 'Campo obligatorio';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={handleInscripcion}
                                >
                                    {({ errors, values, setFieldValue, isSubmitting }) => (
                                        <Form>
                                            <>
                                                {curso.pago && (
                                                    <div className={`Login_content_body-input ${errors.tipoAsistente ? 'Input_Error' : ''}`}>

                                                        <StyledTextField
                                                            select
                                                            label="Tipo asistente"
                                                            size="small"
                                                            value={values.tipoAsistente}
                                                            onChange={(e) => setFieldValue('tipoAsistente', e.target.value)}
                                                        >
                                                            {Array.isArray(curso.precios) && curso.precios.map((precio, precioIndex) => (
                                                                <MenuItem key={precioIndex} value={precio.id}>
                                                                    {precio.tipoAsistente}
                                                                </MenuItem>
                                                            ))}
                                                        </StyledTextField>

                                                        <ErrorMessage name='tipoAsistente' component={() => <p className='Error'>{errors.tipoAsistente}</p>} />
                                                    </div>
                                                )}

                                                <div className="Inscripcion_Grupal">
                                                    <ul>
                                                        {curso.grupal && (
                                                            <li>
                                                                <Checkbox
                                                                    name='grupal'
                                                                    checked={grupal}
                                                                    onChange={() => handleChangeDiv(1)}
                                                                    color="info"
                                                                />
                                                                Realizar inscripción grupal
                                                            </li>
                                                        )}
                                                        {curso.menorEdad && (
                                                            <li>
                                                                <Checkbox
                                                                    name='menor'
                                                                    checked={menor}
                                                                    onChange={() => handleChangeDiv(2)}
                                                                    color="info"
                                                                />
                                                                Realizar inscripción a menor de edad
                                                            </li>
                                                        )}
                                                        {curso.acompanante && (
                                                            <li>
                                                                <Checkbox
                                                                    name='acompañante'
                                                                    checked={acompañante}
                                                                    onChange={() => handleChangeDiv(3)}
                                                                    color="info"
                                                                />
                                                                Realizar inscripción a acompañante
                                                            </li>
                                                        )}
                                                    </ul>
                                                    {grupal && (
                                                        <div className='Inscripcion_Grupal--content'>
                                                            <div className='Inscripcion_Grupal--boton'>
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    color="info"
                                                                    startIcon={<IonIcon className='' icon={addOutline} />}
                                                                    onClick={() => handleAddDiv(1)}
                                                                >
                                                                    Agregar persona

                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {menor && (
                                                        <div className='Inscripcion_Grupal--boton'>
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                color="info"
                                                                startIcon={<IonIcon className='' icon={addOutline} />}
                                                            >
                                                                Agregar menor

                                                            </Button>
                                                        </div>
                                                    )}
                                                    {acompañante && (
                                                        <div className='Inscripcion_Grupal--boton'>
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                color="info"
                                                                startIcon={<IonIcon className='' icon={addOutline} />}
                                                            >
                                                                Agregar acompañante

                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                                <ErrorMessage name='contraseña' component={() => <p className='Error'>{errors.contraseña}</p>} />


                                            </>
                                            <BotonSubmit texto={'Incribirme'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleInscripcion} color="registrarme" />
                                            <p className='Login_Respuesta'>{msg}</p>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        ))
                    )}
                    {addPersona && (
                        <div className='Inscripcion_Grupal--add'>
                            <div className="Inscripcion_Grupal--add--encabezado">
                                <h2>Inscribir persona</h2>
                                <IonIcon
                                    className="icono"
                                    onClick={() => setAddPersona(false)}
                                    icon={closeOutline}
                                />
                            </div>
                            <div className='Inscripcion_Grupal--add--body'>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        correo: '',
                                        nombre: '',
                                        numeroDocumento: '',
                                        tipoDocumento: '',
                                        celular: '',
                                    }}
                                    
                                    validate={(valor) => {
                                        let errors: any = {};
                                        if (!valor.nombre) {
                                            errors.nombre = 'Campo obligatorio';
                                        }
                                        if (!valor.correo) {
                                            errors.correo = 'El correo electrónico es obligatorio';
                                        } else if (!/^\S+@\S+\.\S+$/.test(valor.correo)) {
                                            errors.correo = 'Introduce una dirección de correo electrónico válida';
                                        }

                                        if (!valor.tipoDocumento) {
                                            errors.tipoDocumento = 'Campo obligatorio';
                                        }
                                        if (!valor.numeroDocumento) {
                                            errors.numeroDocumento = 'Campo obligatorio';
                                        }
                                        if (!valor.celular) {
                                            errors.celular = 'Campo obligatorio';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={handleAgregar}
                                >
                                    {({ errors, values, setFieldValue, isSubmitting }) => (
                                        <Form>
                                            <>
                                                <div className={`Login_content_body-input ${errors.tipoDocumento ? 'Input_Error' : ''}`}>
                                                    <StyledTextField
                                                        id="demo-simple-select"
                                                        select
                                                        label="Tipo de documento"
                                                        size="small"
                                                        value={values.tipoDocumento}
                                                        onChange={(e) => setFieldValue('tipoDocumento', e.target.value)}
                                                    >
                                                        {tipoDocumentos && tipoDocumentos.map((option) => (
                                                            <MenuItem key={option.id} value={option.id}>
                                                                {option.abbreviacion} - {option.nombre}
                                                            </MenuItem>
                                                        ))}
                                                    </StyledTextField>
                                                    <ErrorMessage name='tipoDocumento' component={() => <p className='Error'>{errors.tipoDocumento}</p>} />
                                                </div>
                                                <div className={`Login_content_body-input ${errors.numeroDocumento ? 'Input_Error' : ''}`}>
                                                    <StyledTextField
                                                        name='numeroDocumento'
                                                        label="Documento"
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder='Introduce tu número de documento'
                                                        value={values.numeroDocumento}
                                                        onChange={(e) => setFieldValue('numeroDocumento', e.target.value)}
                                                    />
                                                    <ErrorMessage name='numeroDocumento' component={() => <p className='Error'>{errors.numeroDocumento}</p>} />
                                                </div>
                                                <div className={`Login_content_body-input ${errors.correo ? 'Input_Error' : ''}`}>
                                                    <StyledTextField
                                                        name='correo'
                                                        label="Correo electrónico"
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder='Introduce tu correo electrónico'
                                                        value={values.correo}
                                                        onChange={(e) => setFieldValue('correo', e.target.value)}
                                                    />
                                                    <ErrorMessage name='correo' component={() => <p className='Error'>{errors.correo}</p>} />
                                                </div>
                                                <div className={`Login_content_body-input ${errors.nombre ? 'Input_Error' : ''}`}>
                                                    <StyledTextField
                                                        name='nombre'
                                                        label="Nombre completo"
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder='Introduce tu nombre completo'
                                                        value={values.nombre}
                                                        onChange={(e) => setFieldValue('nombre', e.target.value)}
                                                    />
                                                    <ErrorMessage name='nombre' component={() => <p className='Error'>{errors.nombre}</p>} />
                                                </div>
                                                <div className={`Login_content_body-input ${errors.celular ? 'Input_Error' : ''}`}>
                                                    <StyledTextField
                                                        name='celular'
                                                        label="Celular"
                                                        variant="outlined"
                                                        size="small"
                                                        placeholder='Introduce tu número de celular'
                                                        value={values.celular}
                                                        onChange={(e) => setFieldValue('celular', e.target.value)}
                                                    />
                                                    <ErrorMessage name='celular' component={() => <p className='Error'>{errors.celular}</p>} />
                                                </div>

                                            </>
                                            <BotonSubmit texto={'Agregar persona'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleAgregar} color="guardar" />

                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    )}
                </div>
            </ThemeProvider>
        </div>
    );
}

export default Inscripcion;
