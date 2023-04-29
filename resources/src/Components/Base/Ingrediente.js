import { memo, useCallback, useState } from "react";
import { generarUUID } from "Functions/Funciones";
import FormControl from "react-bootstrap/FormControl";
import { Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'Components/Listados/listadoIngredientes.css';

function Ingrediente({ingrediente}){
    const[cantidad,setCantidad] = useState(0);

    const anyadirIngrediente = ()=>{
        console.log(cantidad );
    }

    console.log("Me renderizo como un inutil");

    const handleChange = useCallback((event)=>{
        let valor = event.target.value;
        if( valor < 0) valor = 0;
        setCantidad(valor);
    },[])
    return(
        <>
        <div className="ingrediente" key={generarUUID()}>
            <img className='imagenIngrediente' src={ingrediente.imagen} alt='Imagen de un ingrediente' />
            <h4>{ingrediente.nombre}</h4>
            <FormControl className='peso' placeholder='FDso... fdsfdsfdsa' type="number" value={cantidad} onChange={handleChange}/>
            <Button onClick={anyadirIngrediente}><FontAwesomeIcon icon={faPlus}/></Button> 
        </div>
        </>
    )
}export default memo(Ingrediente);