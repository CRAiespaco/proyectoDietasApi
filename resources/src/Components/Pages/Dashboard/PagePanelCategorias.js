import React, { useState, useEffect ,useContext } from 'react';
import '../../../App.css';
import PagePanel from '../PagePanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Image, Modal, Row, Table } from 'react-bootstrap';
import { faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { useIngredientes } from 'hooks/useIngredientes';
import ModalEditar from 'Components/PanelIngredientes/ModalEditar';
import ModalEliminar from 'Components/PanelIngredientes/ModalEliminar';
import ModalAnyadir from 'Components/PanelIngredientes/ModalAnyadir';
import axios from 'axios';
import { BASE_URL } from 'constant/constantes';

function PagePanelCategorias(){

    const [open, setOpen] = useState(false);
    const [elimar,setElimar] = useState(false);
    const [anyadir,setAnyadir] = useState(false);
    const [categorias, setCategorias] = useState([]);

    const handleAnyadir = () => setAnyadir(true);
    const handleCloseAnyadir = () => setAnyadir(false);

    const [idActual,setIdActual] = useState(null);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEliminar = () => setElimar(true);
    const handleCloseEliminar = () => setElimar(false);

    const cargarCategorias = async() => {
        const categorias = await axios.get(`${BASE_URL}/categorias`);
        const { data } = categorias;
        setCategorias(data);
    }

    useEffect(() =>{
        cargarCategorias();
    },[])

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

    
    return(
    <React.Fragment>
        <PagePanel>
            <Container as={Col} className='d-flex flex-column justify-content-center align-items-center'>
            <Button onClick={handleAnyadir}>Añadir Categoria</Button>
            <Table striped borderless hover style={{ maxWidth:'1000px' }}>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    categorias.length !== 0 ?
                    categorias.map(categoria => (
                        <tr key={categoria.id}>
                            <td>{categoria.id}</td>
                            <td>{categoria.nombre}</td>
                            <td><Opciones abrir={()=> {
                                setOpen(true);
                                setIdActual(categoria.id);
                            }} elimar={()=>{
                                setElimar(true);
                                setIdActual(categoria.id);
                            }} id={categoria.id}/></td>
                        </tr>
                    )) :
                        <tr>
                            <td colSpan={5} style={{textAlign:'center'}}>Sin Resultados</td>
                        </tr>
                    }
                </tbody>
                    <ModalAnyadir show={anyadir}  onHide={handleCloseAnyadir} />
                    <ModalEditar show={open} onHide={handleClose} id={idActual}/>
                    <ModalEliminar show={elimar} onHide={handleCloseEliminar} id={idActual}/>
                </Table>

            </Container>
        </PagePanel>
    </React.Fragment>
    )
}export default PagePanelCategorias;