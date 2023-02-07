import React, { useRef, useState } from "react";
import 'Components/Forms/login.css';
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

    const ocultar = ()=>{
        if(passwordInput.current.type==="password"){
          setOjo(faEye);
          passwordInput.current.type="text";
        }else if(passwordInput.current.type==="text"){
          setOjo(faEyeSlash);
          passwordInput.current.type="password";
        }
    }
    const Navigate = useNavigate();

    const [form,setForm] = useState({
      email:"",
      password:"",
    });
       
    const handleSubmit = () => {
      if(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(form.email) && /^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(form.password)){
        Navigate('/');
      }
    };

    return(
      <React.Fragment>
      <div className="vh-100 d-flex justify-content-center fondoLogin">
        <Form validated className="contenedor m-auto h-auto p-xxl-5 p-xl-5 p-sm-4 p-4 border border-success-subtle rounded-3 bg-white was-validated">
          <h2 className="tituloLogin">Login</h2>
          <Group className="mb-3 mt-3">
            <Label>Email</Label>
            <FormControl
            isValid={/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(form.email)}
            isInvalid={!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(form.email)}
            required
            onChange={e=>setForm({...form,email:e.target.value})} 
            defaultValue={form.email} 
            type="email" 
            placeholder="Introduce un email"/>
            <FormControl.Feedback type="invalid">¡Correo Inválido!</FormControl.Feedback>
            <FormControl.Feedback type="valid">¡Correo Correcto!</FormControl.Feedback>
          </Group>
          <Group className="mb-3 cajaVer">
            <Label>Contraseña</Label>
              <FormControl
              isValid={/^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(form.password)}
              isInvalid={!/^(?!.*[{}[\]<>;:&])(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/.test(form.password)}
              ref={passwordInput}
              defaultValue={form.password}
              onChange={e=>setForm({...form,password:e.target.value})}
              type="password"
              placeholder="Introduce tu contraseña"/>
              <FontAwesomeIcon icon={ojo} className="btnVer"  onClick={ocultar}/>
            <FormControl.Feedback type="invalid">¡Contraseña Inválido!</FormControl.Feedback>
            <FormControl.Feedback type="valid">¡Contraseña Correcta!</FormControl.Feedback>
          </Group>
          <Group className="mb-3">
            <Check type="checkbox" label="Recordar Dispositivo"/>
          </Group>
          <Group className=" d-flex justify-content-center">
            <Button variant="success" onClick={handleSubmit}>Iniciar Sesión</Button>
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
export default Login;