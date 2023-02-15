import React, { useEffect, useRef } from 'react';
import { Navbar,Nav,Container } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import { generarUUID } from 'Functions/Funciones';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'Components/Layout/header.css';

function Header (){
    const opciones = [
        {
            titulo:"Inicio",
            path:"/"
        },
        {
            titulo:"Recetas",
            path:"/recetas"
        },
        /* {
            titulo:"Personalizados",
            path:"/crear"
        }, */
        /* {
            titulo:"Incidencias",
            path:"/incidencias"
        }, */
        {
            titulo:"Crea tu propia receta",
            path:"/crear"
        },
    ]
    let activeStyle = {
        color: "#FFF",
      };

    const listarOpciones = ()=>{
        return opciones.map((option)=> <NavLink key={generarUUID()} style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-link linkT' to={option.path}>{option.titulo}</NavLink>);
    }

    let ubicacionInicial = window.pageYOffset;
    let navegador = useRef(null);

    const efectoScroll = ()=>{
        let ubiActual = window.pageYOffset;
        if(ubicacionInicial >= ubiActual){
            navegador.current.style.top = "0px"
        }else{
            navegador.current.style.transition = "top .6s ease"
            navegador.current.style.top = "-100px"
        }
        ubicacionInicial = ubiActual;
    }

    useEffect(()=>{
        window.addEventListener('scroll',efectoScroll);
        return ()=>{
            window.removeEventListener('scroll',efectoScroll);
        }
    })

    return(
        <React.Fragment>
        <Navbar ref={navegador} collapseOnSelect expand='md' bg="success" variant="dark" fixed='top'>
        <Container fluid>
            <Navbar.Brand className='linkT'><img className="logo" width={'70'} src={require('./../../images/logo.png')}/></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
            <Nav>
                {listarOpciones()}
                <NavLink key={generarUUID()} style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-link linkT' to={'/login'}>Login</NavLink>
                <NavLink key={generarUUID()} style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-link linkT' to={'/register'}>Register</NavLink>
            </Nav>
           </Navbar.Collapse>
        </Container>
        </Navbar>
        </React.Fragment>
    );
}

export default Header;
