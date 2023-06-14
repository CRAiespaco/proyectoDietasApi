import Footer from "Components/Layout/Footer";
import Header from "Components/Layout/Header";
import Principal from "Components/Layout/Principal";
import Carrusel from "Components/Listados/ListadoRecetas";
import Placeholder from 'react-bootstrap/Placeholder';
import React from "react";
import Paginacion from "Components/Base/Paginacion";
import { Card } from "react-bootstrap";
import Tarjeta from "Components/Base/Tarjeta";
import { Link } from "react-router-dom";
import EstrellasPrueba from "Components/Base/EstrellasPrueba";
function PageHome(){


    let prueba = []
    for(let i=0; i<900;i++){
        prueba.push(<Tarjeta/>);
    }

    return(
        <React.Fragment>
            <Header/>
           { <Principal/>}
            {/* <Paginacion itemsPerPage={50} totalItems={prueba}/> */}
            <div style={{ "backgroundColor": "#b3b3b3"}}> 
                <Carrusel titulo={"Recetas más valoradas"} numTarjetas={3}/>
                <div className="row gx-4 gx-lg-5 align-items-center my-5 justify-content-center">
                    <div className="w-auto"><img className="img-fluid rounded mb-4 mb-lg-0" src={require('images/fondo.jpg')} width="840" alt="..." /></div>
                    <div className="col-lg-5 d-flex flex-column justify-content-center align-items-center text-center">
                        <h1 className="font-weight-light">¿Cuál es nuestro propósito?</h1>
                        <p className="fs-5">Nuestra misión es ayudarte a descubrir nuevos sabores y experimentar con diferentes ingredientes, ofreciéndote recetas especialmente diseñadas para ti. ¿Eres vegetariano o tienes alergias alimentarias? ¡No hay problema! Nuestro sistema de personalización considera tus restricciones y preferencias para ofrecerte recetas únicas y deliciosas.</p>
                        <Link className="btn-sm btn btn-success p-2 fs-5" to="/crear">¡Empezar ahora!</Link>
                    </div>
                </div>  
                {/* <Card className="text-white bg-success my-5 py-4 text-center w-50 mx-auto">
                <Card.Body><p className="text-white m-0 textoBanner">   This call to action card is a great place to showcase some important information or display a clever tagline!</p></Card.Body>
            </Card> */}

                <Carrusel titulo={"Últimas Recetas"} numTarjetas={3}/>
                <div className="row gx-4 gx-lg-5 align-items-center py-5 justify-content-center">
                    <div className="col-lg-5 d-flex flex-column justify-content-center align-items-center text-center mb-3">
                        <h1 className="font-weight-light">¡Comencemos esta aventura culinaria juntos!</h1>
                        <p className="fs-5">Interactúa con nosotros y haznos saber tus preferencias. Comparte tus creaciones culinarias con otros usuarios y déjanos tus comentarios sobre nuestras recetas. Juntos, podemos crear una comunidad de amantes de la comida y explorar juntos nuevas y emocionantes opciones culinarias.</p>
                        <Link className="btn-sm btn btn-success p-2 fs-5" to="/crear">¡Empezar ahora!</Link>
                    </div>
                    <div className="w-auto"><img className="img-fluid rounded mb-4 mb-lg-0" src={require('images/fondo.jpg')} width="840" alt="..." /></div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default PageHome;