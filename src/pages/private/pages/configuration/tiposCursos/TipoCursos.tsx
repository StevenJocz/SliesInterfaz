import { useEffect, useState } from 'react';
import { Table } from '../../../components/table'
import '../Configuracion.css'
import { api } from '../../../../../services';
import { AddTipoCursos } from './AddTipoCursos';

const TipoCursos = () => {
  const [registrarTipoCurso, setRegistrarTipoCurso] = useState(false);
  const [data, setData] = useState<any>(null);
  const [idTipoCurso, setIdTipoCurso] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      hadleGetTipoCurso();
    }

  }, [loading]);

  const hadleGetTipoCurso = () => {
    // Solicitud GET
    api.get<any>('Configuration/GetCoursesType', { accion: 1 }).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  };

  const hadleRegistroTipoCurso = (id: number) => {
    setIdTipoCurso(id);
    setRegistrarTipoCurso(!registrarTipoCurso);
  };

  return (
    <div className='TipoCursos'>
      <h4>Modalidad</h4>
      {data && (
        <Table
          data={data}
          mostrarRegistro={hadleRegistroTipoCurso}
          verBotonVer={true}
          verBotonBuscador={true}
          verBotonRegistro={true}
        />
      )}
      {registrarTipoCurso && (
        <AddTipoCursos
          mostrarRegistro={() => setRegistrarTipoCurso(false)}
          idTipoCurso={idTipoCurso}
          actualizarDatos={hadleGetTipoCurso}
        />
      )}
    </div>

  )
}

export default TipoCursos