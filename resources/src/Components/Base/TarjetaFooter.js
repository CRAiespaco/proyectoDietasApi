import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'Components/Base/tarjetaFooter.css';
import { Link } from 'react-router-dom';

function TarjetaFooter() {
  return (
    <Card style={{width: '18rem'}}>
      <Card.Img className='imagenFooter' height={'120px'} variant="top" src={require('../../images/fondo.jpg')} />
      <Card.Body>
        <Card.Title>Título de la Receta</Card.Title>
        <Button size='sm' variant="primary">Más detalles</Button>
      </Card.Body>
    </Card>
  );
}

export default TarjetaFooter;