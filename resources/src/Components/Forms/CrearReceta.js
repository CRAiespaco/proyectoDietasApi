import React, {useEffect, useState} from "react";
import './crear.css'
import {Form} from 'react-router-dom';
import Label from 'react-bootstrap/FormLabel';
import FormControl from "react-bootstrap/FormControl";
import Group from 'react-bootstrap/FormGroup';
import Button from "react-bootstrap/Button";
import Fila from 'react-bootstrap/Row';
import Columna from 'react-bootstrap/Col';
import { generarUUID } from "Functions/Funciones";
import axios from "axios";


function CrearReceta(){

    const [numFilas, setNumFilas] = useState(0);
      
    const [filasTotal, setFilasTotal] = useState([]);

    const [form,setForm] = useState({
        nombre:"",
        valoracion:0,
        pasosASeguir:"",
        imagen:"",
        validacion:false,
        ingredientes:[{
            nombre:"patatas",
            imagen:"https://static1.abc.es/media/bienestar/2022/01/12/patatas-beneficio-koDF--620x349@abc.jpg"
        },
        {
            nombre:"cebolla roja",
            imagen:"https://www.gastronomiavasca.net/uploads/image/file/3338/w700_cebolla_roja.jpg"
        }
    ]
    })

    useEffect(()=>{
        let total = Array(numFilas).fill(0);
        setFilasTotal(total);
    },[numFilas]);


    const filasDinamicas = ()=>{
        return(filasTotal.length ? 
            filasTotal.map(() =>
            <Fila key={generarUUID()} className="mt-3">
                <Group as={Columna} className="gap-3" >
                    <Label>Nombre del Ingrediente</Label>
                    <FormControl type="text" placeholder="Pon el nombre de tu Ingrediente"
                    />
                </Group>
                <Group as={Columna} className="gap-3">
                    <Label>URL imagen del ingrediente</Label>
                    <FormControl type="text"
                     placeholder="Pon la url"
                     />
                </Group>
            </Fila>):
           <Fila className="mt-3"><p className="text-center fs-5">No hay ningun Ingrediente</p></Fila>
           )
    }

    const handleInput = (event)=>{
        let valor = event.target.value
        if(valor === "") valor = 1;
        setNumFilas(parseInt(valor))
    }

    const enviarForm =async ()=>{
        const respuesta = await axios.post("http://localhost:8090/api/receta",form);
    }


    return(
        <React.Fragment>
            <div className=" w-100 d-flex justify-content-center align-content-center vh-100 fonodoCrear">
            <Form className="m-auto h-auto p-xxl-5 p-xl-5 p-sm-4 p-4 border border-success-subtle rounded-3 bg-light">
                <Fila className="mb-3">
                    <Group as={Columna}>
                        <Label>Nombre de la receta</Label>
                        <FormControl type="text"
                         placeholder="Pon el nombre de la receta"
                         onInput={e=>setForm({...form,nombre:e.target.value})}
                         />
                    </Group>
                </Fila>
                <Fila className="mb-3">
                    <Group>
                        <Label>URL de imagen</Label>
                        <FormControl type="text"
                         placeholder="Pon la URL de la imagen"
                         onInput={e=>setForm({...form,imagen:e.target.value})}
                         />
                    </Group>
                    <Group className="gap-3">
                        <Label>Pasos a seguir</Label>
                        <FormControl as="textarea"
                         placeholder="Pon los pasos a seguir"
                         onInput={e=>setForm({...form,pasosASeguir:e.target.value})}
                         />
                    </Group>
                </Fila>
                <Fila>
                    <Group>
                        <Label>Numero de Ingredientes que tenga la receta.</Label>
                        <FormControl type="number" min={1} onInput={handleInput}/>
                    </Group>
                </Fila>
                {filasDinamicas()}
                <Fila className="d-flex justify-content-center align-items-center pt-3">
                    <Button className="w-auto" onClick={enviarForm}>Enviar</Button>
                </Fila>
            </Form>
            </div>
        </React.Fragment>
    )
}

export default CrearReceta;