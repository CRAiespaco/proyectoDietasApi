import Footer from "Components/Layout/Footer";
import Header from "Components/Layout/Header";
import Login from "Components/Forms/Login";
import React from "react";

function PageLogin(){
    return(
        <React.Fragment>
            <Header/>
            <Login/>
            <Footer/>
        </React.Fragment>
    );
}

export default PageLogin;