import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function PageError(){
    const error = async()=>{
        let url = fetch("http://localhost/api/error")
        .then(respuesta => respuesta.json)
        .then(mensaje => console.log(mensaje));
    }
    

    return(
        <React.Fragment>
            <div style={{ "backgroundColor": "#b3b3b3","textAlign":"center","padding-top":"16%","padding-bottom":"20%"}} className="h-100">
                <div style={{"font-size":"75px",}}>ERROR 404</div>
                <div style={{"font-size":"85px",}}>Página no encontrada</div>
                <Link className="btn-sm btn btn-success p-2 fs-5" to="/">Volver a Mi Dieta</Link>
            </div>
        </React.Fragment>
    )
}

export default PageError;