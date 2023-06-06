import React, { useState, useContext } from 'react';
import '../../../App.css';
import PagePanel from '../PagePanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Image, Modal, Row, Table } from 'react-bootstrap';
import { faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { recetasProvedor } from 'context/RecetasProvider';
import { useRecetas } from 'hooks/useRecetas';
import ModalEliminar from 'Components/PanelRecetas/ModalEliminar';
import ModalEditar from 'Components/PanelRecetas/ModalEditar';

function PagePanelRecetas(){

    const [edit, setEdit] = useState(false);
    const [elimar,setElimar] = useState(false);
    const [idActual,setIdActual] = useState(null);
    const { recetas, cargarRecetas } = useRecetas();

    const actulizarReceta = () => {

    }

    const handleEdit = (id) => {
        setIdActual(id);
        setEdit(true);
    }
    const handleCloseEdit = () => setEdit(false);

    const handleEliminar = (id) => {
        setElimar(true);
        setIdActual(id);
    }
    const handleCloseEliminar = () => {
        setElimar(false);
        setIdActual(null);
    }



    function Opciones({editar,eliminar}){
        return(
        <div className='d-inline-flex gap-3 w-25'>
            <Button variant='primary' onClick={editar} className='d-flex align-items-center gap-2'>
                Editar
                <FontAwesomeIcon size='xl' icon={faPenToSquare} />
            </Button>
            <Button variant='danger' onClick={eliminar} className='d-flex align-items-center gap-2'>
                Eliminar
                <FontAwesomeIcon size='2x' icon={faTrashCan} />
            </Button>
        </div>)
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
                    </tr>
                </thead>
                <tbody>
                    {
                        recetas.length !== 0 ?
                        recetas.map(receta => (
                            <tr key={receta.id}>
                                <td>{receta.id}</td>
                                <td>{receta.nombre}</td>
                                <td><img width={60} src={receta.imagen} /></td>
                                <td><Opciones editar={() => handleEdit(receta.id)} eliminar={()=>handleEliminar(receta.id)} /></td>
                            </tr>
                        )) :
                        <tr>
                        <td colSpan={5} style={{textAlign:'center'}}>Sin Resultados</td>
                    </tr>
                    }
                </tbody>
                    <ModalEditar show={edit} onHide={handleCloseEdit} id={idActual} />
                    <ModalEliminar show={elimar} onHide={handleCloseEliminar} id={idActual} actualizar={cargarRecetas} />
                </Table>

            </Container>
        </PagePanel>
    </React.Fragment>
    )
}export default PagePanelRecetas;