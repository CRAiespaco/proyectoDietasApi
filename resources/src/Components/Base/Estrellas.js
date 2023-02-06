import React from "react";
import 'Components/Base/Estrellas.css';

function Estrellas({valoracion=3.5}={}){
    const maximoEstrellas = 5;
    let porcentaje = (valoracion/maximoEstrellas) *100;

    porcentaje = Math.round(porcentaje);

    const anchoEstrellas = ()=>{return { with:porcentaje+"%"}}
    
    return(
    <div className="stars-gray">
    <div className="stars-yellow" style={anchoEstrellas()}></div>
    </div>
    )
}

export default Estrellas;