import './listadoIngredientes.css';
import Ingrediente from "Components/Base/Ingrediente";

function ListadoIngredientes({ingredientes}){

 
    return(
        ingredientes.map((ingrediente) => <Ingrediente ingrediente={ingrediente} />  )
       )
} export default ListadoIngredientes;