import axios from 'axios';
import { BASE_URL } from 'constant/constantes';
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alerta from "Components/Base/Alerta";
import { Button, Col, Form, Image, Modal, Row } from 'react-bootstrap';
import { useAlert } from 'hooks/useAlert';
import { useRecetas } from 'hooks/useRecetas';
import IngredienteAnyadido from "Components/Base/Ingredienteanyadido";
import Ingrediente from "Components/Base/Ingrediente";
import FormIngredientes from 'Components/Forms/FormIngredientes';
//Modal para editar PagePanelRecetas
function ModalEditar({show, onHide, id}){
    const [ver,setVer] = useState(false);
    const [recetaID, setRecetaID] = useState({});
    const [recetaUpdate, setRecetaUpdate] = useState({
        nombre: '',
        pasosASeguir: '',
        validacion: false,
        ingredientes: [],
    });
    const { alert, handleErrorClose, mensajeConfirmacion, mensajeError } = useAlert();
    const { cargarRecetas } = useRecetas();

    const cargarReceta = async() => {
        let receta = await axios.get(`${BASE_URL}/receta/${id}`);
        setRecetaID(receta.data);
        setVer(true);
        setRecetaUpdate(prev => ({...prev, validacion: receta.data.validacion}));
    }

    const handleCloseEditar = () => setVer(false);

    useEffect(()=> {
    if(id!==null && show){
        cargarReceta();
    }},[id]);

    const handlePublicar = async(event) => {
        let valido = event.target.checked;
        try{
            await axios.post(`${BASE_URL}/receta/${id}/validacion/${valido}`);
            setRecetaUpdate(prev => ({...prev, validacion: valido}));
        }catch(error){
            console.log(error);
            setRecetaUpdate(prev => ({...prev, validacion: !valido}));
        }

    }

    const handleActulizar = async(event) => {
        event.preventDefault();
        try{
            let datos = await axios.put(`${BASE_URL}/receta/${id}`, recetaUpdate);
            mensajeConfirmacion(datos.data.mensaje);
            handleCloseEditar();
            cargarRecetas();
        }catch(error){
            mensajeError(error);
        }
    }

    const handleInput = (event)=>{
        let valor = event.target.value.toLowerCase();
        if(valor !== ""){
            let valorFiltrado = ingredientes.filter( ingrediente => ingrediente.nombre.toLowerCase().includes(valor) );
            setIngredientesFiltrados(valorFiltrado);
        }else{
            setIngredientesFiltrados([]);
        }
    }

    return (
        <>
        <Modal size='xl' centered show={ver} onHide={handleCloseEditar}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Receta</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleActulizar}>
                <Modal.Body>
                    
                        <Row>
                            <Col xs={4}>
                                <Image rounded src={recetaID.imagen} width={340} alt="" />
                            </Col>
                            <Col xs={8}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId='formBasicEmail'>
                                            <Form.Label>Nombre</Form.Label>
                                            <Form.Control type='text' placeholder='Nombre'
                                            defaultValue={recetaID.nombre}
                                            onChange={(e)=> setRecetaUpdate(prev => ({...prev, nombre: e.target.value}))}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId='formBasicEmail'>
                                            <Form.Label>Visibilidad</Form.Label>
                                                <Form.Check
                                                    type="switch"
                                                    label="Publicar"
                                                    checked={recetaUpdate.validacion}
                                                    onChange={handlePublicar}
                                                    />
                                        </Form.Group>
                                    </Col>  
                                </Row>
                                <Row>
                                    <Form.Group controlId='formBasicEmail'>
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control
                                        as='textarea'
                                        style={{height: 'auto'}}
                                        rows={3}
                                        defaultValue={recetaID.pasosASeguir}
                                        onChange={(e)=> setRecetaUpdate(prev => ({...prev, pasosASeguir: e.target.value}))}
                                        />
                                    </Form.Group>
                                </Row>
                                <FormIngredientes ingredientesIncluidos={recetaID.ingredientes}/>
                            </Col>
                        </Row>              
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" style={{display:'block', margin:'0 auto'}}>Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
        <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical:'bottom', horizontal: 'center', }}>
            <Alerta onClose={handleErrorClose} severity={alert.type} sx={{ width: '100%', alignItems:'center' }}>
                {alert.message}
            </Alerta>
        </Snackbar>
        </>
    )
    }export default ModalEditar;