import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import 'Components/Layout/recetas.css'
import Tarjeta from "Components/Base/Tarjeta";
import 'Components/Layout/recetasCustom.css'
import { generarUUID } from "Functions/Funciones";
import LoadingTarjeta from "Components/Base/LoadingTarjeta";
import { useRecetas } from "hooks/useRecetas";

function Recetas(){

  const { recetas } = useRecetas();
  const [search,setSearch] = useState("");
  const [filtrado,setFiltrado] = useState([]);

  const handleChange = (event)=> {
    let valorActual = event.target.value
    setSearch(valorActual);
    let arrayObjeto = recetas.filter( objeto => Object.keys(objeto).some( clave => String(objeto[clave]).toLowerCase().includes(valorActual.toLowerCase())))
    console.log(arrayObjeto);
    setFiltrado(arrayObjeto);

  }

  useEffect(()=>{
      setFiltrado(recetas);
  },[recetas])


    return(
<React.Fragment>
<div className="w-100 wrapper mt-5" style={{ "backgroundColor": "#b3b3b3"}}>
  <div className="row w-100 my-3 my-lg-4">
    <div className="col-11"><input type="search" value={search} onChange={handleChange} className="form-control p-3" placeholder="Buscar una receta aqui ..."/></div>
    <div className="col-1"><Button className="btn-success p-3">Buscar</Button></div>
  </div>
  <ButtonGroup className="btn-group-lg mb-2 mb-lg-4">
    <Button className="btn-success">Categoris</Button>
    <Button className="btn-success">Valoración</Button>
    <Button className="btn-success" >Ingredientes</Button>
  </ButtonGroup>
  <div className="recetasListadas">
    { recetas.length !== 0 ?
    filtrado.map( tarjeta => <Tarjeta key={generarUUID()} datos={tarjeta}/> ) : 
    [...Array(5)].map( ()=> <LoadingTarjeta key={generarUUID()} />)}
  </div>
</div>
</React.Fragment>
    )
}

export default Recetas;