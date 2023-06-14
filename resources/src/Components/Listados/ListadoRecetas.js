import React, { useState,useEffect } from 'react';
import Tarjeta from 'Components/Base/Tarjeta';
import 'Components/Listados/ListadoRecetas.css'
import { generarUUID } from 'Functions/Funciones';
import LoadingTarjeta from 'Components/Base/LoadingTarjeta';
import { useRecetas } from 'hooks/useRecetas';

function Carrusel({titulo,numTarjetas}){

  const [width, setWidth] = useState(window.innerWidth);
  const [num,setNum] = useState(numTarjetas);
  const { recetas } = useRecetas();


  
  useEffect(() => {
    const handleResize = () => {setWidth(window.innerWidth);};

    window.addEventListener("resize", handleResize);

    return () => {window.removeEventListener("resize", handleResize);}
    
  }, []);

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
    <div className=' d-flex justify-content-center mb-4 flex-wrap gap-5'>
      { recetas.length !== 0 ? recetas.slice(0,num+1).map(receta => <Tarjeta key={generarUUID()} datos={receta} />) : 
      [...Array(num+1)].map(()=> <LoadingTarjeta key={generarUUID()} />) }
    </div>
    </React.Fragment>
  );
}

export default Carrusel;
