import './welcome.css'
import P1 from '../../assets/img/gifPersona1.gif'
import P2 from '../../assets/img/gifPersona2.gif'
import P3 from '../../assets/img/gifPersona3.gif'
import P4 from '../../assets/img/gifPersona4.gif'

const welcome = () => {
    return (
        <div className='welcome'>
            <div className="welcome_circulo"></div>
            <div className='welcome_header'>
                <h2>Bienvenidos a las  <span>profundidades</span> de la educación continua</h2>
                <p>Donde los mejores nunca dejan de aprender</p>
            </div>
            <div className='welcome_card'>
                <div className='card card-Uno'>
                    <img src={P1} alt="" />
                </div>
                <div className='card card-Dos'>
                    <img src={P2} alt="" />
                </div>
                <div className='card card-Tres'>
                    <img src={P3} alt="" />
                </div>
                <div className='card card-Cuatro'>
                    <img src={P4} alt="" />
                </div>
            </div>
        </div>
    )
}

export default welcome