import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { useRecetas } from 'hooks/useRecetas';
import axios from 'axios';
import { BASE_URL } from 'constant/constantes';
import { useAlert } from 'hooks/useAlert';
import Snackbar from '@mui/material/Snackbar';
import Alerta from "Components/Base/Alerta";

function ModalEliminar({ show, onHide, id, actualizar }) {
    const { alert, handleErrorClose, mensajeError } = useAlert();

    const eliminar = async () => {
        try {
            const { data } = await axios.delete(`${BASE_URL}/receta/${id}`);
            onHide();
            actualizar();
        } catch (error) {
            mensajeError(error);
        }
    }
    return (
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
            <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
                <Alerta onClose={handleErrorClose} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.message}
                </Alerta>
            </Snackbar>
        </>
    )
} export default ModalEliminar;