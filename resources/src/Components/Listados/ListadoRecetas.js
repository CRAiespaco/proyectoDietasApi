import React, { useState,useEffect } from 'react';
import Tarjeta from 'Components/Base/Tarjeta';
import { generarUUID } from 'Functions/Funciones';
import 'Components/Listados/ListadoRecetas.css'

function Carrusel({titulo,numTarjetas}){

  const [width, setWidth] = useState(window.innerWidth);
  const [num,setNum] = useState(numTarjetas);


  const rango = (num)=>{
    const array = []
    for(let i=0;i<num;i++){
      array.push(i);
    }
    return array;
  }
  
  const array = rango(num);

  
  useEffect(() => {
    const handleResize = () => {setWidth(window.innerWidth);};

    window.addEventListener("resize", handleResize);

    return () => {window.removeEventListener("resize", handleResize);}
    
  }, []);

  const redimensionar = (e) =>{console.log(e)}

    useEffect(() => {
      if (width <= 1250) {
        setNum(3);
      } else {
        setNum(numTarjetas)
      }
    }, [width]);
  

  return (
    <React.Fragment>
    <h1 className='tituloCarrusel'>{titulo}</h1>
    <div className=' d-flex justify-content-center mb-4 flex-wrap gap-5' onResize={redimensionar}>
      {array.map(()=><Tarjeta titulo={'hola'} imagen={'../../images/fondo.jpg'} totalNutricional={'a'}  key={generarUUID()} />)}
    </div>
    </React.Fragment>
  );
}

export default Carrusel;
