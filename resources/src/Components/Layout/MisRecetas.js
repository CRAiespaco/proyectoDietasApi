import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from 'constant/constantes'
import { useAlert } from 'hooks/useAlert';
import Snackbar from '@mui/material/Snackbar';
import Alerta from "Components/Base/Alerta";
import { useEffect, useState } from 'react';
import 'Components/Layout/recetasCustom.css'
import Tarjeta from 'Components/Base/Tarjeta';
import { generarUUID } from 'Functions/Funciones';
import { recetasUser } from 'hooks/recetasUser';

function MisRecetas() {

    const { alert, handleErrorClose, mensajeError } = useAlert();
    const navigate = useNavigate();
    const [misRecetas, setMisRecetas] = useState([]);

    const cargarMisRecetas = async () => {

        const { recetas } = await recetasUser();
        if (recetas) {
            setMisRecetas(recetas);
        } else {
            mensajeError('El usuario no esta autenticado');
            navigate('/login');
        }
    }

    useEffect(() => {
        cargarMisRecetas();
    }, [])

    return (
        <>
            <div className="recetasListadas w-100" style={{ backgroundColor: "#b3b3b3", marginTop: 80, padding: 50 }}>
                {misRecetas.length !== 0 ?
                    misRecetas.map(tarjeta => <Tarjeta key={generarUUID()} datos={tarjeta} />) :
                    <div>Este usuario no tiene recetas</div>}
            </div>
            <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
                <Alerta onClose={handleErrorClose} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.message}
                </Alerta>
            </Snackbar>
        </>
    )
} export default MisRecetas;