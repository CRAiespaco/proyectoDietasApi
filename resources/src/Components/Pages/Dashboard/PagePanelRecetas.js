import React from 'react';
import '../../../App.css';
import PagePanel from '../PagePanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Image, Table } from 'react-bootstrap';
import { faPenToSquare, faTrashCan} from '@fortawesome/free-solid-svg-icons';

function PagePanelRecetas(){

    function Opciones(){
        return(
        <div className='d-inline-flex gap-3 w-25'>
            <Button variant='primary' className='d-flex align-items-center gap-2'>
                Editar
                <FontAwesomeIcon size='xl' icon={faPenToSquare} />
            </Button>
            <Button variant='danger' className='d-flex align-items-center gap-2'>
                Eliminar
                <FontAwesomeIcon size='2x' icon={faTrashCan} />
            </Button>
        </div>)
    }
    
    return(
    <React.Fragment>
        <PagePanel>
            <Container as={Col} className='d-flex justify-content-center align-items-center'>
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
                    {/*/////PLANTILLA PARA HACER EL MAP////////*/}
                    <tr>
                        <td>1</td>
                        <td>Patatas</td>
                        <td><Image width={50} src={require('../../../images/facebook.png')} /> </td>
                        <td> <Opciones/> </td>
                    </tr>
                    {/*/////PLANTILLA PARA HACER EL MAP////////*/}
                    {/*/////PLANTILLA EN CASO DE SER VACIO/////*/}
                    <tr>
                        <td colSpan={5} style={{textAlign:'center'}}>Sin Resultados</td>
                    </tr>
                    {/*/////PLANTILLA EN CASO DE SER VACIO/////*/}
                </tbody>
                </Table>
            </Container>
        </PagePanel>
    </React.Fragment>
    )
}export default PagePanelRecetas;