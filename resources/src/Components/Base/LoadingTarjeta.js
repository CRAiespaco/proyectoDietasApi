import React from 'react';
import { Card } from "react-bootstrap";
import Placeholder from 'react-bootstrap/Placeholder';

function LoadingTarjeta(){
    return(
        <Card style={{ width: '288px' }}>
        <Card.Img variant="top" src={require('images/placeholder.png')}  />
        <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={9} />{'   '}
            <Placeholder xs={2} />
        </Placeholder>
        <Placeholder xs={5}  size="lg" />{' '}
        <Placeholder.Button variant="success" xs={6} />
        <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={5} />{' '}<Placeholder xs={5} />
        </Placeholder>
        </Card.Body>
    </Card>
    )
}export default LoadingTarjeta;