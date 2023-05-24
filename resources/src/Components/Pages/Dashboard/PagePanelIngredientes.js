import React, { useState, useContext } from 'react';
import '../../../App.css';
import PagePanel from '../PagePanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Image, Modal, Row, Table } from 'react-bootstrap';
import { faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { useIngredientes } from 'hooks/useIngredientes';

function PagePanelIngredientes(){

    const [open, setOpen] = useState(false);
    const [elimar,setElimar] = useState(false);
    const [idActual,setIdActual] = useState(null);
    const { ingredientes } = useIngredientes();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEliminar = () => setElimar(true);
    const handleCloseEliminar = () => setElimar(false);

    function Opciones({abrir,elimar}){
        return(
        <div className='d-inline-flex gap-3 w-25'>
            <Button variant='primary' onClick={abrir} className='d-flex align-items-center gap-2'>
                Editar
                <FontAwesomeIcon size='xl' icon={faPenToSquare} />
            </Button>
            <Button variant='danger' onClick={elimar} className='d-flex align-items-center gap-2'>
                Eliminar
                <FontAwesomeIcon size='2x' icon={faTrashCan} />
            </Button>
        </div>)
    }

    //Modal para editar PagePanelRecetas
    function ModalEditar({show, onHide}){
        return (
            <>
            <Modal centered show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Receta</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId='formBasicEmail'>
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type='text' placeholder='Nombre' />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='formBasicEmail'>
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control as='textarea' rows={3} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
            </Modal>
            </>
        )
    }

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
    }
    
    return(
    <React.Fragment>
        <PagePanel>
            <Container as={Col} className='d-flex flex-column justify-content-center align-items-center'>
            <Table striped borderless hover style={{ maxWidth:'1000px' }}>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                    <th>Aprovar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    ingredientes.length !== 0 ?
                    ingredientes.map(ingrediente => (
                        <>
                            <tr key={ingrediente.id}>
                                <td>{ingrediente.id}</td>
                                <td>{ingrediente.nombre}</td>
                                <td><Image width={60} src={ingrediente.imagen} /></td>
                                <td><Opciones abrir={()=> {
                                    setOpen(true);
                                    setIdActual(ingrediente.id);
                                }} elimar={()=>{
                                    setElimar(true);
                                    setIdActual(ingrediente.id);
                                }} id={ingrediente.id}/></td>
                                <td><Form.Check type='checkbox' label='aprobar'/></td>
                            </tr>
                        </>
                    )) :
                        <tr>
                            <td colSpan={5} style={{textAlign:'center'}}>Sin Resultados</td>
                        </tr>
                    }
                </tbody>
                    <ModalEditar show={open} onHide={handleClose}/>
                    <ModalEliminar show={elimar} onHide={handleCloseEliminar}/>
                </Table>

            </Container>
        </PagePanel>
    </React.Fragment>
    )
}export default PagePanelIngredientes;