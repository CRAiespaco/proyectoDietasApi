import React, { useState,useEffect, useContext } from 'react';
import Tarjeta from 'Components/Base/Tarjeta';
import 'Components/Listados/ListadoRecetas.css'
import axios from 'axios';
import { recetasProvedor } from 'context/RecetasProvider';
import { generarUUID } from 'Functions/Funciones';

function Carrusel({titulo,numTarjetas}){

  const [width, setWidth] = useState(window.innerWidth);
  const [num,setNum] = useState(numTarjetas);
  const { setRecetas } = useContext(recetasProvedor);


  
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

    
  const [datos,setDatos] = useState(null);


  const cargarRecetas = async()=>{
    const recetas = await axios.get('http://localhost/api/receta');
    setDatos(recetas.data);
    setRecetas(recetas.data);
  }

  const cargarTarjetas = ()=>{
    if(datos!==null){
      return (datos.map((tarjeta,indice)=>{
        if(indice<=num){
          return<Tarjeta key={indice} datos={tarjeta}/>
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
    <div className=' d-flex justify-content-center mb-4 flex-wrap gap-5'>
      { datos !== null ? datos.slice(0,num+1).map(receta => <Tarjeta key={generarUUID()} datos={receta} />) : <div>Cargando....</div>}
    </div>
    </React.Fragment>
  );
}

export default Carrusel;
