import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useRecetas } from 'hooks/useRecetas';
import axios from 'axios';
import { BASE_URL } from 'constant/constantes';

function ModalEliminar({show, onHide,id, actualizar}){
    //TODO: anñadir el alert.
    const eliminar = async() => {
        try{
            const { data } = await axios.delete(`${BASE_URL}/receta/${id}`);
            onHide();
            actualizar();
            console.log(data.mensaje);
        }catch(error){
            console.log(error);
        }
    }
    return(
        <>
        <Modal centered show={show} onHide={onHide}>
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