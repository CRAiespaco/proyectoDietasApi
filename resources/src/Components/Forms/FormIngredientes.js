import IngredienteEdit from "Components/Base/IngredienteEdit";
import { useIngredientes } from "hooks/useIngredientes";
import FormControl from "react-bootstrap/FormControl";
import Ingrediente from "Components/Base/Ingrediente";
import Label from 'react-bootstrap/FormLabel';
import Group from 'react-bootstrap/FormGroup';
import React, { useState } from "react";
import Fila from 'react-bootstrap/Row';
import './crear.css'


function FormIngredientes({ingredientesIncluidos = []}){
    const [ingredientesFiltrados,setIngredientesFiltrados] = useState([]);
    const { ingredientes } = useIngredientes();

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
            {ingredientesIncluidos.length !== 0 &&
            ingredientesIncluidos.map((datos,i)=> <IngredienteEdit key={i} ingrediente={datos}/>)}
                <FormControl placeholder="patatas, fresas..." min={1} onInput={handleInput}/>
            </Group>}
        </Fila>
        { ingredientesFiltrados.map((ingrediente) => <Ingrediente key={ingrediente.id} ingrediente={ingrediente} />)}
    </>
    )
}export default FormIngredientes;