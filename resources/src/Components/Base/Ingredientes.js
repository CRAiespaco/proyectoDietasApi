import React, { useEffect } from "react";
import { upperFirstLetter } from "Functions/Funciones";

function Ingredientes({ingredientes}){

    useEffect(()=>{

    },[ingredientes]);

return(
    <React.Fragment>
    {
    ingredientes === undefined ? <div></div> :
    ingredientes.map((ingrediente,i) => <li key={i}>{upperFirstLetter(ingrediente.nombre)} <span>{ingrediente.pivot.cantidad}g</span></li>)
    }
    </React.Fragment>
    )
}export default Ingredientes;