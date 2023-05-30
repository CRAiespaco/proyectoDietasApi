import React, { useState, useContext } from 'react';
import '../../../App.css';
import PagePanel from '../PagePanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Image, Modal, Row, Table } from 'react-bootstrap';
import { faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { useIngredientes } from 'hooks/useIngredientes';
import ModalEditar from 'Components/PanelIngredientes/ModalEditar';
import ModalEliminar from 'Components/PanelIngredientes/ModalEliminar';

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
                    </tr>
                </thead>
                <tbody>
                    {
                    ingredientes.length !== 0 ?
                    ingredientes.map(ingrediente => (
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
                        </tr>
                    )) :
                        <tr>
                            <td colSpan={5} style={{textAlign:'center'}}>Sin Resultados</td>
                        </tr>
                    }
                </tbody>
                    <ModalEditar show={open} onHide={handleClose} id={idActual}/>
                    <ModalEliminar show={elimar} onHide={handleCloseEliminar} id={idActual}/>
                </Table>

            </Container>
        </PagePanel>
    </React.Fragment>
    )
}export default PagePanelIngredientes;