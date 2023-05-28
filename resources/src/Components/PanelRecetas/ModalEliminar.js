import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

function ModalEliminar({show, onHide}){
    const eliminar = () => {
        console.log(idActual);
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