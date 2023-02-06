import React, { useRef, useState } from "react";
import 'Components/Forms/login.css';
import 'Components/Forms/register.css';
import Form from 'react-bootstrap/Form';
import Label from 'react-bootstrap/FormLabel';
import FormControl from "react-bootstrap/FormControl";
import Group from 'react-bootstrap/FormGroup';
import Check from 'react-bootstrap/FormCheck';
import Button from "react-bootstrap/Button";
import  Image  from "react-bootstrap/Image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash,faEye} from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from "@fortawesome/free-brands-svg-icons";


function Register(){

    const pass1 = useRef(null);
    const pass2 = useRef(null);
    const [ojo1,setOjo1] = useState(faEyeSlash);
    const [ojo2,setOjo2] = useState(faEyeSlash);

    const ocultar = ()=>{
        if(pass1.current.type==="password"){
          setOjo1(faEye);
          pass1.current.type="text";
        }else if(pass1.current.type==="text"){
          setOjo1(faEyeSlash);
          pass1.current.type="password";
        }   
    }
  const ocultar2 = ()=>{
    if(pass2.current.type==="password"){
      setOjo2(faEye);
      pass2.current.type="text";
    }else if(pass2.current.type==="text"){
      setOjo2(faEyeSlash);
      pass2.current.type="password";
    }
  }

    return(
        <React.Fragment>
        <div className="vh-100 d-flex justify-content-center fondoRegistro">
          <Form className="contenedor m-auto h-auto p-xxl-5 p-xl-5 p-sm-4 p-4 border border-success-subtle rounded-3 bg-white">
            <h1 className="tituloRegistro">Registro</h1>
            <Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Label>Usuario</Label>
              <FormControl type="text" placeholder="Introduce un nombre de usuario" />
            </Group>
            <Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Label>Email</Label>
              <FormControl type="email" placeholder="Introduce un email" />
            </Group>
            <Group className="mb-3 cajaVer" controlId="formBasicPassword">
              <Label>Contraseña</Label>
              <FormControl ref={pass1} type="password" placeholder="Introduce tu contraseña"/>
              <FontAwesomeIcon icon={ojo1} className="btnVer"  onClick={ocultar}/>
            </Group>
            <Group className="mb-3 cajaVer" controlId="formBasicPassword">
              <Label>Confirmar Contraseña</Label>
              <FormControl ref={pass2} type="password" placeholder="Introduce tu contraseña otra vez"/>
              <FontAwesomeIcon icon={ojo2} className="btnVer"  onClick={ocultar2}/>
            </Group>
            <Group className="mb-3">
              <Check type="checkbox" label="Recordar Dispositivo"/>
            </Group>
            <Group className=" d-flex justify-content-center">
              <Button variant="success" type="button">Registrarse</Button>
            </Group>
            <hr/>
            <p className="text-center or">OR</p>
            <Group className="d-flex gap-5 justify-content-center mb-4">
              <Image className="iconos" width={'50px'} roundedCircle src={require('../../images/google.png')} alt="Google"/>
              <FontAwesomeIcon color="#1677F2" icon={faFacebook} size="3x" className="iconos"/>
            </Group>
          </Form>
          
        </div>
          </React.Fragment>
    )
}

export default Register;