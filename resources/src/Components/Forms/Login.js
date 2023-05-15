import React, { useRef, useState } from "react";
import 'Components/Forms/login.css';
import Alert from 'react-bootstrap/Alert';
import { useNavigate} from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Label from 'react-bootstrap/FormLabel';
import FormControl from "react-bootstrap/FormControl";
import Group from 'react-bootstrap/FormGroup';
import Check from 'react-bootstrap/FormCheck';
import Button from "react-bootstrap/Button";
import  Image  from "react-bootstrap/Image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash,faEye} from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";


function Login (){

    const passwordInput = useRef(null);
    const [ojo,setOjo] = useState(faEyeSlash);
    const [valido,setValido] = useState(false);
    const navigate = useNavigate();

    const ocultar = ()=>{
        if(passwordInput.current.type==="password"){
          setOjo(faEye);
          passwordInput.current.type="text";
        }else if(passwordInput.current.type==="text"){
          setOjo(faEyeSlash);
          passwordInput.current.type="password";
        }
    }
    const mensajeError = ()=>{
      setValido(true);
      setTimeout(()=>{
        setValido(false)
      },1300)
    }
       
    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      let { correo, contrasenya, recordar } = Object.fromEntries(new FormData(event.target));
      correo.trim(); contrasenya.trim();
      const validacion = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(correo) && /^(?=.*[A-Z])(?=.*\d)[\w\W]{6,}$/.test(contrasenya);
      if(validacion){
        let usuario = JSON.parse(sessionStorage.getItem('usuario'));
        if(usuario){
          
        }else{
          console.log("Adios");
        }
        //sessionStorage.setItem('usuario',JSON.stringify({correo,contrasenya}));
        //navigate("/");
      }else{
        let usuario = JSON.parse(sessionStorage.getItem('usuario'));
      }
    };

    return(
      <React.Fragment>
      <div className="vh-100 d-flex justify-content-center fondoLogin position-relative">
        <Form onSubmit={handleSubmit} noValidate  className="contenedor m-auto h-auto p-xxl-5 p-xl-5 p-sm-4 p-4 border border-success-subtle rounded-3 bg-white ">
          <h2 className="tituloLogin">Login</h2>
          <Group className="mb-3 mt-3">
            <Label>Email</Label>
            <FormControl
            type="email"
            name="correo"
            autoComplete="current-email"
            placeholder="Introduce un email"/>
          </Group>
          <Group className="mb-3 cajaVer">
            <Label>Contraseña</Label>
              <FormControl
              ref={passwordInput}
              autoComplete="current-password"
              type="password"
              name="contrasenya"
              placeholder="Introduce tu contraseña"/>
              <FontAwesomeIcon icon={ojo} className="btnVer"  onClick={ocultar}/>
          </Group>
          <Group className="mb-3">
            <Check name="recordar" type="checkbox" label="Recordar Dispositivo"/>
          </Group>
          <Group className=" d-flex justify-content-center">
            <Button variant="success" type="submit">Iniciar Sesión</Button>
          </Group>
          <hr/>
          <p className="text-center or">O</p>
          <Group className="d-flex gap-5 justify-content-center mb-4">
            <Image className="iconos" width={'50px'} roundedCircle src={require('../../images/google.png')} alt="Google"/>
            <FontAwesomeIcon color="#1677F2" icon={faFacebook} size="3x" className="iconos"/>
          </Group>
          <Alert style={{left:240}} show={valido} variant='danger' className="position-absolute ">
            El correo o la contraseña son incorrectas
        </Alert>
        </Form>
      </div>

        </React.Fragment>
      )
}
export default Login;