import { useEffect, useState } from 'react';
import { Table } from '../../../components/table'
import '../Configuracion.css'
import { api } from '../../../../../services';
import AddPreguntas from './AddPreguntas';

const Preguntas = () => {
  const [registrarPregunta, setRegistrarPregunta] = useState(false);
  const [data, setData] = useState<any>(null);
  const [idPregunta, setIdPregunta] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      hadleGetPregunta();
    }

  }, [loading]);

  const hadleGetPregunta = () => {
    // Solicitud GET
    api.get<any>('Configuration/GetFrequentlyQuestions', { accion: 1 }).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  };

  const hadleRegistroPregunta = (id: number) => {
    setIdPregunta(id);
    setRegistrarPregunta(!registrarPregunta);
  };

  return (
    <div className='Preguntas'>
      <h4>Preguntas Frecuentes</h4>
      {data && (
        <Table
          data={data}
          mostrarRegistro={hadleRegistroPregunta}
          verBotonVer={true}
          verBotonBuscador={true}
          verBotonRegistro={true}
        />
      )}
      {registrarPregunta && (
        <AddPreguntas
          mostrarRegistro={() => setRegistrarPregunta(false)}
          idRespuesta={idPregunta}
          actualizarDatos={hadleGetPregunta}
        />
      )}
    </div>
  )
}

export default Preguntas