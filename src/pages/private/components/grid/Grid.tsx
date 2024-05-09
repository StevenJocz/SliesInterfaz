import './Grid.css'
import modulosData, { Modulo } from '../../../../models/modulos';

const Grid = () => {
  return (
    <div className='Grid'>
      <div className="Grid_Imagen">
        <div>
          <h1>Modulos Ágiles</h1>
          <p>Esta sección agiliza el acceso al mostrar los diferentes modulos que componen la página, facilitando así una navegación más rápida y eficiente.</p>
        </div>
      </div>
      <div className="Grid_Column">
        {modulosData.map((modulo: Modulo) => (
          <div key={modulo.modulo}>
            <h3>{modulo.nombre}</h3>
            <ul>
              {modulo.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Grid