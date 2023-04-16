import React, { useContext, useEffect, useState } from "react";
import 'Components/Layout/detalles.css';
import 'Components/Layout/customDetalles.css'
import EstrellasPrueba from "Components/Base/EstrellasPrueba";
import Carrusel from "Components/Listados/ListadoRecetas";
import { generarUUID } from "Functions/Funciones";
import { useParams } from "react-router-dom";
import { recetasProvedor } from "context/RecetasProvider";
import { upperFirstLetter } from "Functions/Funciones";
import axios from "axios";
import Ingredientes from "Components/Base/Ingredientes";
function DetallesReceta(){
  const { id } = useParams();
  const { recetas } = useContext(recetasProvedor);
  const [receta,setReceta] = useState({});

  const cargarReceta = async()=>{
    let recetaEncontrada = recetas.find(receta => receta.id ==  parseInt(id));

    console.log(recetaEncontrada);

    if(recetaEncontrada===undefined){
      let recetaBase = await axios.get(`http://localhost/api/receta/${id}`);
      setReceta(recetaBase.data);
    }else{
      setReceta(recetaEncontrada);
    }
  }

  useEffect(()=>{
    cargarReceta();
  },[id])



console.log(receta);

    return(
        <React.Fragment>
<div style={{ marginTop:'120px' }}>
<h2 className="textoCentrado mt-3">{receta.nombre}</h2>
<div className="container mt-4">
  <div className="row">
    <div className="col-lg-8 text11-content">
      <img src={receta.imagen} className="img-fluid radius-image" alt="" />
      <h2 className="title mt-3">Ingredientes</h2>
      <blockquote className="quote my-sm-3 my-3 p-3">
        <ol>
          <Ingredientes ingredientes={receta.ingredientes} /> 
        </ol>
       <h5>Valor Nutricional <span className="negrita">1500kcal</span></h5>
      </blockquote>
      <h2>Instrucciones.</h2>
      <p className="mb-3">{receta.pasosASeguir}</p>
      <div className="item mb-5">
        <Carrusel titulo={'Tal vez te interesa.'} numTarjetas={2}/>
      </div>
    </div>
    <div className="sidebar-side col-lg-4 pl-lg-5 mt-lg-0 mt-5 ">
      <aside className="sidebar">
        {/* Popular Post Widget*/}
        <div className="sidebar-widget popular-posts">
          <div className="sidebar-title">
            <h4>Recetas Recientes</h4>
          </div>
          <article className="post">
            <img src={require('images/fondo.jpg')} alt="" />
            <div className="text">
              <a href="blog-single.html">Sed do eiusmod tempor ut </a>
              <div className="post-info">Feb 11, 2021</div>
            </div>
          </article>
          <article className="post">
            <img src={require('images/fondo.jpg')} alt="" />
            <div className="text">
              <a href="blog-single.html">Et dolore magna aliqua </a>
              <div className="post-info">Feb 22, 2021</div>
            </div>
          </article>
          <article className="post">
            <img src={require('images/fondo.jpg')} alt="" />
            <div className="text">
              <a href="blog-single.html">Amkmm Ut enim ad minim</a>
              <div className="post-info">Feb 13, 2021</div>
            </div>
          </article>
          <article className="post">
            <img src={require('images/fondo.jpg')} alt="" />
            <div className="text">
              <a href="blog-single.html">Amkmm Ut enim ad minim</a>
              <div className="post-info">Feb 14, 2021</div>
            </div>
          </article>
        </div>
        {/* Category Widget */}
        <div className="sidebar-widget sidebar-blog-category">
          <div className="sidebar-title">
            <h4>Categorias</h4>
          </div>
          <ul className="blog-cat">
            <li><a href="#link">Foodie<label>4</label></a></li>
            <li><a href="#link">Cook<label>8</label></a></li>
            <li><a href="#link">Recipes<label>8</label></a></li>
            <li><a href="#link">Guides<label>3</label></a></li>
          </ul>
        </div>

        {/*Los Widgets */}
        <div className="sidebar-widget about-widget">
          <div className="sidebar-title">
            <h4>Valoración</h4>
          </div>
          <div className="d-flex">

            <div className="right-ab-block bg-grey">
              <EstrellasPrueba key={generarUUID()}/>
            </div>
          </div>
        </div>
        {/* ads Widget */}
        <div className="sidebar-widget">
          <div className="sidebar-title">
            <h4>Ads</h4>
          </div>
          <div className="ads-img-ab">
            <a href="blog.html">
              <img src="assets/images/ads.jpg" className="img-fluid" alt="" />
            </a>
          </div>
        </div>
        {/* social media Widget*/}
        <div className="sidebar-widget social-style">
          <div className="sidebar-title">
            <h4>Social Media</h4>
          </div>
          <a href="#facebook">
            <i className="fab fa-facebook-f" />
            Facebook
          </a>
          <a href="#twitter">
            <i className="fab fa-twitter" />
            Twitter
          </a>
          <a href="#instagram">
            <i className="fab fa-instagram" />
            Instagram
          </a>
          <a href="#googleplus">
            <i className="fab fa-google-plus-g" />
            Google Plus
          </a>
          <a href="#youtube">
            <i className="fab fa-youtube" />
            Youtube
          </a>
          <a href="#viemo">
            <i className="fab fa-vimeo-v" />
            Viemo
          </a>
        </div>
      </aside>
    </div>
  </div>
</div>
</div>
        </React.Fragment>
    )
}

export default DetallesReceta;