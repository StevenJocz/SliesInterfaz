import { Breadcrumbs, Typography } from '@mui/material'
import './Informes.css'
import { Link } from 'react-router-dom'

const Informes = () => {
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" className="LinkBread">
                <Link to="/Dashboard" color="inherit">
                    SLIES
                </Link>
                <Typography color="text.primary">Informes</Typography>
            </Breadcrumbs>
        </div>
    )
}

export default Informes