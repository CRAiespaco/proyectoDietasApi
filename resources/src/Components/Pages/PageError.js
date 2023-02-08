import React, { useEffect } from "react";

function PageError(){
    const zorrita = async()=>{
        let url = fetch("http://localhost:90/api/error")
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