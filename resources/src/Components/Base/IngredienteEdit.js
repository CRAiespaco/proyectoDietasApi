import { useRef } from "react";
import { generarUUID } from "Functions/Funciones";
import FormControl from "react-bootstrap/FormControl";
import 'Components/Listados/listadoIngredientes.css';

function IngredienteEdit({ingrediente}){
    const cantidadRef = useRef(0);
    
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
            <FormControl
            min='0'
            className='peso'
            placeholder='Peso...'
            type="number"
            ref={cantidadRef}
            onChange={handleChange}
            defaultValue={ingrediente.pivot.cantidad}
            />
        </div>
        </>
    )
}export default IngredienteEdit;