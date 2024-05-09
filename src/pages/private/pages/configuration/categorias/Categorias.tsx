import { useEffect, useState } from 'react';
import { Table } from '../../../components/table'
import '../Configuracion.css'
import { api } from '../../../../../services';
import { AddCategorias } from '.';

const Categorias = () => {

  const [registrarCategorias, setRegistrarCategorias] = useState(false);
  const [data, setData] = useState<any>(null);
  const [idCategorias, setIdCategorias] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      hadleGetCategorias();
    }

  }, [loading]);

  const hadleGetCategorias = () => {
    // Solicitud GET
    api.get<any>('Configuration/GetCoursesCategories', { accion: 1 }).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  };

  const hadleRegistroCategorias = (id: number) => {
    setIdCategorias(id);
    setRegistrarCategorias(!registrarCategorias);
  };


  return (
    <div className='Categorias'>
      <h4>Categorías</h4>
      {data && (
        <Table
          data={data}
          mostrarRegistro={hadleRegistroCategorias}
          verBotonVer={true}
          verBotonBuscador={true}
          verBotonRegistro={true}
        />
      )}
      {registrarCategorias && (
        <AddCategorias
          mostrarRegistro={() => setRegistrarCategorias(false)}
          idCategoria={idCategorias}
          actualizarDatos={hadleGetCategorias}
        />
      )}
    </div>
  )
}

export default Categorias