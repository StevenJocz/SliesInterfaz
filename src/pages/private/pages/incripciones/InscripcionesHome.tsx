import { Button, Grid } from '@mui/material'
import './Inscripciones.css'
import { Card } from '../../components/card'
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { readerOutline } from 'ionicons/icons';

interface Props {
    VerTipoVista: () => void;
}

const InscripcionesHome: React.FC<Props> = (props) => {
    const [tipoData, setTipoData] = useState<number[]>([4, 13, 12, 9, 8, 3, 3, 7, 6, 1, 1, 5]);

    const haddleTipoData = (number: number) => {
        if (number === 1) {
            setTipoData([4, 13, 12, 9, 8, 3, 3, 7, 6, 1, 1, 5]);
        } else if (number === 2) {
            setTipoData([3, 5, 2, 10, 9, 2, 5, 3, 10, 3, 8, 13]);
        } else if (number === 3) {
            setTipoData([4, 13, 12, 9, 8, 3, 7, 6, 1, 5, 7, 12]);
        } else if (number === 4) {
            setTipoData([6, 9, 2, 15, 8, 3, 7, 4, 1, 11, 5, 14]);
        }
    };
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const dataChart = [
        { label: 'UX/UI Diseño y desarrollo de productos digitales centrados en el usuario', value: 40 },
        { label: 'Curso de Diseño Gráfico', value: 32 },
        { label: 'Marketing Digital', value: 25 },
        { label: 'Curso de Fotografía"', value: 25 },
        { label: 'Curso de Cocina', value: 25 },
    ];

    const data = [
        {
            id: 1,
            foto: "https://mantisdashboard.io/assets/avatar-5-c8677f33.png",
            nombre: "Alice Smith",
            curso: "UX/UI Diseño y desarrollo de productos digitales centrados en el usuario",
        },
        {
            id: 2,
            foto: "https://mantisdashboard.io/assets/avatar-6-2da99e64.png",
            nombre: "Bob Johnson",
            curso: " Curso de Diseño Gráfico",
        },
        {
            id: 3,
            foto: "https://mantisdashboard.io/assets/avatar-8-ab3071be.png",
            nombre: "Eva Garcia",
            curso: "Curso de Marketing Digital",
        },
        {
            id: 4,
            foto: "https://mantisdashboard.io/assets/avatar-6-2da99e64.png",
            nombre: "Charlie Brown",
            curso: "Curso de Fotografía",
        },
        {
            id: 5,
            foto: "https://mantisdashboard.io/assets/avatar-5-c8677f33.png",
            nombre: "Grace Lee",
            curso: "Curso de Cocina",
        }
    ]

    return (
        <div className='InscripcionesHome'>
            <div className="AddUsuario_Encabezado">
                <h3> Inscripciones </h3>
                <div>
                    <Button
                        onClick={props.VerTipoVista}
                        variant="outlined"
                        size="small"
                        startIcon={<IonIcon className='' icon={readerOutline} />}
                    >
                        Ver lista de inscripciones
                    </Button>
                </div>

            </div>
            <Grid container spacing={2}>
                <Grid item xs={3} >
                    <div className='InscripcionesHome-div' onClick={() => haddleTipoData(1)}>
                        <Card titulo='Total' porcentaje={9.5} tipo={4} numeroTotal={350000} numeroNuevos={12} clase={2} />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className='InscripcionesHome-div' onClick={() => haddleTipoData(2)}>
                        <Card titulo='Pagas' porcentaje={3} tipo={4} numeroTotal={250000} numeroNuevos={8} clase={2} />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className='InscripcionesHome-div' onClick={() => haddleTipoData(3)}>
                        <Card titulo='Pendientes' porcentaje={-67} tipo={4} numeroTotal={50000} numeroNuevos={2} clase={2} />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className='InscripcionesHome-div' onClick={() => haddleTipoData(4)}>
                        <Card titulo='Anuladas' porcentaje={9.5} tipo={4} numeroTotal={50000} numeroNuevos={2} clase={2} />
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className='Layout_contenedor InscripcionesHome-content'>
                        <LineChart
                            height={280}
                            series={[
                                { data: tipoData },
                            ]}
                            xAxis={[{ scaleType: 'point', data: months }]}
                        />
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className='Layout_contenedor InscripcionesHome-content'>
                        <div className='InscripcionesHome-reciente'>
                            <h4>Inscripciones recientes</h4>
                            <ul>
                                {data.map(({ id, foto, nombre, curso }) => (
                                    <li key={id} className="">
                                        <div className='divTableImagen'>
                                            <img className='imgTable' src={foto} alt="Foto de perfil" />
                                            <div>
                                                <h5>{nombre}</h5>
                                                <p>{curso}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <div className='Layout_contenedor InscripcionesHome-content'>
                        <div className='InscripcionesHome-reciente'>
                            <h4>Cursos con más inscripciones</h4>
                            <PieChart
                                series={[
                                    {
                                        startAngle: -90,
                                        data: dataChart,
                                    },
                                ]}
                                height={300}
                                slotProps={{
                                    legend: { hidden: true },
                                }}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default InscripcionesHome