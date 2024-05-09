import { useEffect, useState } from 'react';
import { Table } from '../../../components/table'
import AddTipoAsistente from './AddTipoAsistente';
import '../Configuracion.css'
import { api } from '../../../../../services';

const TipoAsistentes = () => {
  const [registrarTipoAsistente, setRegistrarTipoAsistente] = useState(false);
  const [data, setData] = useState<any>(null);
  const [idTipoAsistente, setIdTipoAsistente] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      hadleGetTipoAsistente();
    }

  }, [loading]);

  const hadleGetTipoAsistente = () => {
    // Solicitud GET
    api.get<any>('Configuration/GetTypeAttendees', { accion: 1 }).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  };

  const hadleRegistroTipoAsistente = (id: number) => {
    setIdTipoAsistente(id);
    setRegistrarTipoAsistente(!registrarTipoAsistente);
  };


  return (
    <div className='TipoAsistentes'>
      <h4>Tipo de Asistentes</h4>
      {data && (
        <Table
          data={data}
          mostrarRegistro={hadleRegistroTipoAsistente}
          verBotonVer={true}
          verBotonBuscador={true}
          verBotonRegistro={true}
        />
      )}
      {registrarTipoAsistente && (
        <AddTipoAsistente
          mostrarRegistro={() => setRegistrarTipoAsistente(false)}
          idTipoAsistente={idTipoAsistente}
          actualizarDatos={hadleGetTipoAsistente}
        />
      )}
    </div>
  )
}

export default TipoAsistentes