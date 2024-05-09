import { useEffect, useState } from 'react';
import { Table } from '../../../components/table'
import '../Configuracion.css'
import { api } from '../../../../../services';
import { AddTipoDocumento } from '.';

const TipoDocumentos = () => {
  const [registrar, setRegistrar] = useState(false);
  const [data, setData] = useState<any>(null);
  const [idTipoDocumento, setIdTipoDocumento] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (loading) {
      hadleGet();
    }

  }, [loading]);

  const hadleGet = () => {
    // Solicitud GET
    api.get<any>('Configuration/GetTypeDocument', { accion: 1 }).then((response) => {
      setData(response.data);
      setLoading(false); 
    });
  };

  const hadleRegistro = (id: number) => {
    setIdTipoDocumento(id);
    setRegistrar(!registrar);
  };


  return (
    <div className='TipoDocumentos'>
      <h4>Tipo de Documentos</h4>
      {data && (
        <Table
          data={data}
          mostrarRegistro={hadleRegistro}
          verBotonEditar={true}
          verBotonBuscador={true}
          verBotonRegistro={true}
        />
      )}

      {registrar && (
        <AddTipoDocumento
          mostrarRegistro={() => setRegistrar(false)}
          idTipoDocumento={idTipoDocumento}
          actualizarDatos={hadleGet}
        />
      )}
    </div>
  )
}

export default TipoDocumentos
