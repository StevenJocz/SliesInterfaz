import { useState } from 'react';
import './Layout.css'
import { Nav } from '../../components/nav';
import { Header } from '../../components/header';
import { Rutas } from '../../components/Rutas';
import { Footer } from '../../../../componentes/footer';


const Layout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`Dashboard ${isOpen ? 'open' : ''}`} >
            <div className="Dashboard-menu">
                <Nav isOpen={isOpen} />
            </div>
            <div className="Dashboard-header">
                <div className={`nav-hamburger ${isOpen ? 'open' : ''}`} onClick={handleClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <Header />
            </div>
            <div className="Dashboard-main" id='main'>
                <Rutas />
                <Footer />
            </div>
            
        </div>
    )
}

export default Layout