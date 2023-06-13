import Footer from "Components/Layout/Footer";
import Header from "Components/Layout/Header";
import MisRecetas from "Components/Layout/MisRecetas";
import React from "react";

function PageMisRecetas() {
    return (
        <React.Fragment>
            <Header />
            <MisRecetas />
            <Footer />
        </React.Fragment>
    )
}

export default PageMisRecetas;