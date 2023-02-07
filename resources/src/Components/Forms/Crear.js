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


function Crear(){
    return(
        <React.Fragment>
            <div className=" w-100 d-flex justify-content-center align-content-center vh-100 fonodoCrear">
            <Form method="get" action="/crear" className="m-auto h-auto p-xxl-5 p-xl-5 p-sm-4 p-4 border border-success-subtle rounded-3 bg-white">
                <Fila className="mb-3">
                    <Group as={Columna}>
                        <Label>Edad</Label>
                        <FormControl type="number" placeholder="Pon tu edad"></FormControl>
                    </Group>
                    <Group as={Columna}>
                        <Label>Altura</Label>
                        <FormControl type="number" placeholder="Pon tu altura"></FormControl>
                    </Group>
                </Fila>
                <Fila className="mb-3">
                    <Group as={Columna}>
                        <Label>Peso</Label>
                        <FormControl type="number" placeholder="Pon tu peso"></FormControl>
                    </Group>
                    <Group as={Columna} className=" d-flex gap-3">
                        <Label>Genero</Label>
                        <Check value="chico" type="radio" name="genero" label={<FontAwesomeIcon className="munyecos" color="#1a26d6" icon={faPerson}/>}/>
                        <Check value="chica" type="radio" name="genero" label={<FontAwesomeIcon className="munyecos" color="#f00a9b" icon={faPersonDress}/>}/>
                    </Group>
                </Fila>
                <Fila>
                    <Label>Alegernos/Ingredientes que no te gusta.</Label>
                    <FormControl type="search"/>
                </Fila>
                <Fila className="d-flex justify-content-center align-items-center pt-3">
                    <Button className="w-auto">Enviar</Button>
                </Fila>
            </Form>
            </div>
        </React.Fragment>
    )
}

export default Crear;