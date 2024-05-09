import './Inmersiones.css'
import W8R166 from '../../assets/img/W8R166.png'

const Inmersiones = () => {
    return (
        <div className='Inmersiones' id='Inmersiones'>
            <div className="Inmersiones_header">
                <h2> <span>Inmersiones profundas</span> con los mejores profesores</h2>
                <p>Una nueva serie de videos llenos de historias y consejos para ayudarte a dar un gran salto en tu carrera</p>
            </div>
            <div className="Inmersiones_buton">
                <div className='Inmersiones_buton-text'>
                    <img src={W8R166} alt="" />
                    <p>Consigue los mejores videos (es gratis)</p>
                </div>
                <div className='Inmersiones_buton-input'>
                    <input type="text" placeholder='tu@correo.com' />
                    <button>Subcribete</button>
                </div>

                <div className='Inmersiones_buton-unete'>
                    <div className='Inmersiones_buton-lineas'></div>
                    <p>Únete, ya somos 6K+</p>
                    <div className='Inmersiones_buton-unete-img'>
                        <img src="https://th.bing.com/th/id/OIP.7-PVtrGRSm80FAdJHjSRPgHaF7?rs=1&pid=ImgDetMain" alt="" />
                        <img src="https://th.bing.com/th/id/OIP.9loJI6J3kXGDwKevV5p95wHaF6?pid=ImgDet&w=474&h=378&rs=1" alt="" />
                        <img src="https://th.bing.com/th/id/OIP.FKK4M_0tZar8wk7FMWqUVQHaF7?pid=ImgDet&w=474&h=379&rs=1" alt="" />
                        <img src="https://th.bing.com/th/id/OIP.GxpMy5gAZYIw3Xof4_KF7AHaHa?pid=ImgDet&w=202&h=202&c=7&dpr=1,3" alt="" />
                    </div>
                </div>
            </div>
            <div className="Inmersiones_imganes">
                <img src="https://framerusercontent.com/images/dboBdbaIootPlLwj9536csSYrEs.webp" alt="" />
                <img src="https://framerusercontent.com/images/VBgudHKDBLtkNMF3sf4kOPlOA.webp" alt="" />
                <img src="https://framerusercontent.com/images/Zo3zH1ul5BkepLKRWM2Vg2HBU.webp" alt="" />
                <img src="https://framerusercontent.com/images/dboBdbaIootPlLwj9536csSYrEs.webp" alt="" />
                <img src="https://framerusercontent.com/images/VBgudHKDBLtkNMF3sf4kOPlOA.webp" alt="" />
                <img src="https://framerusercontent.com/images/Zo3zH1ul5BkepLKRWM2Vg2HBU.webp" alt="" />
                <img src="https://framerusercontent.com/images/dboBdbaIootPlLwj9536csSYrEs.webp" alt="" />
                <img src="https://framerusercontent.com/images/VBgudHKDBLtkNMF3sf4kOPlOA.webp" alt="" />
                <img src="https://framerusercontent.com/images/Zo3zH1ul5BkepLKRWM2Vg2HBU.webp" alt="" />
                
                <div></div>
            </div>
        </div>
    )
}

export default Inmersiones