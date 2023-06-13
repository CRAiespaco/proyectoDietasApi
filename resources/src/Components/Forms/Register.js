import React, { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'Components/Forms/login.css';
import 'Components/Forms/register.css';
import Form from 'react-bootstrap/Form';
import Label from 'react-bootstrap/FormLabel';
import FormControl from "react-bootstrap/FormControl";
import Group from 'react-bootstrap/FormGroup';
import Check from 'react-bootstrap/FormCheck';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { BASE_URL } from "constant/constantes";
import { useAlert } from "hooks/useAlert";
import Snackbar from '@mui/material/Snackbar';
import Alerta from "Components/Base/Alerta";
import Collapse from 'react-bootstrap/Collapse';

function Register() {

  const { alert, handleErrorClose, mensajeError, mensajeConfirmacion } = useAlert();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pass1 = useRef(null);
  const pass2 = useRef(null);
  const [ojo1, setOjo1] = useState(faEyeSlash);
  const [ojo2, setOjo2] = useState(faEyeSlash);

  const ocultar = () => {
    if (pass1.current.type === "password") {
      setOjo1(faEye);
      pass1.current.type = "text";
    } else if (pass1.current.type === "text") {
      setOjo1(faEyeSlash);
      pass1.current.type = "password";
    }
  }
  const ocultar2 = () => {
    if (pass2.current.type === "password") {
      setOjo2(faEye);
      pass2.current.type = "text";
    } else if (pass2.current.type === "text") {
      setOjo2(faEyeSlash);
      pass2.current.type = "password";
    }
  }

  const evitarPaste = (e) => { e.preventDefault(); }

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    passwordSecond: "",
  });

  const enviarForm = async () => {
    if (form.nombre === "" || form.email === "" || form.password === "" || form.passwordSecond === "") {
      mensajeError('Los campos no pueden estar vacios.');
      return
    }

    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(form.email)) {
      mensajeError('Introduce un email correcto');
      return;
    }
    if (!/^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(form.password)) {
      mensajeError('La contraseña no es segura.');
      setOpen(true);
      return;
    }
    if (form.password !== form.passwordSecond) {
      mensajeError('La contraseña debe de coincidir');
      return;
    }
    mensajeConfirmacion('Credenciales correctas!')
    const { data } = await axios.post(`${BASE_URL}/register`, form);
    const { token, usuario } = data;
    const { name, id, email, roles } = usuario;
    const user = { name, email, id, rol: roles.name }
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('usuario', JSON.stringify(user));
    sessionStorage.setItem('recetas', JSON.stringify([]));
    navigate('/');
  }

  return (
    <React.Fragment>
      <div className="vh-100 d-flex justify-content-center fondoRegistro">
        <Form className="contenedor m-auto h-auto p-xxl-5 p-xl-5 p-sm-4 p-4 border border-success-subtle rounded-3 bg-white">
          <h1 className="tituloRegistro">Registro</h1>
          <Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Label>Usuario</Label>
            <FormControl type="text"
              placeholder="Introduce un nombre de usuario"
              onChange={e => setForm({ ...form, nombre: e.target.value })}
              required
            />
          </Group>
          <Group className="mb-3 mt-3" controlId="formBasicEmail">
            <Label>Email</Label>
            <FormControl
              type="email"
              onChange={e => setForm({ ...form, email: e.target.value })}
              required placeholder="Introduce un email" />
          </Group>
          <Group className="mb-3 cajaVer" controlId="formBasicPassword">
            <Label>Contraseña</Label>
            <FormControl
              ref={pass1}
              type="password"
              placeholder="Introduce tu contraseña"
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
            <FontAwesomeIcon icon={ojo1} className="btnVer" onClick={ocultar} />
          </Group>
          <Group className="mb-3 cajaVer" controlId="formBasicPassword">
            <Label>Confirmar Contraseña</Label>
            <FormControl
              ref={pass2}
              type="password"
              placeholder="Introduce tu contraseña otra vez"
              onChange={e => setForm({ ...form, passwordSecond: e.target.value })}
              onPaste={evitarPaste}
            />
            <FontAwesomeIcon icon={ojo2} className="btnVer" onClick={ocultar2} />
          </Group>
          <Group className="mb-3">
            <Check
              type="checkbox"
              label="Informacion contraseña"
              checked={open}
              onChange={(event) => setOpen(event.target.checked)}
            />
            <Collapse in={open}>
              <ul id="example-collapse-text">
                <li>{`Sin caracteres '{ } [ ] < > ; : &.'`}</li>
                <li>{`Contenga al menos un dígito.`}</li>
                <li>{`Contenga al menos una letra mayúscula.`}</li>
                <li>{`Contenga al menos una letra minúscula.`}</li>
                <li>{`Tenga una longitud entre 6 y 20 caracteres.`}</li>
              </ul>
            </Collapse>
          </Group>
          <Group className=" d-flex justify-content-center">
            <Button variant="success" type="button" onClick={enviarForm}>Registrarse</Button>
          </Group>
          <hr />
          <p className="text-center or">OR</p>
          <Group className="d-flex gap-5 justify-content-center mb-4">
            <Image className="iconos" width={'50px'} roundedCircle src={require('../../images/google.png')} alt="Google" />
            <FontAwesomeIcon color="#1677F2" icon={faFacebook} size="3x" className="iconos" />
          </Group>
        </Form>
      </div>
      <Snackbar open={alert.open} autoHideDuration={2000} onClose={handleErrorClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}>
        <Alerta onClose={handleErrorClose} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alerta>
      </Snackbar>
    </React.Fragment>
  )
}

export default Register;