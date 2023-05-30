import axios from 'axios';
import { BASE_URL } from 'constant/constantes';
import { useState } from 'react';
import { Button, Col, Container, Form, Image, Modal, Row, Table } from 'react-bootstrap';

function ModalEliminar({show, onHide,id}){
    const [ver,setVer] = useState(false);
    const eliminar = async() => {
        await axios.delete(`${BASE_URL}/ingrediente/${id}`);
        setVer(false);
    }
    const handleClose = () => setVer(false);

    useEffect(() => {
        if(show) setVer(true);
    }, [id]);

    return(
        <>
        <Modal centered show={ver} onHide={handleClose}>
            <Modal.Header className='d-flex justify-content-center align-items-center'>
                <Modal.Title>¿Seguro quieres eliminar la receta?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className='justify-content-between'>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <Button variant='danger' onClick={onHide}>Cancelar</Button>
                        </Col>
                        <Col className='d-flex justify-content-center align-items-center'>
                            <Button variant='success' onClick={eliminar} >Confirmar</Button>
                        </Col>
                        </Row>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
}export default ModalEliminar;