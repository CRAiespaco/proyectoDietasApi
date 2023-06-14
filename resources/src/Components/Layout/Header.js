import React, { useEffect, useRef } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { generarUUID } from 'Functions/Funciones';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'Components/Layout/header.css';
import LogoMenu from 'Components/Base/LogoMenu';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();

    const headerOptions = () => {
        let header = [
            {
                titulo: "Inicio",
                path: "/"
            },
            {
                titulo: "Recetas",
                path: "/buscador"
            },
            {
                titulo: "Creador",
                path: "/crear"
            },
            {
                titulo: 'login',
                path: '/login'
            },
            {
                titulo: 'register',
                path: '/register'
            },
        ];
        let usuario = sessionStorage.getItem('usuario');
        if (usuario) {

            usuario = JSON.parse(usuario);
            const { rol } = usuario;
            if (rol === 'admin') {
                header = [...header,
                {
                    titulo: "Control Panel",
                    path: "/panel/recetas"
                },]
            }
            header = header.filter(cabecera => cabecera.titulo !== 'login' && cabecera.titulo !== 'register');
            header = [...header,
            {
                titulo: "Personalizados",
                path: "/personalizado"
            },
            {
                titulo: 'Mis Recetas',
                path: '/misRecetas'
            },
            {
                titulo: 'Log Out',
                path: '/'
            }
            ]

        }
        return header;
    }


    const opciones = headerOptions();
    let activeStyle = {
        color: "#FFF",
    };

    const handleLogOut = () => {
        sessionStorage.clear();
        navigate('/');
    }

    const ListarOpciones = () => {
        return opciones.map((option) => {
            if (option.titulo === 'Log Out') {
                return <NavLink key={generarUUID()} className='nav-link linkT' to={option.path} onClick={handleLogOut}>{option.titulo}</NavLink>
            }
            return (<NavLink key={generarUUID()} style={({ isActive }) => isActive ? activeStyle : undefined} className='nav-link linkT' to={option.path}>{option.titulo}</NavLink>)
        });
    }

    let ubicacionInicial = window.pageYOffset;
    let navegador = useRef(null);

    const efectoScroll = () => {
        let ubiActual = window.pageYOffset;
        if (ubicacionInicial >= ubiActual) {
            navegador.current.style.top = "0px"
        } else {
            navegador.current.style.transition = "top .6s ease"
            navegador.current.style.top = "-100px"
        }
        ubicacionInicial = ubiActual;
    }

    useEffect(() => {
        window.addEventListener('scroll', efectoScroll);
        return () => {
            window.removeEventListener('scroll', efectoScroll);
        }
    })

    return (
        <React.Fragment>
            <Navbar ref={navegador} collapseOnSelect expand='md' bg="success" variant="dark" fixed='top'>
                <Container fluid>
                    <Navbar.Brand className='linkT'><LogoMenu /></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav>
                            <ListarOpciones />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
}

export default Header;
