import { IonIcon } from "@ionic/react";
import { TextField, ThemeProvider } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import { ErrorMessage, Form, Formik, FormikValues } from "formik";
import { closeOutline } from "ionicons/icons";
import { useState } from "react";
import { BotonSubmit } from "../../boton";
import { useDispatch } from "react-redux";
import { createUser } from "../../../redux/states/user";
import { api } from "../../../services";
import { Base64 } from "js-base64";

interface Props {
  mostrarRecordar: () => void;
  mostrarRegistro: () => void;
  onClose: () => void;
  mostrarInicio: () => void;
}

const Iniciar: React.FC<Props> = (props) => {
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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

  const handleIniciar = async (values: FormikValues) => {
    setIsLoading(true);
    const response = await api.get<any>('Login/GetAutenticar', { correo: values.correo, password: values.contraseña});
    if (response.data.result === false) {
        setMsg(response.data.message);
        setIsLoading(false);
    } else {

      localStorage.setItem('token', response.data.token);
      const token = response.data.token.split(".")[1];
      const decodedValue = Base64.decode(token);
      const obj = JSON.parse(decodedValue);
      dispatch(createUser({ ...obj }));
      setIsLoading(false);
      props.mostrarInicio();
      props.onClose();
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <div className="Login_content_header">
        <IonIcon
          className="icono"
          onClick={props.onClose}
          icon={closeOutline}
        />
      </div>
      <div className="Login_content_titulo">
        <h2>SLIES</h2>
        <h3>Inicia sesión para comenzar</h3>
      </div>
      <div className="Login_content_body">
        <Formik
          enableReinitialize={true}
          initialValues={{
            correo: '',
            contraseña: '',
          }}
          validate={(valor) => {
            let errors: any = {};
            if (!valor.correo) {
              errors.correo = 'El correo electrónico es obligatorio';
            } else if (!/^\S+@\S+\.\S+$/.test(valor.correo)) {
              errors.correo = 'Introduce una dirección de correo electrónico válida';
            }

            if (!valor.contraseña) {
              errors.contraseña = 'La contraseña es obligatoria';
            }
            return errors;
          }}
          onSubmit={handleIniciar}
        >
          {({ errors, values, setFieldValue, isSubmitting }) => (
            <Form>
              <>
                <div className={`Login_content_body-input ${errors.correo ? 'Input_Error' : ''}`}>
                  <StyledTextField
                    name='titulo'
                    label="Correo electrónico"
                    variant="outlined"
                    size="small"
                    placeholder='Introduce tu correo electrónico'
                    value={values.correo}
                    onChange={(e) => setFieldValue('correo', e.target.value)}
                  />
                  <ErrorMessage name='correo' component={() => <p className='Error'>{errors.correo}</p>} />
                </div>
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
                <div className="Login_content_body-olvido">
                  <p onClick={() => props.mostrarRecordar()}>¿Olvidé mi contraseña?</p>
                </div>
              </>
              <BotonSubmit texto={'Iniciar'} isLoading={isLoading} isSubmitting={isSubmitting} onClick={() => handleIniciar} color="guardar" />
              <p className='Login_Respuesta'>{msg}</p>
            </Form>
          )}
        </Formik>
        <div className="Login_content_body-registro">
          <p>¿No tienes cuenta?</p>
          <button onClick={() => props.mostrarRegistro()}>
            Registrate
          </button>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Iniciar;
