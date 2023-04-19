import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

function PageError(){
    const zorrita = async()=>{
        let url = fetch("http://localhost/api/error")
        .then(respuesta => respuesta.json)
        .then(a => console.log(a));
    }
    useEffect(()=>{
        zorrita();
    },[])

    return(
        <React.Fragment>
            <div onLoad={zorrita}>
                HOLAAAAAAAAA
            </div>
        </React.Fragment>
    )
}

export default PageError;