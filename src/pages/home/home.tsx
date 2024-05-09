
import { Cursos } from "../../componentes/cursos"
import { Footer } from "../../componentes/footer"
import { Inmersiones } from "../../componentes/inmersiones"
import { Nav } from "../../componentes/nav"
import { PreguntasFrecuentes } from "../../componentes/preguntasFrecuentes"
import { Testimonios } from "../../componentes/testimonios"
import { Welcome } from "../../componentes/welcome"
import imglogo from '../../assets/img/unac.png'

const home = () => {

    
    
    return (
        <div className="home">
            <div className="home_nav">
                <h1>SLIES</h1>
                <Nav />
            </div>
            <div className="home_main">
                <Welcome />
                <Inmersiones />
                <Cursos />
                <Testimonios />
                <PreguntasFrecuentes />
                <Footer />
                <img  className='LogoUnacHome'   src={imglogo} alt="" />

            </div>
        </div>
    )
}

export default home