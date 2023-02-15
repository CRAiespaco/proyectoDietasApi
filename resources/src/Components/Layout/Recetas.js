import React from "react";
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


  const recogerRecetas = async()=>{
    const recetas = await axios.get('http://localhost/api/receta');
    if(Object.keys(recetas).length){
      
    }
  }

    const tarjetasEjemplo = ()=>{
        let ejemplo = []
        for (let i=0;i<48;i++){
            ejemplo.push(i);
        }
        let contenido = {
          imagen: "Hola"
        }
        return ejemplo.map((a,i)=><Tarjeta titulo={'Albóndiga con pasta'} imagen={'feo'} totalNutricional={1200}  key={i}/>);
    }



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
    {tarjetasEjemplo()}
  </div>
</div>
</React.Fragment>
    )
}

export default Recetas;