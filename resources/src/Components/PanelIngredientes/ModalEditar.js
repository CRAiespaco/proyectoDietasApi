import axios from 'axios';
import Alerta from 'Components/Base/Alerta';
import Snackbar from '@mui/material/Snackbar';
import { BASE_URL } from 'constant/constantes';
import { useAlert} from 'hooks/useAlert';
import { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Image, Modal, Row, Table } from 'react-bootstrap';

function ModalEditar({show, onHide, id}){

    const [ver,setVer] = useState(false);
    const [ingredienteID,setIngredienteID] = useState({
        nombre: '',
        imagen: ''
    });
    const { alert, handleErrorClose, mensajeConfirmacion, mensajeError  } = useAlert();


    const cargarIngrediente = async () => {
        const response = await fetch(`${BASE_URL}/ingrediente/${id}`);
        const data = await response.json();
        setIngredienteID(data);
        setVer(true);
    }

    const handleCloseEditar = () => setVer(false);

    useEffect(()=> {
        if(id!==null && show) cargarIngrediente();
    },[id]);
    
    const handleSubmit = async (event) => {
        try{
            event.preventDefault();
            const datos = await axios.put(`${BASE_URL}/ingrediente/${id}`, ingredienteID);
            mensajeConfirmacion(datos.data.mensaje);
        }catch(error){
            mensajeError(error);
        }

    }

    return (
        <>
        <Modal centered show={ver} onHide={handleCloseEditar}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Ingrediente</Modal.Title>
            </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Row>
                            <Col xs={6}>
                                <Image src={ingredienteID.imagen} width={190} rounded />
                            </Col>
                            <Col xs={6}>
                            <Row>
                                <Form.Group controlId='formBasicEmail'>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Nombre'
                                            value={ingredienteID.nombre}
                                            onChange={(e)=> setIngredienteID(prev => ({...prev, nombre: e.target.value})) }
                                        />
                                </Form.Group>
                                <Form.Group controlId='formBasicEmail' style={{marginTop:10}}>
                                        <Form.Label>Imagen</Form.Label>
                                        <Form.Control
                                        type='text'
                                        style={{width:'auto'}}
                                        placeholder='Nombre'
                                        value={ingredienteID.imagen}
                                        onChange={(e) => setIngredienteID(prev => ({...prev, imagen: e.target.value}))}
                                        />
                                </Form.Group>
                            </Row>
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