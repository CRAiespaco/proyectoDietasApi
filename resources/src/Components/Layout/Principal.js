import React from 'react';
import 'Components/Layout/principal.css';
import { Link } from 'react-router-dom';

function Principal(){
    return(
        <div id='fondo'>
            <h1>¡Haz tu planificación de recetas personalizadas!</h1>
            <p>Bienvenidos a nuestra página de recetas personalizadas. Aquí, nos enfocamos en brindarte opciones únicas y adaptadas a tus gustos y preferencias. Creemos que la comida es un arte y debería ser personalizada para cada individuo.</p>
            <Link to={'/crear'}>Empezar</Link>
        </div>
    )
}

export default Principal;