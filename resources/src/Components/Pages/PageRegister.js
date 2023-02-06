import Footer from "Components/Layout/Footer";
import Header from "Components/Layout/Header";
import React from "react";
import Register from "Components/Forms/Register";

function PageRegister(){
    return(
        <React.Fragment>
            <Header/>
            <Register/>
            <Footer/>
        </React.Fragment>
    );
}

export default PageRegister;