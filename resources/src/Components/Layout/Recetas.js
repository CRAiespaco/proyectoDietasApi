import React from "react";
import { Form } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Group from 'react-bootstrap/FormGroup';
import Check from 'react-bootstrap/FormCheck'
import Label from 'react-bootstrap/FormLabel';
import InputGroup  from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import 'Components/Layout/recetas.css'
import Estrellas from "Components/Base/Estrellas";
import Tarjeta from "Components/Base/Tarjeta";
import 'Components/Layout/recetasCustom.css'

function Recetas(){

    const tarjetasEjemplo = ()=>{
        let ejemplo = []
        for (let i=0;i<48;i++){
            ejemplo.push(i);
        }
        return ejemplo.map((a,i)=><Tarjeta key={i}/>)
    }



    return(
<React.Fragment>
<div className="w-100 wrapper mt-5">
  <div className="row w-100 my-3 my-lg-4">
    <div className="col-11"><input type="search" className="form-control p-3" placeholder="Buscar una receta aqui ..."/></div>
    <div className="col-1"><Button className="btn-primary p-3">Buscar</Button></div>
  </div>
  <ButtonGroup className="btn-group-lg mb-2 mb-lg-4">
    <Button className="btn-primary">Categorias</Button>
    <Button className="btn-primary">Valoracion</Button>
    <Button className="btn-primary" >Filtros</Button>
    <Button className="btn-primary">Mas</Button>
    <Button className="btn-primary">Etc</Button>
  </ButtonGroup>
  <div className="recetasListadas">
    {tarjetasEjemplo()}
  </div>
</div>
</React.Fragment>
    )
}

export default Recetas;