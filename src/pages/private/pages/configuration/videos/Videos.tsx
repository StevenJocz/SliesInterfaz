
import { Table } from '../../../components/table'
import '../Configuracion.css'
const Videos = () => {

  const data = [
    {
      "id": 1,
      "nombre": "Video 1 - Principal"
    },
    {
      "id": 2,
      "nombre": "Video 2 - Principal"
    },
    {
      "id": 3,
      "nombre": "Video 3 - Principal"
    },
    {
      "id": 4,
      "nombre": "Video 4 - Principal"
    },
    {
      "id": 5,
      "nombre": "Video 1 - Secundario"
    }
  ]
  
  return (
    <div className="Videos">
      <h4>Videos</h4>
      <Table
        data={data} 
        verBotonVer={true}
        verBotonBuscador={true}
        verBotonRegistro={true}
      />
    </div>
  )
}

export default Videos