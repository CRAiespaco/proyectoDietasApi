import Footer from "Components/Layout/Footer";
import Header from "Components/Layout/Header";
import Recetas from "Components/Layout/Recetas";
import React from "react";

function PageRecetas(){
    return(
        <React.Fragment>
            <Header/>
            <Recetas/>
            <Footer/>
        </React.Fragment>
    )
}

export default PageRecetas;