import { Button } from "@mui/material";
import { IonIcon } from '@ionic/react'
import { arrowBackOutline } from 'ionicons/icons';
import './Cursos.css';
import { Table } from "../../components/table";



interface Props {
    VerParticipantes: () => void;
    idCurso: number;
}


const Participantes: React.FC<Props> = (props) => {

    // const data = [
    //     {
    //         id: 1,
    //         Usuario: [{
    //             foto: "https://mantisdashboard.io/assets/avatar-5-c8677f33.png",
    //             nombre: "Alice Smith",
    //             correo: "alice@example.com",
    //         }],
    //         fechaInicio: "2024-03-15",
    //         estado: "En curso",
    //         asistencia: [
    //             {
    //                 clase: "Clase 1",
    //                 fecha: "2024-03-15",

    //             },
    //             {
    //                 clase: "Clase 2",
    //                 fecha: "2024-03-16",

    //             },
    //             {
    //                 clase: "Clase 3",
    //                 fecha: "",
    //             }

    //         ]
    //     },
    //     {
    //         id: 2,
    //         Usuario: [{
    //             foto: "https://mantisdashboard.io/assets/avatar-6-2da99e64.png",
    //             nombre: "Bob Johnson",
    //             correo: " bob@example.com",
    //         }],
    //         fechaInicio: "2024-03-15",
    //         estado: "En curso",
    //         asistencia: [
    //             {
    //                 clase: "Clase 1",
    //                 fecha: "2024-03-15",

    //             },
    //             {
    //                 clase: "Clase 2",
    //                 fecha: "2024-03-16",
    //             },
    //             {
    //                 clase: "Clase 3",
    //                 fecha: "",
    //             }

    //         ]
    //     },
    //     {
    //         id: 3,
    //         Usuario: [
    //             {
    //                 foto: "https://mantisdashboard.io/assets/avatar-8-ab3071be.png",
    //                 nombre: "Eva Garcia",
    //                 correo: "eva@example.com",
    //             }
    //         ],
    //         fechaInicio: "2024-03-15",
    //         estado: "Aprobado",
    //         asistencia: [
    //             {
    //                 clase: "Clase 1",
    //                 fecha: "2024-03-15",

    //             },
    //             {
    //                 clase: "Clase 2",
    //                 fecha: "2024-03-16",
    //             },
    //             {
    //                 clase: "Clase 3",
    //                 fecha: "",
    //             }

    //         ]
    //     },
    //     {
    //         id: 4,
    //         Usuario: [
    //             {
    //                 foto: "https://mantisdashboard.io/assets/avatar-6-2da99e64.png",
    //                 nombre: "Charlie Brown",
    //                 correo: "charlie@example.com",
    //             }
    //         ],
    //         fechaInicio: "2024-03-15",
    //         estado: "No aprobado",
    //         asistencia: [
    //             {
    //                 clase: "Clase 1",
    //                 fecha: "2024-03-15",

    //             },
    //             {
    //                 clase: "Clase 2",
    //                 fecha: "2024-03-16",
    //             },
    //             {
    //                 clase: "Clase 3",
    //                 fecha: "",
    //             }

    //         ]
    //     }
    // ]

    const data = [
        { id: 1, foto: 'https://mantisdashboard.io/assets/avatar-5-c8677f33.png', Nombre: 'Alice Smith', documento: 'ABC123', email: 'alice@example.com', contacto: '123-456-7890' },
        { id: 2, foto: 'https://mantisdashboard.io/assets/avatar-6-2da99e64.png', Nombre: 'Bob Johnson', documento: 'DEF456', email: 'bob@example.com', contacto: '987-654-3210' },
        { id: 3, foto: 'https://mantisdashboard.io/assets/avatar-10-2026f30d.png', Nombre: 'Charlie Brown', documento: 'GHI789', email: 'charlie@example.com', contacto: '456-789-0123' },
        { id: 4, foto: 'https://mantisdashboard.io/assets/avatar-6-2da99e64.png', Nombre: 'David Garcia', documento: 'JKL012', email: 'david@example.com', contacto: '111-222-3333' },
    ];

    return (
        <div className="Participantes AddCursos">
            <div className="AddCursos_Encabezado">
                <h3> Lista de participantes</h3>
                <div>
                    <Button
                        onClick={props.VerParticipantes}
                        variant="outlined"
                        size="small"
                        startIcon={<IonIcon className='' icon={arrowBackOutline} />}
                    >
                        Volver a cursos
                    </Button>
                </div>
            </div>
            <div className="Layout_contenedor">
                <h5>Curso</h5>
                <h3>UX/UI Diseño y desarrollo de productos digitales centrados en el usuario {props.idCurso}</h3>
                <div className="Participantes_asistencia">
                    <h4>Estudiantes</h4>
                    <p>Lista de estudaintes registrados en el curso.</p>

                </div>
                <Table
                    data={data}
                    verBotonVer={true}
                    verBotonBuscador={true}
                    verBotonExportar={true}
                    verAsistencias={true}
                    botonEstado={true}
                />
            </div>
        </div >
    )
}

export default Participantes