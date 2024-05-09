import { useState } from 'react';
import './FormularioContaco.css'
import { Formik, Form, Field} from 'formik';

const FormularioContaco = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState('');


    const EnviarContacto = async () => {
        try {
            setIsLoading(true);
            isLoading
            setIsLoading(false);

        } catch (error) {
            setMsg('Estamos presentando inconvenientes. Por favor, vuelva a intentarlo más tarde.');
            setIsLoading(false);
        }
    };


    return (
        <div className='Contacto' id='Contacto'>
            <h2>¿Necesitas ayuda? ¡Contáctanos!</h2>
            <div className="Contacto_Formulario">
                <Formik
                    initialValues={{
                        correoElectronico: '',
                        nombre: '',
                        contenido: '',
                    }}
                    validate={(valor) => {
                        let errors: any = {};
                        if (!valor.correoElectronico) {
                            errors.correoElectronico = '* Introduce tu correo electrónico.';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valor.correoElectronico)) {
                            errors.correoElectronico = '* Introduce una dirección de correo electrónico válida.';
                        }

                        if (!valor.nombre) {
                            errors.nombre = '* Introduce tu nombre.';
                        }

                        if (!valor.contenido) {
                            errors.contenido = '* Introduce el contenido del correo.';
                        }
                        setMsg('');
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        // Lógica para enviar los datos del formulario (usando la función EnviarContacto)
                        EnviarContacto();
                        values
                        setSubmitting(false);
                    }}
                >
                    {({ errors, isSubmitting }) => (
                        <Form>
                            <div className="">
                                <Field
                                    type='text'
                                    name='nombre'
                                    placeholder='Nombre'
                                    className={errors.nombre ? 'Input_Border_Red' : ''}
                                />
                            </div>
                            <div className="">
                                <Field
                                    type='email'
                                    name='correoElectronico'
                                    placeholder='tu@correo.com'
                                    className={errors.correoElectronico ? 'Input_Border_Red' : ''}
                                />
                            </div>
                            <div className="">
                                <textarea
                                    name='contenido'
                                    placeholder='Cuéntanos qué eventos, cursos o semilleros te interesan. ¡Estamos aquí para ayudarte a encontrar la mejor opción para ti!'
                                    onChange={(e) => (e.target.value)}
                                />
                            </div>
                            <i className='mensaje'>{msg}</i>
                            
                            <button type="submit" disabled={isSubmitting}>
                                Enviar
                            </button>

                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default FormularioContaco