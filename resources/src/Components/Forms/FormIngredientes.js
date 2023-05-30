import React, { useContext, useState, useEffect } from "react";
import './crear.css'
import Label from 'react-bootstrap/FormLabel';
import FormControl from "react-bootstrap/FormControl";
import Group from 'react-bootstrap/FormGroup';
import Fila from 'react-bootstrap/Row';
import Ingrediente from "Components/Base/Ingrediente";
import IngredienteEdit from "Components/Base/IngredienteEdit";
import { recetasProvedor } from "context/RecetasProvider";
import { BASE_URL } from "constant/constantes";
import axios from "axios";


function FormIngredientes({ingredientesIncluidos}){
    const [ingredientes,setIngredientes] = useState([]);
    const [ingredientesFiltrados,setIngredientesFiltrados] = useState([]);

    const conseguirIngredientes = async()=>{
        const datos = await axios.get(`${BASE_URL}/ingredientes`);
        setIngredientes(datos.data);
    }

    useEffect(()=>{
        conseguirIngredientes();
    },[])

    const handleInput = (event)=>{
        let valor = event.target.value.toLowerCase();
        if(valor !== ""){
            let valorFiltrado = ingredientes.filter( ingrediente => ingrediente.nombre.toLowerCase().includes(valor) );
            setIngredientesFiltrados(valorFiltrado);
        }else{
            setIngredientesFiltrados([]);
        }
    }


    return(
        <>
            <Fila>
            {ingredientes.length !==0 && <Group>
                <Label>Ingredientes.</Label> <br/>
    {ingredientesIncluidos.length !== 0 && ingredientesIncluidos.map((datos,i)=> <IngredienteEdit key={i} ingrediente={datos}/>)}
                <FormControl placeholder="patatas, fresas..." min={1} onInput={handleInput}/>
            </Group>}
        </Fila>
        { ingredientesFiltrados.map((ingrediente) => <Ingrediente key={ingrediente.id} ingrediente={ingrediente} />)}
    </>
    )
}export default FormIngredientes;