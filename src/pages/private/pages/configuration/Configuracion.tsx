import { Breadcrumbs, Grid, Typography } from '@mui/material'
import './Configuracion.css'
import { Link, Route } from 'react-router-dom'
import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { imageOutline, personOutline, schoolOutline, layersOutline, manOutline, helpOutline, starOutline} from 'ionicons/icons';
import { RoutesWithNotFound } from '../../../../utilities';
import { Categorias, Dependencia, Preguntas, TipoAsistentes, TipoCursos, Videos } from '.';
import TipoDocumentos from './tipoDocumentos/TipoDocumentos';



const Configuracion = () => {
  const [menuConfiguracion, setMenuConfiguracion] = useState(1);
  return (
    <div className='Configuracion'>
      <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
        <Link to="/Dashboard" color="inherit">
          SLIES
        </Link>
        <Typography color="text.primary">Configuración</Typography>
      </Breadcrumbs>
      <h2>Configuración</h2>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <div className='Configuracion_content'>
            <ul>

              <Link to='/Dashboard/Configuracion'>
                <li
                  className={`${menuConfiguracion == 1 ? 'LiActive' : ''}`}
                  onClick={() => setMenuConfiguracion(1)}
                >
                  <IonIcon className='icono' icon={imageOutline} />
                  Videos
                </li>
              </Link>
              <Link to='/Dashboard/Configuracion/TipoDocumentos'>
                <li
                  className={`${menuConfiguracion == 2 ? 'LiActive' : ''}`}
                  onClick={() => setMenuConfiguracion(2)}
                >
                  <IonIcon className='icono' icon={personOutline} />
                  Tipo de documentos
                </li>
              </Link>
              <Link to='/Dashboard/Configuracion/Categorias'>
                <li
                  className={`${menuConfiguracion == 3 ? 'LiActive' : ''}`}
                  onClick={() => setMenuConfiguracion(3)}
                >
                  <IonIcon className='icono' icon={layersOutline} />
                  Categorías
                </li>
              </Link>
              <Link to='/Dashboard/Configuracion/TipoCursos'>
                <li
                  className={`${menuConfiguracion == 4 ? 'LiActive' : ''}`}
                  onClick={() => setMenuConfiguracion(4)}
                >
                  <IonIcon className='icono' icon={schoolOutline} />
                  Modalidad
                </li>
              </Link>
              <Link to='/Dashboard/Configuracion/TipoAsistentes'>
                <li
                  className={`${menuConfiguracion == 5 ? 'LiActive' : ''}`}
                  onClick={() => setMenuConfiguracion(5)}
                >
                  <IonIcon className='icono' icon={manOutline} />
                  Tipo de asistentes
                </li>
              </Link>
              <Link to='/Dashboard/Configuracion/Dependencias'>
                <li
                  className={`${menuConfiguracion == 7 ? 'LiActive' : ''}`}
                  onClick={() => setMenuConfiguracion(7)}
                >
                  <IonIcon className='icono' icon={starOutline} />
                  Dependecias
                </li>
              </Link>
              <Link to='/Dashboard/Configuracion/Preguntas'>
                <li
                  className={`${menuConfiguracion == 6 ? 'LiActive' : ''}`}
                  onClick={() => setMenuConfiguracion(6)}
                >
                  <IonIcon className='icono' icon={helpOutline} />
                  Preguntas
                </li>
              </Link>
            </ul>
          </div>
        </Grid>
        <Grid item xs={9}>
          <div className='Configuracion_content'>
            <RoutesWithNotFound>
              <Route path="/" element={<Videos/>} />
              <Route path="/TipoDocumentos" element={<TipoDocumentos/>} />
              <Route path="/Categorias" element={<Categorias/>} />
              <Route path="/TipoCursos" element={<TipoCursos/>} />
              <Route path="/TipoAsistentes" element={<TipoAsistentes/>} />
              <Route path="/Dependencias" element={<Dependencia />} />
              <Route path="/Preguntas" element={<Preguntas />} />
            </RoutesWithNotFound>
          </div>
        </Grid>
      </Grid>


    </div>
  )
}

export default Configuracion