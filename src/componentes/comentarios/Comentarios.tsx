import { IonIcon } from '@ionic/react'
import { paperPlaneOutline, closeOutline, heartOutline, chatbubbleOutline } from "ionicons/icons";
import './Comentarios.css'
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

const Comentarios = () => {
    const [addComentario, setAddComentario] = useState(true);


    const haddleAddComentario = () => {
        setAddComentario(!addComentario);
    };

    return (
        <div className='Comentarios'>
            {addComentario ? (
                <div className='Comentarios_label' onClick={haddleAddComentario}>
                    <label>Escribe tu comentario o pregunta</label>
                    <IonIcon className="icono" icon={paperPlaneOutline} />
                </div>
            ) : (
                <div className='Comentarios_envio'>
                    <IonIcon className="icono" icon={closeOutline} onClick={haddleAddComentario} />
                    <Editor
                        // value={values.descripcion}
                        // onEditorChange={(content) => setFieldValue('descripcion', content)}
                        apiKey='tuezbpkp2ehsxvmrxtl2szjjtayo5yx9fm90xwbjrpbvopkv'
                        init={{
                            height: 200,
                            content_style: "font-size: 16px; font-family: 'Roboto', sans-serif;",
                            menubar: false,
                            plugins: [
                                'lists'
                            ],
                            toolbar: 'formatselect  bold italic underline alignleft aligncenter alignright bullist'
                            , skin: 'oxide-dark',
                            content_css: 'dark',
                            file_picker_types: 'file image media'
                        }}
                    />
                </div>
            )}
            <div className='Comentarios_content'>
                <div className='Comentarios_content--left'>
                    <img src="https://static.platzi.com/media/avatars/avatars/Namreg_0560d519-4f6f-4e05-8ce1-3ce9648da2f6.jpeg" alt="" />
                    <div>
                        <IonIcon className="icono" icon={heartOutline} />
                        <p>90</p>
                    </div>
                    <div className='Comentarios_content--linea'></div>
                </div>
                <div className='Comentarios_content--right'>
                    <div className='Comentarios_content--right--comentario'>
                        <div className='Comentarios_content--right--encabezado'>
                            <h3>Hamilton Steven Espinal Areiza</h3>
                            <h4>Estudiante - 10 de April del 2024</h4>
                        </div>
                        <div className='Comentarios_content--right--content'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti voluptas commodi quis quibusdam illo. Esse tenetur cum voluptas deleniti omnis, velit unde dolore sed porro, consequuntur autem, distinctio in eveniet!</p>
                        </div>
                    </div>
                    <div className='Comentarios_content--right--Responder-comentario'>
                        <p><IonIcon className="icono" icon={chatbubbleOutline} />Responder</p>
                    </div>
                    <div className='Comentarios_content--right--respuesta'>
                        <div className='Comentarios_content--right--respuesta-encabezado'>
                            <img src="https://static.platzi.com/media/avatars/avatars/Namreg_0560d519-4f6f-4e05-8ce1-3ce9648da2f6.jpeg" alt="" />
                            <div>
                                <IonIcon className="icono" icon={heartOutline} />
                                <p>90</p>
                            </div>
                            <div className='Comentarios_content--respuesta-linea'></div>
                        </div>
                        <div className='Comentarios_content--right--respuesta-content'>
                            <div className='Comentarios_content--right--encabezado'>
                                <h3>Hamilton Steven Espinal Areiza</h3>
                                <h4>Estudiante - 10 de April del 2024</h4>
                            </div>
                            <div className='Comentarios_content--right--content'>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>


        </div>
    )
}

export default Comentarios