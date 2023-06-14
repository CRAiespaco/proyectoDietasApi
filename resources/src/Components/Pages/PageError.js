import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

function PageError() {
    return (
        <React.Fragment>
            <div style={{ "backgroundColor": "#b3b3b3" }} className="vh-100 d-flex justify-content-center flex-column align-content-center text-center">
                <div style={{ "font-size": "75px", }}>ERROR 404</div>
                <div style={{ "font-size": "85px", }}>Página no encontrada</div>
                <div><Link className="btn-sm btn btn-success p-2 fs-5 w-25" to="/">Volver a Mi Dieta</Link></div>
            </div>
        </React.Fragment>
    )
}

export default PageError;