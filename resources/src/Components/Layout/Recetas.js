import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import 'Components/Layout/recetas.css'
import Estrellas from "Components/Base/Estrellas";
import Tarjeta from "Components/Base/Tarjeta";
import axios from "axios";
import 'Components/Layout/recetasCustom.css'

function Recetas(){


  const [datos,setDatos] = useState(null);


  const cargarRecetas = async()=>{
    const recetas = await axios.get('http://localhost/api/receta');
    setDatos(recetas.data);
  }

  const cargarTarjetas = ()=>{
    if(datos!==null){
      console.log(datos);
      return (datos.map((tarjeta,i)=><Tarjeta key={i} datos={tarjeta}/>))
    }

  }

  useEffect(()=>{
    cargarRecetas();
  },[])


    return(
<React.Fragment>
<div className="w-100 wrapper mt-5" style={{ "backgroundColor": "#b3b3b3"}}>
  <div className="row w-100 my-3 my-lg-4">
    <div className="col-11"><input type="search" className="form-control p-3" placeholder="Buscar una receta aqui ..."/></div>
    <div className="col-1"><Button className="btn-success p-3">Buscar</Button></div>
  </div>
  <ButtonGroup className="btn-group-lg mb-2 mb-lg-4">
    <Button className="btn-success">Categoris</Button>
    <Button className="btn-success">Valoración</Button>
    <Button className="btn-success" >Ingredientes</Button>
  </ButtonGroup>
  <div className="recetasListadas">
    {cargarTarjetas()}
  </div>
</div>
</React.Fragment>
    )
}

export default Recetas;