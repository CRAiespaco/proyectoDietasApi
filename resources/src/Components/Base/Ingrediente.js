import { useContext, useEffect, useRef } from "react";
import { generarUUID } from "Functions/Funciones";
import FormControl from "react-bootstrap/FormControl";
import { Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'Components/Listados/listadoIngredientes.css';
import { recetasProvedor } from "context/RecetasProvider";

function Ingrediente({ingrediente}){
    const cantidadRef = useRef(0);
    const { setIngredientesIncluidos } = useContext(recetasProvedor);

    const anyadirIngrediente = ()=>{
        let nuevoIngrediente = {
            nombre: ingrediente.nombre,
            imagen:ingrediente.imagen,
            cantidad:cantidadRef.current.value,
        }
        console.log(nuevoIngrediente);
        setIngredientesIncluidos(
            (ingredienteAnterior)=>{
                let copiaIngrediente = [...ingredienteAnterior];
                copiaIngrediente = [...copiaIngrediente,nuevoIngrediente];
                return copiaIngrediente;
            })
    }
    

    const handleChange = (event)=>{
        let valor = event.target.value;
        if( valor < 0) valor = 0;
        cantidadRef.current.value = valor;
    }

    return(
        <>
        <div className="ingrediente" key={generarUUID()}>
            <img className='imagenIngrediente' src={ingrediente.imagen} alt='Imagen de un ingrediente' />
            <h4>{ingrediente.nombre}</h4>
            <FormControl min='0' className='peso' placeholder='Peso...' type="number" ref={cantidadRef} onChange={handleChange}/>
            <Button onClick={anyadirIngrediente}><FontAwesomeIcon icon={faPlus}/></Button> 
        </div>
        </>
    )
}export default Ingrediente;