import React, { useContext, useEffect, useState } from "react";
import './crear.css'
import { Form, useNavigate } from 'react-router-dom';
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
import IngredienteAnyadido from "Components/Base/Ingredienteanyadido";
import Snackbar from '@mui/material/Snackbar';
import Alerta from "Components/Base/Alerta";
import { useAlert } from "hooks/useAlert";
import { Autocomplete, TextField } from "@mui/material";
import { useCategorias } from "hooks/useCategorias";


function CrearReceta() {

    const [ingredientes, setIngredientes] = useState([]);
    const [ingredientesFiltrados, setIngredientesFiltrados] = useState([]);
    const { ingredientesIncluidos } = useContext(recetasProvedor);
    const { categorias } = useCategorias();
    const formInitial = {
        nombre: "",
        valoracion: 0,
        pasosASeguir: "",
        imagen: "",
        validacion: false,
        ingredientes: [],
        categorias: [],
    }
    const [form, setForm] = useState(formInitial);
    const { alert, handleErrorClose, mensajeConfirmacion, mensajeError } = useAlert();
    const navigate = useNavigate();

    const conseguirIngredientes = async () => {
        const datos = await traerDatos(`${BASE_URL}/ingredientes`);
        setIngredientes(datos);
    }

    useEffect(() => {
        conseguirIngredientes();
    }, [])



    const handleInput = (event) => {
        let valor = event.target.value.toLowerCase();
        if (valor !== "") {
            let valorFiltrado = ingredientes.filter(ingrediente => ingrediente.nombre.toLowerCase().includes(valor));
            setIngredientesFiltrados(valorFiltrado);
        } else {
            setIngredientesFiltrados([]);
        }
    }

    const handleCategorias = (event, value) => {
        const codigos = value.map(valor => valor.id);
        setForm(prev => ({ ...prev, categorias: codigos }));
    }

    const enviarForm = async () => {
        let copiaForm = { ...form, ingredientes: ingredientesIncluidos };
        setForm(copiaForm);
        try {
            const respuesta = await axios.post(`${BASE_URL}/receta`, copiaForm);
            mensajeConfirmacion(respuesta.data.mensaje);
            const id = respuesta.data.receta.id;
            setTimeout(() => {
                navigate(`/detallesReceta/${id}`);
            }, 1800);
        } catch (error) {
            mensajeError(error);
        }
    }


    return (
        <React.Fragment>
            <div className=" w-100 d-flex justify-content-center align-content-center vh-100 fonodoCrear">
                <Form className="m-auto h-auto p-xxl-5 p-xl-5 p-sm-4 p-4 border border-success-subtle rounded-3 bg-light">
                    <Fila className="mb-3">
                        <Group as={Columna}>
                            <Label>Nombre de la receta</Label>
                            <FormControl type="text"
                                placeholder="Pon el nombre de la receta"
                                onInput={e => setForm({ ...form, nombre: e.target.value })}
                            />
                        </Group>
                    </Fila>
                    <Fila className="mb-3">
                        <Group>
                            <Label>URL de imagen</Label>
                            <FormControl type="text"
                                placeholder="Pon la URL de la imagen"
                                onInput={e => setForm({ ...form, imagen: e.target.value })}
                                renderInput={(params) => <TextField {...params} label='categorias' />}
                            />
                        </Group>
                        <Group className="gap-3">
                            <Label>Pasos a seguir</Label>
                            <FormControl as="textarea"
                                placeholder="Pon los pasos a seguir"
                                onInput={e => setForm({ ...form, pasosASeguir: e.target.value })}
                            />
                        </Group>
                    </Fila>
                    <Fila>
                        <Group>
                            {categorias && <Autocomplete
                                fullWidth
                                multiple
                                disableCloseOnSelect
                                options={categorias}
                                onChange={handleCategorias}
                                getOptionLabel={(option) => option.nombre}
                                renderInput={(params) => <TextField {...params} label='categorias' />}
                            />}
                        </Group>
                    </Fila>
                    <Fila>
                        {ingredientes.length !== 0 && <Group>
                            <Label>Ingredientes.</Label> <br />
                            {ingredientesIncluidos.length !== 0 && ingredientesIncluidos.map((datos, i) => <IngredienteAnyadido key={i} ingrediente={datos} />)}
                            <FormControl placeholder="patatas, fresas..." min={1} onInput={handleInput} />
                        </Group>}
                    </Fila>
                    {ingredientesFiltrados.map((ingrediente) => <Ingrediente key={ingrediente.id} ingrediente={ingrediente} />)}
                    <Fila className="d-flex justify-content-center align-items-center pt-3">
                        <Button variant="success" className="w-auto" onClick={enviarForm}>Enviar</Button>
                    </Fila>
                </Form>
            </div>
            <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
                <Alerta onClose={handleErrorClose} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.message}
                </Alerta>
            </Snackbar>
        </React.Fragment>
    )
}

export default CrearReceta;