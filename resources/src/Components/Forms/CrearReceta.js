import React from "react";
import './crear.css'
import {Form} from 'react-router-dom';
import Label from 'react-bootstrap/FormLabel';
import FormControl from "react-bootstrap/FormControl";
import Group from 'react-bootstrap/FormGroup';
import Check from 'react-bootstrap/FormCheck';
import Button from "react-bootstrap/Button";
import  Image  from "react-bootstrap/Image";
import Fila from 'react-bootstrap/Row';
import Columna from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';


function CrearReceta(){
    return(
        <React.Fragment>
            <div className=" w-100 d-flex justify-content-center align-content-center vh-100 fonodoCrear">
            <Form method="get" action="/crear" className="m-auto h-auto p-xxl-5 p-xl-5 p-sm-4 p-4 border border-success-subtle rounded-3 bg-white">
                <Fila className="mb-3">
                    <Group as={Columna}>
                        <Label>Nombre de la receta</Label>
                        <FormControl type="text" placeholder="Pon el nombre de la receta"></FormControl>
                    </Group>
                    <Group as={Columna}>
                        <Label>Valoración</Label>
                        <FormControl type="number" max="5"></FormControl>
                    </Group>
                </Fila>
                <Fila className="mb-3">
                    <Group>
                        <Label>URL de imagen</Label>
                        <FormControl type="text" placeholder="Pon la URL de la imagen"></FormControl>
                    </Group>
                    <Group className="gap-3">
                        <Label>Pasos a seguir</Label>
                        <FormControl type="text" placeholder="Pon los pasos a seguir"></FormControl>
                    </Group>
                </Fila>
                <Fila>
                    <Label>Ingredientes que tenga la receta.</Label>
                    <FormControl type="text"/>
                </Fila>
                <Fila>
                    <Label>Peso ingrediente.</Label>
                    <FormControl type="number"/>
                </Fila>
                <Fila className="d-flex justify-content-center align-items-center pt-3">
                    <Button className="w-auto">Enviar</Button>
                </Fila>
            </Form>
            </div>
        </React.Fragment>
    )
}

export default CrearReceta;