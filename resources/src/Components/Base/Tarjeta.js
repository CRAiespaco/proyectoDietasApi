import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Estrellas from 'Components/Base/Estrellas.js';
import EstrellasPrueba from './EstrellasPrueba';
import 'Components/Base/tarjeta.css'
import { generarUUID } from 'Functions/Funciones';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStopwatch, faFire } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from 'constant/constantes';
import { recetasUser } from 'hooks/recetasUser';

function Tarjeta({ datos }) {

  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  const actualizarLikes = (id) => {
    let recetasLocal = sessionStorage.getItem('recetas');
    if (recetasLocal) {
      recetasLocal = JSON.parse(recetasLocal);
      recetasLocal = [...recetasLocal, id];
      sessionStorage.setItem('recetas', JSON.stringify(recetasLocal));
    }
  }
  const quitarLike = (id) => {
    console.log(id)
    let recetasLocal = sessionStorage.getItem('recetas');
    if (recetasLocal) {
      recetasLocal = JSON.parse(recetasLocal);
      recetasLocal = recetasLocal.filter(receta => receta !== id);
      sessionStorage.setItem('recetas', JSON.stringify(recetasLocal));
    }
  }

  const favorito = () => {
    const usuario = sessionStorage.getItem('usuario');
    if (usuario) {
      const { id } = JSON.parse(usuario);
      if (like) {
        axios.post(`${BASE_URL}/dislike/${datos.id}/${id}`);
        quitarLike(datos.id);
        setLike(false);
      } else {
        axios.post(`${BASE_URL}/favorito/${datos.id}/${id}`);
        actualizarLikes(datos.id);
        setLike(true);
      }
    } else {
      navigate('/login');
    }
  }



  const combrobar = async () => {
    let recetasLocal = sessionStorage.getItem('recetas');
    if (recetasLocal) {
      recetasLocal = JSON.parse(recetasLocal);
      let validacion = recetasLocal.some(id => datos.id === id);
      setLike(validacion);
    }
  }

  useEffect(() => {
    combrobar();
  }, [])

  return (
    <Card style={{ width: '288px' }} className='bodyCard'>
      <Link to={`/detallesReceta/${datos.id}`}><Card.Img className='imagenTarjeta' variant="top" src={datos.imagen} /></Link>
      <Card.Body>
        <Card.Title>{datos.nombre}</Card.Title>
        <div className=' d-flex '>
          <EstrellasPrueba key={generarUUID()} />
          <Link className='btn btn-success btn-sm masDetalles' to={`/detallesReceta/${datos.id}`}>Más detalles</Link>
        </div>
        <FontAwesomeIcon icon={faHeart} className={like ? 'heartCard heartClick' : 'heartCard'} onClick={favorito} />
        <div className='d-flex justify-content-around mt-2'>
          <Card.Text className='text-muted d-flex gap-2 align-items-center m-0'>
            <FontAwesomeIcon icon={faStopwatch} />30min
          </Card.Text>
          <Card.Text className='text-muted d-flex gap-2 align-items-center m-0'>
            <FontAwesomeIcon icon={faFire} /> 1200kcal
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Tarjeta;