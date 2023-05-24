import Footer from "Components/Layout/Footer";
import Header from "Components/Layout/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faWheatAwn, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Container, Row, Nav, Badge } from "react-bootstrap";
import React from "react";

function PagePanel({children}){
    return(
        <React.Fragment>
            <Header/>
<Container fluid style={{marginTop:'90px'}}>
  <Row>
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <span className="fs-5 d-none d-sm-inline">Panel de Control</span>
        <Nav
          variant="pills"
          className="flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <Nav.Item className="w-100">
            <Link to='/panel/recetas' className="nav-link px-0 d-flex align-items-center gap-2">
            <FontAwesomeIcon size="xl" inverse icon={faUtensils}/>
            <Badge bg="secondary" className="ms-1 d-none d-sm-inline fs-6">Recetas</Badge>
            </Link>
          </Nav.Item>
          <Nav.Item className="w-100">
            <Link
              to='/panel/ingredientes'
              className="nav-link px-0 align-middle d-flex align-items-center gap-2"
            >
              <FontAwesomeIcon size="xl" inverse icon={faWheatAwn}/>
              <Badge bg="secondary" className="ms-1 d-none d-sm-inline fs-6">Ingredientes</Badge>
            </Link>
          </Nav.Item>
          <Nav.Item className="w-100">
            <Link
             to='/'
            className="nav-link px-0 align-middle d-flex align-items-center gap-2">
            <FontAwesomeIcon size="xl" inverse icon={faLayerGroup}/>
            <Badge bg="secondary" className="ms-1 d-none d-sm-inline fs-6">Categorias</Badge>
            </Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
    {children}
  </Row>
</Container>

            <Footer/>
        </React.Fragment>
    )
}export default PagePanel;