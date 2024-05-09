import './PreguntasFrecuentes.css';
import { IonIcon } from '@ionic/react';
import { chevronForwardOutline, closeOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { FormularioContaco } from '../contacto';
import { FrequentlyQuestion } from '../../models';
import { api } from '../../services';

const PreguntasFrecuentes = () => {
    const [preguntas, setPreguntas] = useState<FrequentlyQuestion[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            handleGet();
        }
    }, [loading]);

    const handleGet = async () => {
        try {
            const response = await api.get<FrequentlyQuestion[]>('Configuration/GetFrequentlyQuestions', { accion: 2 });

            if (response.data.length > 0) {
                setPreguntas(response.data.map(pregunta => ({
                    ...pregunta,
                    expandida: false,
                })));
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleTogglePregunta = (index: number) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[index].expandida = !nuevasPreguntas[index].expandida;
        setPreguntas(nuevasPreguntas);
    };

    return (
        <div className='PreguntasFrecuentes'>
            <h2>¿Tiene preguntas?</h2>
            <div className="PreguntasFrecuentes_contenedor">
                {preguntas.map((pregunta, index) => (
                    <div key={index} className='PreguntasFrecuentes_contenedor-Caja' onClick={() => handleTogglePregunta(index)}>
                        <div>
                            <IonIcon className={`icono ${pregunta.expandida ? "icono-cerrar" : ""}`} icon={pregunta.expandida ? closeOutline : chevronForwardOutline} />
                        </div>
                        <div>
                            <h3>{pregunta.pregunta}</h3>
                            {pregunta.expandida && <p>{pregunta.respuesta}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <FormularioContaco />
        </div>
    );
}

export default PreguntasFrecuentes;
