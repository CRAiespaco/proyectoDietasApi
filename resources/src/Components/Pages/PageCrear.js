import Footer from "Components/Layout/Footer";
import Header from "Components/Layout/Header";
import React from "react";
import CrearReceta from "Components/Forms/CrearReceta";

function PageCrear(){
    return(
        <React.Fragment>
            <Header/>
            <CrearReceta/>
            <Footer/>
        </React.Fragment>
    );
}

export default PageCrear;