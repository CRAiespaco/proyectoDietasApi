import React, { useState,useEffect } from 'react';
import Tarjeta from 'Components/Base/Tarjeta';
import 'Components/Listados/ListadoRecetas.css'
import axios from 'axios';

function Carrusel({titulo,numTarjetas}){

  const [width, setWidth] = useState(window.innerWidth);
  const [num,setNum] = useState(numTarjetas);


  
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

    
  const [datos,setDatos] = useState(null);


  const cargarRecetas = async()=>{
    const recetas = await axios.get('http://localhost:8090/api/receta');
    setDatos(recetas.data);
  }

  const cargarTarjetas = ()=>{
    if(datos!==null){
      return (datos.map((tarjeta,indice)=>{
        if(indice<=num){
          return<Tarjeta key={indice} titulo={tarjeta.nombre} imagen={tarjeta.imagen}/>
        }
    }))
    }

  }

  useEffect(()=>{
    cargarRecetas();
  },[])

  

  return (
    <React.Fragment>
    <h1 className='tituloCarrusel'>{titulo}</h1>
    <div className=' d-flex justify-content-center mb-4 flex-wrap gap-5' onResize={redimensionar}>
      {cargarTarjetas()}
    </div>
    </React.Fragment>
  );
}

export default Carrusel;
