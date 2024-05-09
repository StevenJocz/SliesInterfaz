import { useEffect, useState } from "react";
import { api } from "../../../../../services";
import { Table } from '../../../components/table'
import AddDependencia from "./AddDependencia";
import '../Configuracion.css'

const Dependencia = () => {
    const [registrarDependencia, setRegistrarDependencia] = useState(false);
    const [data, setData] = useState<any>(null);
    const [idDependencia, setIdDependencia] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            hadleGetDependencia();
        }

    }, [loading]);

    const hadleGetDependencia = () => {
        // Solicitud GET
        api.get<any>('Configuration/GetDependence', { accion: 1 }).then((response) => {
            setData(response.data);
            setLoading(false);
        });
    };

    const hadleRegistroDependencia = (id: number) => {
        setIdDependencia(id);
        setRegistrarDependencia(!registrarDependencia);
    };

    return (
        <div className='TipoCursos'>
            <h4>Modalidad</h4>
            {data && (
                <Table
                    data={data}
                    mostrarRegistro={hadleRegistroDependencia}
                    verBotonVer={true}
                    verBotonBuscador={true}
                    verBotonRegistro={true}
                />
            )}
            {registrarDependencia && (
                <AddDependencia
                    mostrarRegistro={() => setRegistrarDependencia(false)}
                    idDependencia={idDependencia}
                    actualizarDatos={hadleGetDependencia}
                />
            )}
        </div>

    )
}


export default Dependencia