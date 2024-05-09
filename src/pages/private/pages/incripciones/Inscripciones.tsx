import { Breadcrumbs, Button, Typography } from '@mui/material'
import './Inscripciones.css'
import { Link } from 'react-router-dom'
import { Table } from '../../components/table'
import { useState } from 'react'
import { InscripcionesHome, InscripcionesView } from '.'
import { IonIcon } from '@ionic/react'
import { arrowBackOutline} from 'ionicons/icons';

const Inscripciones = () => {

  // const [idInscripcion, setInscripcion] = useState(0);
  const [tipoVista, setTipoVista] = useState(1);

  const VerTipoVista = (id: number) => {
    setTipoVista(id);
  };

  const data = [
    {
      id: 1,
      código: '2322',
      Usuario: [{
        foto: "https://mantisdashboard.io/assets/avatar-5-c8677f33.png",
        nombre: "Alice Smith",
        correo: "alice@example.com",
      }],
      fecha_inscripción: "2024-02-26",
      nombre_curso: "Curso de Programación",
      estado: "Pagado",
      valor_pagar: "$100.000"
    },
    {
      id: 2,
      código: '2323',
      Usuario: [{
        foto: "https://mantisdashboard.io/assets/avatar-6-2da99e64.png",
        nombre: "Bob Johnson",
        correo: " bob@example.com",
      }],
      fecha_inscripción: "2024-02-25",
      nombre_curso: "Curso de Diseño Gráfico",
      estado: "Cancelado",
      valor_pagar: "$150.000"
    },
    {
      id: 3,
      código: '2324',
      Usuario: [
        {
          foto: "https://mantisdashboard.io/assets/avatar-8-ab3071be.png",
          nombre: "Eva Garcia",
          correo: "eva@example.com",
        }
      ],
      fecha_inscripción: "2024-02-24",
      nombre_curso: "Curso de Marketing Digital",
      estado: "Pagado",
      valor_pagar: "$100.000"
    },
    {
      id: 4,
      código: '2325',
      Usuario: [
        {
          foto: "https://mantisdashboard.io/assets/avatar-6-2da99e64.png",
          nombre: "Charlie Brown",
          correo: "charlie@example.com",
        }
      ],
      fecha_inscripción: "2024-02-23",
      nombre_curso: "Curso de Fotografía",
      estado: "Pendiente",
      valor_pagar: "$900.000"
    },
    {
      id: 5,
      código: '2326',
      Usuario: [
        {
          foto: "https://mantisdashboard.io/assets/avatar-5-c8677f33.png",
          nombre: "Grace Lee",
          correo: "grace@example.com",
        }
      ],
      fecha_inscripción: "2024-02-22",
      nombre_curso: "Curso de Cocina",
      estado: "Pendiente",
      valor_pagar: "$800.000"
    },
    {
      id: 6,
      código: '2327',
      Usuario: [
        {
          foto: "https://mantisdashboard.io/assets/avatar-10-2026f30d.png",
          nombre: "Daniel Johnson",
          correo: "daniel@example.com",
        }
      ],
      fecha_inscripción: "2024-02-21",
      nombre_curso: "Curso de Programación",
      estado: "Pagado",
      valor_pagar: "$1.100.000"
    }
  ]

  return (
    <div className='Inscripciones'>
      <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
        <Link to="/Dashboard" color="inherit">
          SLIES
        </Link>
        {tipoVista == 2 || tipoVista == 3 && (
          <Link to="/Dashboard/Inscripciones" onClick={() => setTipoVista(1)} color="inherit">
            Inscripciones
          </Link>
        )}
        <Typography color="text.primary">{tipoVista == 2 ? 'Registros de inscripción' : tipoVista == 3 ? 'Lista de inscriptos' : 'Inscripciones'}</Typography>
      </Breadcrumbs>

      {tipoVista === 1 ? (
        <>
          <InscripcionesHome VerTipoVista={() => VerTipoVista(3)} />

        </>

      ) : tipoVista === 2 ? (
        <InscripcionesView />
      ) : (
        <>
          <div className="AddUsuario_Encabezado">
            <h3> Lista de inscriptos</h3>
            <div>
              <Button
                onClick={() => VerTipoVista(1)}
                variant="outlined"
                size="small"
                startIcon={<IonIcon className='' icon={arrowBackOutline} />}
              >
                Volver a inscripciones
              </Button>
            </div>

          </div>
          <div className="Layout_contenedor">
            <Table
              data={data}
              mostrarRegistro={VerTipoVista}
              verBotonVer={true}
              verBotonBuscador={true}
              verBotonExportar={true}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default Inscripciones