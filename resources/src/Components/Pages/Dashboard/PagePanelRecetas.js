import React, { useState, useContext } from 'react';
import '../../../App.css';
import PagePanel from '../PagePanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Image, Modal, Row, Table } from 'react-bootstrap';
import { faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { recetasProvedor } from 'context/RecetasProvider';
import { useRecetas } from 'hooks/useRecetas';

function PagePanelRecetas(){

    const [open, setOpen] = useState(false);
    const [elimar,setElimar] = useState(false);
    const [idActual,setIdActual] = useState(null);
    const { recetas } = useRecetas();

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
                        recetas.length !== 0 ?
                        recetas.map(receta => (
                            <>
                            <tr key={receta.id}>
                                <td>{receta.id}</td>
                                <td>{receta.nombre}</td>
                                <td><Image width={60} src={receta.imagen} /></td>
                                <td><Opciones abrir={()=> {
                                    setOpen(true);
                                    setIdActual(receta.id);
                                }} elimar={()=>{
                                    setElimar(true);
                                    setIdActual(receta.id);
                                }} id={receta.id}/></td>
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
}export default PagePanelRecetas;