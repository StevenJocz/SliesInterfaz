import './Testimonios.css'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Testimonios = () => {
    return (
        <div className="Testimonios">
            <h2>Vea lo que dicen los estudiantes</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                autoplay={{
                    delay: 2800,
                    disableOnInteraction: false
                }}

                modules={[Autoplay, Keyboard, Pagination, Navigation]}
                className="mySwiper"
            >
                <div className="Testimonios_card">
                    <SwiperSlide>
                        <div className="Testimonios_card">
                            <div className="Testimonios_card-img">
                                <img src="https://th.bing.com/th/id/OIP.7-PVtrGRSm80FAdJHjSRPgHaF7?rs=1&pid=ImgDetMain" alt="" />
                                <h3>Criselda Tejada</h3>
                                <p>Docente pedagagia infantil</p>
                            </div>
                            <div className="Testimonios_card-text">
                                <p>El curso es una mezcla encantadora de autoaprendizaje y colaboración, ya que en ningún momento me he sentido varado para navegar por los mares del sistema de diseño yo mismo sin ninguna orientación...</p>
                                <h4>Estrategias pedagógicas innovadoras</h4>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="Testimonios_card">
                            <div className="Testimonios_card-img">
                                <img src="https://th.bing.com/th/id/OIP.9loJI6J3kXGDwKevV5p95wHaF6?pid=ImgDet&w=474&h=378&rs=1" alt="" />
                                <h3>Criselda Tejada</h3>
                                <p>Docente pedagagia infantil</p>
                            </div>
                            <div className="Testimonios_card-text">
                                <p>¡Este fue un gran curso! Molly fue muy receptiva y proporcionó excelentes ideas a lo largo del curso. Me gustan mucho sus demos y cómo desglosó los temas para facilitar la digestión.</p>
                                <h4>Estrategias pedagógicas innovadoras</h4>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="Testimonios_card">
                            <div className="Testimonios_card-img">
                                <img src="https://th.bing.com/th/id/OIP.FKK4M_0tZar8wk7FMWqUVQHaF7?pid=ImgDet&w=474&h=379&rs=1" alt="" />
                                <h3>Criselda Tejada</h3>
                                <p>Docente pedagagia infantil</p>
                            </div>
                            <div className="Testimonios_card-text">
                                <p>Estos son los mejores videos de lecciones que he encontrado hasta ahora en Figma, gracias por compartir y enseñar.</p>
                                <h4>Estrategias pedagógicas innovadoras</h4>
                            </div>
                        </div>
                    </SwiperSlide>
                </div>
            </Swiper>
            <div className="Testimonios_circulo">

            </div>
        </div>
    )
}

export default Testimonios