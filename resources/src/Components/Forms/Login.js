import React, { useRef, useState } from "react";
import 'Components/Forms/login.css';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Label from 'react-bootstrap/FormLabel';
import FormControl from "react-bootstrap/FormControl";
import Group from 'react-bootstrap/FormGroup';
import Check from 'react-bootstrap/FormCheck';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Collapse from 'react-bootstrap/Collapse';
import Snackbar from '@mui/material/Snackbar';
import Alerta from "Components/Base/Alerta";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useAlert } from "hooks/useAlert";
import axios from "axios";
import { BASE_URL } from "constant/constantes";


function Login() {

  const { alert, handleErrorClose, mensajeError, mensajeConfirmacion } = useAlert();
  const [open, setOpen] = useState(false);
  const passwordInput = useRef(null);
  const [ojo, setOjo] = useState(faEyeSlash);
  const navigate = useNavigate();

  const ocultar = () => {
    if (passwordInput.current.type === "password") {
      setOjo(faEye);
      passwordInput.current.type = "text";
    } else if (passwordInput.current.type === "text") {
      setOjo(faEyeSlash);
      passwordInput.current.type = "password";
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    let { correo, contrasenya } = Object.fromEntries(new FormData(event.target));
    correo = correo.trim();
    contrasenya = contrasenya.trim();
    const validacion = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(correo) && /^(?=.*[A-Z])(?=.*\d)[\w\W]{6,}$/.test(contrasenya);
    if (validacion) {
      const { data } = await axios.post(`${BASE_URL}/login`, { email: correo, password: contrasenya });
      const { token, user, mensaje } = data;
      const { name, id, email, roles } = user;
      const usuario = { name, email, id, rol: roles[0].name }
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('usuario', JSON.stringify(usuario));
      let usuarioID = await axios.get(`${BASE_URL}/usuario/${id}`);
      let recetasUser = usuarioID.data.recetas.map(receta => receta.id);
      sessionStorage.setItem('recetas', JSON.stringify(recetasUser));
      mensajeConfirmacion(mensaje);
      navigate('/')
    } else {
      mensajeError("Correo o Contraseña Incorrectos");
      setOpen(true);
    }
  };

  return (
    <React.Fragment>
      <div className="vh-100 d-flex justify-content-center fondoLogin position-relative">
        <Form onSubmit={handleSubmit} noValidate className="contenedor m-auto h-auto p-xxl-5 p-xl-5 p-sm-4 p-4 border border-success-subtle rounded-3 bg-white ">
          <h2 className="tituloLogin">Login</h2>
          <Group className="mb-3 mt-3">
            <Label>Email</Label>
            <FormControl
              type="email"
              name="correo"
              autoComplete="current-email"
              placeholder="Introduce un email" />
          </Group>
          <Group className="mb-3 cajaVer">
            <Label>Contraseña</Label>
            <FormControl
              ref={passwordInput}
              autoComplete="current-password"
              type="password"
              name="contrasenya"
              placeholder="Introduce tu contraseña" />
            <FontAwesomeIcon icon={ojo} className="btnVer" onClick={ocultar} />
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
            <Button variant="success" type="submit">Iniciar Sesión</Button>
          </Group>
          <hr />
          <p className="text-center or">O</p>
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
export default Login;