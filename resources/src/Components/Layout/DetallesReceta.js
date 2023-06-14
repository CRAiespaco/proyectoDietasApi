import React, { useContext, useEffect, useState } from "react";
import 'Components/Layout/detalles.css';
import 'Components/Layout/customDetalles.css'
import EstrellasPrueba from "Components/Base/EstrellasPrueba";
import Carrusel from "Components/Listados/ListadoRecetas";
import { generarUUID } from "Functions/Funciones";
import { useParams } from "react-router-dom";
import { recetasProvedor } from "context/RecetasProvider";
import axios from "axios";
import Ingredientes from "Components/Base/Ingredientes";
import { BASE_URL } from "constant/constantes";
import Post from "Components/Base/Post";
import { useRecetas } from "hooks/useRecetas";
function DetallesReceta() {
  const { id } = useParams();
  const { recetas } = useRecetas();
  const [receta, setReceta] = useState({});

  const cargarReceta = async () => {
    let recetaEncontrada = recetas.find(receta => receta.id == parseInt(id));

    if (recetaEncontrada === undefined) {
      let recetaBase = await axios.get(`${BASE_URL}/receta/${id}`);
      setReceta(recetaBase.data);
    } else {
      setReceta(recetaEncontrada);
    }
  }

  useEffect(() => {
    cargarReceta();
    window.scrollTo(0, 0);
  }, [id])

  return (
    <React.Fragment>
      <div style={{ marginTop: '120px' }}>
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
                <h5>Valor Nutricional<span className="negrita">1500kcal</span></h5>
              </blockquote>
              <h2>Instrucciones.</h2>
              <p className="mb-3">{receta.pasosASeguir}</p>
              <div className="item mb-5">
                <Carrusel titulo={'Tal vez te interesa.'} numTarjetas={1} />
              </div>
            </div>
            <div className="sidebar-side col-lg-4 pl-lg-5 mt-lg-0 mt-5 ">
              <aside className="sidebar">
                {/* Popular Post Widget*/}
                <div className="sidebar-widget popular-posts">
                  <div className="sidebar-title">
                    <h4>Recetas Recientes</h4>
                  </div>
                  {
                    recetas.map((receta, indice) => {
                      if (indice < 3) {
                        return (<Post datos={receta} />)
                      }
                    })
                  }
                </div>
                {/* Category Widget */}
                <div className="sidebar-widget sidebar-blog-category">
                  <div className="sidebar-title">
                    <h4>Categorias</h4>
                  </div>
                  <ul className="blog-cat">
                    {
                      receta.categorias ?
                        receta.categorias.map(categoria => <li>{categoria.nombre}</li>)
                        : <p>Sin Categorias</p>
                    }
                  </ul>
                </div>
                {/*Los Widgets */}
                <div className="sidebar-widget about-widget">
                  <div className="sidebar-title">
                    <h4>Valoración</h4>
                  </div>
                  <div className="d-flex">

                    <div className="right-ab-block bg-grey">
                      <EstrellasPrueba key={generarUUID()} />
                    </div>
                  </div>
                </div>
                {/* social media Widget*/}
                <div className="sidebar-widget social-style">
                  <div className="sidebar-title">
                    <h4>Social Media</h4>
                  </div>
                  <a target='_blank' href="https://www.facebook.com/people/Mi-Dieta-Dieta/pfbid0Kbj4PYTtNtK73wpdFhkNHpty3MnUaRQkYRuhugW2H26QctGdfGi8XnD4AvYyJmF2l/">
                    <i className="fab fa-facebook-f" />
                    Facebook
                  </a>
                  <a target='_blank' href="https://twitter.com/MiDieta_oficial">
                    <i className="fab fa-twitter" />
                    Twitter
                  </a>
                  <a target='_blank' href="https://www.instagram.com/midietad/">
                    <i className="fab fa-instagram" />
                    Instagram
                  </a>
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
              </aside>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default DetallesReceta;