import { IonIcon } from "@ionic/react";
import { MenuItem, TextField, ThemeProvider } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import { closeOutline, arrowBackOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { BotonSubmit } from "../../boton";
import { Cities, Country, State, TypeDocument, Usuario } from "../../../models";
import { api } from "../../../services";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import foto from '../../../assets/img/perfil-blanco.png';


interface Props {
  mostrarInicio: () => void;
  onClose: () => void;
}

const Registro: React.FC<Props> = (props) => {
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paso, setPaso] = useState(1);
  const [textoBoton, setTextoBoton] = useState('Continuar');
  const [tipoDocumentos, setTipoDocumentos] = useState<TypeDocument[] | null>(null);
  const [paises, setPaises] = useState<Country[] | null>(null);
  const [departamento, setDepartamento] = useState<State[] | null>(null);
  const [ciudades, setCiudades] = useState<Cities[] | null>(null);
  const [mostrarCiudades, setMostrarCiudades] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fotoPreview, setFotoPreview] = useState('');
  const [base64Foto, setBase64Foto] = useState('');

  useEffect(() => {
    hadleGeTipoDocumentos();
    handleGetPaises();
  }, []);

  const hadleGeTipoDocumentos = () => {
    // Solicitud GET
    api.get<any>('Configuration/GetTypeDocument', { accion: 2 }).then((response) => {
      setTipoDocumentos(response.data);
    });
  };

  const handleGetPaises = () => {
    // Solicitud GET
    api.get<any>('Generales/GetCountry').then((response) => {
      setPaises(response.data);
    });
  };

  const handleGetStates = (idCountry: number) => {
    // Solicitud GET
    api.get<any>('Generales/GetState', { idCountry: idCountry }).then((response) => {
      setDepartamento(response.data);
    });

    if (idCountry == 10) {
      setMostrarCiudades(true);
    } else {
      setMostrarCiudades(false);
    }
  };

  const handleGetCiudades = (idState: number) => {
    // Solicitud GET
    api.get<any>('Generales/GetCities', { idState: idState }).then((response) => {
      setCiudades(null);
      setCiudades(response.data);
    });
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

  const handleRegistro = async (values: FormikValues) => {
    setIsLoading(true);
    if (paso == 3) {
      setTextoBoton('Registrarme');
      setIsLoading(false);
    }
    if (paso < 4) {
      setPaso(paso + 1);
      setIsLoading(false);

    } else {

      const usuario: Usuario = {
        id: 0,
        nombre: values.nombre,
        correo: values.correo,
        tipoDocumento: values.tipoDocumento,
        documento: values.numeroDocumento,
        fechaNacimiento: values.nacimiento.toISOString(),
        celular: values.celular,
        pais: values.pais,
        departamento: values.departamento,
        ciudad: values.ciudad,
        direccion: values.direccion,
        foto: base64Foto,
        activo: true,
        fechaRegistro: new Date(),
        password: values.contraseña
      };

      console.log(JSON.stringify(usuario));
      try {
        // Solicitud POST
        const response = await api.post<any>('User/PostUser', usuario);
        if (response.data.resultado === true) {
          setPaso(5);
        }
        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
        setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
        setIsLoading(false);
      }

    }

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
    }
    ,
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#c4c8ce4f',
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#d5d5d5c2',
    },
    '& .MuiInputBase-input': {
      color: '#ffffff',
    },
  });

  // Estilos personalizados para el DatePicker
  const StyledDatePicker = styled(DatePicker)({
    width: '100%',
    '& .MuiInputBase-root': {
      color: '#ffffff',
    },
    '& .MuiFormLabel-root': {
      color: '#c4c8ce',
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#d5d5d5c2',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="Login_content_header Login_content_header-volver ">
        <IonIcon
          className="icono"
          onClick={props.mostrarInicio}
          icon={arrowBackOutline}
        />
        <IonIcon
          className="icono"
          onClick={props.onClose}
          icon={closeOutline}
        />
      </div>
      <div className="Login_content_titulo">
        <h2>SLIES</h2>
        <h3>Crear una cuenta</h3>
      </div>
      <div className="Login_content_body">
        <Formik
          enableReinitialize={true}
          initialValues={{
            nombre: '',
            correo: '',
            tipoDocumento: '',
            numeroDocumento: '',
            nacimiento: null,
            celular: '',
            pais: '',
            departamento: '',
            ciudad: '',
            direccion: '',
            foto: '',
            contraseña: '',
            contraseñaConfirmar: '',
          }}
          validate={(valor) => {
            let errors: any = {};
            if (paso === 1) {

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
              if (!valor.nacimiento) {
                errors.nacimiento = 'Campo obligatorio';
              } else {
                // Validación de edad mayor de 18 años
                const birthDate = new Date(valor.nacimiento);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                  age--;
                }
                if (age < 18) {
                  errors.nacimiento = 'Debe ser mayor de 18 años';
                }
              }
              if (!valor.celular) {
                errors.celular = 'Campo obligatorio';
              }
            } else if (paso === 2) {

              if (!valor.pais) {
                errors.pais = 'Campo obligatorio';
              }

              if (!valor.departamento) {
                errors.departamento = 'Campo obligatorio';
              }
              if (valor.pais == '10') {
                if (!valor.ciudad) {
                  errors.ciudad = 'Campo obligatorio';
                }
              }
              if (!valor.direccion) {
                errors.direccion = 'Campo obligatorio';
              }
            } else if (paso === 4) {
              if (!valor.contraseña) {
                errors.contraseña = 'La contraseña es obligatoria';
              } else if (valor.contraseña.length < 10) {
                errors.contraseña = 'La contraseña debe tener al menos 10 caracteres';
              }

              if (!valor.contraseñaConfirmar) {
                errors.contraseñaConfirmar = 'Confirmar la contraseña es obligatorio';
              }

              if (valor.contraseña !== valor.contraseñaConfirmar) {
                errors.contraseñaConfirmar = 'Las contraseñas no coinciden';
              }

            }
            return errors;
          }}
          onSubmit={handleRegistro}
        >
          {({ errors, values, setFieldValue, isSubmitting }) => (
            <Form>
              {paso === 1 ? (
                <>
                  <div className="Login_content_body-msg">
                    <p>Información personal</p>
                    <p>Paso {paso} de 4 </p>
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
                  <div className={`Login_content_body-input ${errors.nacimiento ? 'Input_Error' : ''}`}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <StyledDatePicker
                          className='Pickers'
                          label="Fecha de nacimiento"
                          value={values.nacimiento}
                          onChange={(date) => setFieldValue('nacimiento', date)}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <ErrorMessage name='nacimiento' component={() => <p className='Error'>{errors.nacimiento}</p>} />
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

              ) : paso === 2 ? (
                <>
                  <div className="Login_content_body-msg">
                    <p>Información de residencia</p>
                    <p>Paso {paso} de 4 </p>
                  </div>
                  <div className={`Login_content_body-input ${errors.pais ? 'Input_Error' : ''}`}>
                    <StyledTextField
                      select
                      label="Pais"
                      size="small"
                      value={values.pais}
                      onChange={(e) => {
                        setFieldValue('pais', e.target.value);
                        handleGetStates(parseInt(e.target.value));
                      }}
                    >
                      {paises && paises.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </StyledTextField>
                    <ErrorMessage name='pais' component={() => <p className='Error'>{errors.pais}</p>} />
                  </div>
                  <div className={`Login_content_body-input ${errors.departamento ? 'Input_Error' : ''}`}>
                    <StyledTextField
                      select
                      label="Departamento"
                      size="small"
                      value={values.departamento}
                      onChange={(e) => {
                        setFieldValue('departamento', e.target.value);
                        handleGetCiudades(parseInt(e.target.value));
                      }}
                    >
                      {departamento && departamento.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </StyledTextField>
                    <ErrorMessage name='departamento' component={() => <p className='Error'>{errors.departamento}</p>} />
                  </div>
                  {mostrarCiudades && (
                    <div className={`Login_content_body-input ${errors.ciudad ? 'Input_Error' : ''}`}>
                      <StyledTextField
                        select
                        label="Ciudad"
                        size="small"
                        value={values.ciudad}
                        onChange={(e) => setFieldValue('ciudad', e.target.value)}
                      >
                        {ciudades && ciudades.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </StyledTextField>
                      <ErrorMessage name='ciudad' component={() => <p className='Error'>{errors.ciudad}</p>} />
                    </div>
                  )}
                  <div className={`Login_content_body-input ${errors.direccion ? 'Input_Error' : ''}`}>
                    <StyledTextField
                      name='direccion'
                      label="Dirección de residencia"
                      variant="outlined"
                      size="small"
                      placeholder='Introduce tu dirección de residencia'
                      value={values.direccion}
                      onChange={(e) => setFieldValue('direccion', e.target.value)}
                    />
                    <ErrorMessage name='direccion' component={() => <p className='Error'>{errors.direccion}</p>} />
                  </div>
                </>
              ) : paso === 3 ? (

                <>
                  <div className="Login_content_body-msg">
                    <p>Foto de perfil</p>
                    <p>Paso {paso} de 4 </p>
                  </div>
                  <p className="Login_content_body-texto"><i>Ten en cuenta que esta imagen será visible en tu carnet digital, así que elige una que refleje tu identidad de manera adecuada y que te represente de la mejor manera posible.</i></p>
                  <div className="Login_content_body-image">
                    <img src={fotoPreview || foto} alt="" />
                    <div className="Login_content_body-image-select" onClick={handlePerfilIconClick}>
                      <p>Clic para seleccionar foto</p>
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
                </>


              ) : paso === 5 ? (

                <div className="Login_content_body-registro-Exito">
                  <h3>🎉 ¡Bienvenido a bordo!🎉</h3>
                  <p><span>¡Haz completado la creación de tu cuenta!</span> Estás listo para aprovechar al máximo todo lo que nuestra plataforma tiene para ofrecer.</p>

                </div>


              ) : (
                <>
                  <div className="Login_content_body-msg">
                    <p>Crea una contraseña</p>
                    <p>Paso {paso} de 4 </p>
                  </div>
                  <p className="Login_content_body-texto"><i>Debe tener al menos 10 caracteres.</i></p>
                  <div className={`Login_content_body-input ${errors.contraseña ? 'Input_Error' : ''}`}>
                    <StyledTextField
                      type='password'
                      name='contraseña'
                      label="Contraseña"
                      variant="outlined"
                      size="small"
                      placeholder='Introduce tu contraseña'
                      value={values.contraseña}
                      onChange={(e) => setFieldValue('contraseña', e.target.value)}
                    />
                    <ErrorMessage name='contraseña' component={() => <p className='Error'>{errors.contraseña}</p>} />
                  </div>
                  <div className={`Login_content_body-input ${errors.contraseñaConfirmar ? 'Input_Error' : ''}`}>
                    <StyledTextField
                      type='password'
                      name='contraseñaConfirmar'
                      label="Confirmar contraseña"
                      variant="outlined"
                      size="small"
                      placeholder='Confirmar la contraseña'
                      value={values.contraseñaConfirmar}
                      onChange={(e) => setFieldValue('contraseñaConfirmar', e.target.value)}
                    />
                    <ErrorMessage name='contraseñaConfirmar' component={() => <p className='Error'>{errors.contraseñaConfirmar}</p>} />
                  </div>
                </>

              )}

              {paso !== 5 ? (
                <>
                  <BotonSubmit
                    texto={textoBoton}
                    isLoading={isLoading}
                    isSubmitting={isSubmitting}
                    onClick={() => handleRegistro}
                    color={textoBoton}
                  />
                  <p className='Login_Respuesta'>{msg}</p>
                </>
              ) : (
                <div className="Login_content_body-registro">
                  <button onClick={() => props.mostrarInicio()}>
                    Iniciar sesion
                  </button>
                </div>
              )}


            </Form>
          )}
        </Formik>

      </div>
    </ThemeProvider>
  )
}

export default Registro