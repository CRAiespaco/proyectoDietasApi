import { generarUUID } from "Functions/Funciones";
import FormControl from "react-bootstrap/FormControl";
import { Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './listadoIngredientes.css';
import { useState } from "react";
import Ingrediente from "Components/Base/Ingrediente";
function ListadoIngredientes({ingredientes}){

 
    return(
        ingredientes.map((ingrediente) => <Ingrediente ingrediente={ingrediente} />  )
       )
} export default ListadoIngredientes;