function IngredienteAnyadido({ingrediente}){


    return(<>
    <br/>
    <h3 style={{ display:'inline-block' }}>{ingrediente.nombre}</h3>
    <img style={{ display:'inline-block' }} width='80' src={ingrediente.imagen} />
    <p style={{ display:'inline-block' }}>{ingrediente.cantidad} g</p>
    </>)
}export default IngredienteAnyadido;