import { generarUUID } from "Functions/Funciones";
import FormControl from "react-bootstrap/FormControl";
import { Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './listadoIngredientes.css';
import { useState } from "react";
function ListadoIngredientes({ ingredientes}){

    const[cantidad,setCantidad] = useState(0);

    const anyadirIngrediente = ()=>{
        console.log(cantidad );
    }
    return(
        ingredientes.map(({nombre, imagen}) =>
        <div className="ingrediente" key={generarUUID()}>
            <img className='imagenIngrediente' src={imagen} alt='Imagen de un ingrediente' />
            <h4>{nombre}</h4>
            <FormControl className='peso' placeholder='Peso...' type="number" value={cantidad} onInput={(e)=> setCantidad(e.target.value)}/>
             <Button onClick={anyadirIngrediente}><FontAwesomeIcon icon={faPlus}/></Button> 
        </div>)
       )
} export default ListadoIngredientes;