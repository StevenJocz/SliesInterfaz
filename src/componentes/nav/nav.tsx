import { Sesion } from '../sesion'
import './nav.css'


const nav = () => {
  return (
    <nav>
      <ul>
        <a href="/">
          <div className='nav_linea'></div>
          <div className='nav_space'></div>
          <li className="">Bienvenido</li>
        </a>
        <a href="#Cursos">
          <div className='nav_linea'></div>
          <div className='nav_space'></div>
          <li className="">Seminarios, cursos y eventos</li>
        </a>
        <a href="#Inmersiones">
          <div className='nav_linea'></div>
          <div className='nav_space'></div>
          <li className="">Inmersiones profundas</li>
        </a>
        <a href="#Contacto">
          <div className='nav_linea'></div>
          <div className='nav_space'></div>
          <li className="">Contacto</li>
        </a>
      </ul>

      <div className='nav_dos'>
        <Sesion />
      </div>
    </nav>
  )
}

export default nav