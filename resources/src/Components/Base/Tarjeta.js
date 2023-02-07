import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Estrellas from 'Components/Base/Estrellas.js';
import EstrellasPrueba from './EstrellasPrueba';
import 'Components/Base/tarjeta.css'
import { generarUUID } from 'Functions/Funciones';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStopwatch, faFire } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Tarjeta() {

  const [like,setLike] = useState(false);

  const favorito = (event)=>{
    if(event.target.classList.contains('heartClick') && event.target.nodeName==="svg"){
      event.target.classList.remove('heartClick');
    }else if(event.target.nodeName==="path" && event.target.parentElement.classList.contains('heartClick') ){
      event.target.parentElement.classList.remove('heartClick');
    }else if(!event.target.parentElement.classList.contains('heartClick') && event.target.nodeName==="path"){
      event.target.parentElement.classList.add('heartClick');
      setLike(true);
    }else if(!event.target.classList.contains('heartClick') && event.target.nodeName==="svg"){
      event.target.classList.add('heartClick');
      setLike(true);
    }
  }

  return (
    <Card style={{ width: '288px' }} className='bodyCard'>
      <Link to="/detallesReceta"><Card.Img className='imagenTarjeta' variant="top" src={require('../../images/fondo.jpg')} /></Link>
      <Card.Body>
        <Card.Title>Título de la Receta</Card.Title>
        <div className=' d-flex '>
          <EstrellasPrueba key={generarUUID()}/>
          <Link className='btn btn-success btn-sm masDetalles' to="/detallesReceta">Más detalles</Link>
        </div>
        <FontAwesomeIcon icon={faHeart} className='heartCard' onClick={favorito} />
      <div className='d-flex justify-content-around mt-2'>
        <Card.Text className='text-muted d-flex gap-2 align-items-center m-0'>
          <FontAwesomeIcon icon={faStopwatch}/>30min
        </Card.Text>
        <Card.Text className='text-muted d-flex gap-2 align-items-center m-0'>
          <FontAwesomeIcon icon={faFire}/> 500kcal
        </Card.Text>
      </div>
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;