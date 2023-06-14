import DetallesReceta from "Components/Layout/DetallesReceta";
import Footer from "Components/Layout/Footer";
import Header from "Components/Layout/Header";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

function PageDetallesReceta(){
    
    return(
        <Fragment>
            <Header/>
            <DetallesReceta/>
            <Footer/>
        </Fragment>
    )
}

export default PageDetallesReceta;
