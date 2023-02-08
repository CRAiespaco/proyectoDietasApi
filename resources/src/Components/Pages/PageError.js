import React from "react";

function PageError(){
    const zorrita = async()=>{
        let url = fetch("http://localhost:90/api/error")
        .then(respuesta => respuesta.json)
        .then(respuesta => <p>{respuesta.mensaje}</p>)
    }

    return(
        <React.Fragment>
            <div>
                <h1>PTO chema</h1>
                <p>{zorrita}</p>
            </div>
        </React.Fragment>
    )
}

export default PageError;