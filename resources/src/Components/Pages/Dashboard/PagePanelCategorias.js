import React, { useState, useEffect } from 'react';
import '../../../App.css';
import PagePanel from '../PagePanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Form, Table } from 'react-bootstrap';
import { faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import ModalEliminar from 'Components/PanelCategorias/ModalEliminar';
import axios from 'axios';
import { BASE_URL } from 'constant/constantes';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function PagePanelCategorias(){

    const [open, setOpen] = useState(false);
    const [elimar,setElimar] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [categoriaNueva, setCategoriaNueva] = useState('');
    const [categoriaEdit,setCategoriaEdit] = useState('');
    const [idActual,setIdActual] = useState(null);

    const handleCloseEliminar = () => setElimar(false);

    const handleClick = async() => {
        if(categoriaNueva === '') return;
        const respuesta = await axios.post(`${BASE_URL}/categoria`,{ nombre:categoriaNueva });
        console.log(respuesta)
        cargarCategorias();
    }

    const cargarCategorias = async() => {
        const categorias = await axios.get(`${BASE_URL}/categorias`);
        const { data } = categorias;
        setCategorias(data);
    }

    const handleCancelar = () => {
        setOpen(false);
        setIdActual(null);
    }

    const handleActualizarCategoria = async()=>{
        await axios.put(`${BASE_URL}/categoria/${idActual}`, {nombre: categoriaEdit});
        cargarCategorias();
        handleCancelar();
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
                    <>
                    {categorias.map(categoria => (
                        <tr key={categoria.id}>
                            <td>{categoria.id}</td>
                            {open && idActual === categoria.id ? <td>
                                <Form.Control
                                value={categoriaEdit}
                                onChange={event => setCategoriaEdit(event.target.value)}
                                />
                            </td> :
                            <td>{categoria.nombre}</td>
                            }
                            {
                            open && idActual === categoria.id ?
                            <td>
                                <ButtonGroup>
                                    <Button onClick={handleActualizarCategoria}>Confirmar</Button>
                                    <Button onClick={handleCancelar} variant='danger'>Cancelar</Button>
                                </ButtonGroup>
                            </td>:

                            <td><Opciones abrir={()=> {
                                setIdActual(categoria.id);
                                setCategoriaEdit(categoria.nombre);
                                setOpen(true);
                            }} elimar={()=>{
                                setElimar(true);
                                setIdActual(categoria.id);
                            }} id={categoria.id}/></td>
                            }
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={2}>
                            <Form.Control
                            type='text'
                            value={categoriaNueva}
                            onChange={event => setCategoriaNueva(event.target.value) }
                            />
                        </td>
                        <td>
                            <Button onClick={handleClick}>
                                Añadir Categoria
                            </Button>
                        </td>
                    </tr></> :
                        <tr>
                            <td colSpan={5} style={{textAlign:'center'}}>Sin Resultados</td>
                        </tr>
                    }
                </tbody>
                    <ModalEliminar show={elimar} onHide={handleCloseEliminar} id={idActual} actualizar={cargarCategorias}/>
                </Table>

            </Container>
        </PagePanel>
    </React.Fragment>
    )
}export default PagePanelCategorias;