import { Breadcrumbs, Typography } from '@mui/material'
import './Usuarios.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Table } from '../../components/table';
import AddUsuario from './AddUsuario';
import { api } from '../../../../services';

const Usuarios = () => {
    const [idUsuario, setIdUsuario] = useState(0);
    const [modalRegistroUsuario, setModalRegistroUsuario] = useState(false);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const VerRegistroUsuario = (id: number) => {
        setIdUsuario(id);
        setModalRegistroUsuario(!modalRegistroUsuario);
    };

    useEffect(() => {
        if (loading) {
            hadleGet();
        }

    }, [loading]);

    const hadleGet = () => {
        // Solicitud GET
        api.get<any>('User/GetListUser').then((response) => {
            const cursosFiltrados = response.data.map((user: any) => ({
                id: user.id,
                foto: user.foto,
                nombre: user.nombre,
                documento: user.documento,
                correo: user.correo,
                contacto: user.contacto,
                rol: user.rol
            }));
            setData(cursosFiltrados);
            setLoading(false);
        });
    };


    return (
        <div className='Usuarios'>
            <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    SLIES
                </Link>
                {modalRegistroUsuario == true && (
                    <Link to="/Dashboard/Usuarios" onClick={() => setModalRegistroUsuario(false)} color="inherit">
                        Usuario
                    </Link>
                )}
                <Typography color="text.primary">{modalRegistroUsuario == true ? ('Datos usuarios') : ('Usuarios')}</Typography>
            </Breadcrumbs>
            {modalRegistroUsuario == true ? (
                <AddUsuario VerRegistroUsuario={() => setModalRegistroUsuario(false)} idUsuario={idUsuario} actualizarDatos={hadleGet}/>

            ) : (
                <>
                    <h2>Usuarios</h2>
                    <div className="Layout_contenedor">
                        {data && (
                            <Table
                                data={data} mostrarRegistro={VerRegistroUsuario}
                                verBotonVer={true}
                                verBotonBuscador={true}
                                verBotonExportar={true}

                            />
                        )}
                    </div>
                </>
            )}


        </div>
    )
}

export default Usuarios