import React, {useContext, useEffect, useState} from "react";
import './crear.css'
import {Form} from 'react-router-dom';
import Label from 'react-bootstrap/FormLabel';
import FormControl from "react-bootstrap/FormControl";
import Group from 'react-bootstrap/FormGroup';
import Button from "react-bootstrap/Button";
import Fila from 'react-bootstrap/Row';
import Columna from 'react-bootstrap/Col';
import { generarUUID, traerDatos } from "Functions/Funciones";
import axios from "axios";
import { BASE_URL } from "constant/constantes";
import Ingrediente from "Components/Base/Ingrediente";
import { recetasProvedor } from "context/RecetasProvider";


function CrearReceta(){

    const [ingredientes,setIngredientes] = useState([]);
    const [ingredientesFiltrados,setIngredientesFiltrados] = useState([]);
    const { ingredientesIncluidos } = useContext(recetasProvedor);

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

    const conseguirIngredientes = async()=>{
        const datos = await traerDatos(`${BASE_URL}/ingredientes`);
         setIngredientes(datos);
    }

    useEffect(()=>{
        conseguirIngredientes();
    },[])



    const handleInput = (event)=>{
        let valor = event.target.value.toLowerCase();
        if(valor !== ""){
            let valorFiltrado = ingredientes.filter( ingrediente => ingrediente.nombre.toLowerCase().includes(valor) );
            setIngredientesFiltrados(valorFiltrado);
        }else{
            setIngredientesFiltrados([]);
        }
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
                   {ingredientes.length!==0 && <Group>
                        <Label>Ingredientes.</Label>
                        {ingredientesIncluidos.map(()=> <div>ALGO</div> ) }
                        <FormControl placeholder="patatas, fresas..." min={1} onInput={handleInput}/>
                    </Group>}
                </Fila>
               { ingredientesFiltrados.map((ingrediente) => <Ingrediente key={generarUUID()} ingrediente={ingrediente} />)}
                <Fila className="d-flex justify-content-center align-items-center pt-3">
                    <Button className="w-auto" onClick={enviarForm}>Enviar</Button>
                </Fila>
            </Form>
            </div>
        </React.Fragment>
    )
}

export default CrearReceta;