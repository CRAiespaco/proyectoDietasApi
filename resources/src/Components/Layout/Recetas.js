import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import 'Components/Layout/recetas.css'
import Tarjeta from "Components/Base/Tarjeta";
import 'Components/Layout/recetasCustom.css'
import { generarUUID } from "Functions/Funciones";
import LoadingTarjeta from "Components/Base/LoadingTarjeta";
import { useCategorias } from "hooks/useCategorias";
import { useIngredientes } from "hooks/useIngredientes";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { BASE_URL } from "constant/constantes";

function Recetas() {

  const [recetasFiltro, setRecetasFiltro] = useState([]);
  const { categorias } = useCategorias();
  const { ingredientes } = useIngredientes();
  const [search, setSearch] = useState("");
  const [buscador, setBuscador] = useState([]);

  const [filtro, setFiltro] = useState({
    categorias: [],
    ingredientes: [],
    valoracion: [],
  });

  const cargarRecetas = async () => {
    const { data } = await axios.post(`${BASE_URL}/receta/filtro`, filtro);
    setRecetasFiltro(data);
    setBuscador(data);
  }

  const valoraciones = ['1', '2', '3', '4', '5'];

  const handleChange = (event) => {
    let valorActual = event.target.value
    setSearch(valorActual);
    let arrayObjeto = recetasFiltro.filter(objeto => Object.keys(objeto).some(clave => String(objeto[clave]).toLowerCase().includes(valorActual.toLowerCase())))
    setBuscador(arrayObjeto);
  }

  const handleCategorias = (event, value) => {
    const codigos = value.map(valor => valor.id);
    setFiltro(prev => ({ ...prev, categorias: codigos }));
  }

  const hadleIngredientes = (event, value) => {
    const codigos = value.map(valor => valor.id);
    setFiltro(prev => ({ ...prev, ingredientes: codigos }));
  }

  useEffect(() => {
    cargarRecetas();
    setBuscador(recetasFiltro);
  }, [filtro, search])

  useEffect(() => {
    cargarRecetas();
    setBuscador(recetasFiltro);
  }, [])

  return (
    <React.Fragment>
      <div className="w-100 wrapper mt-5" style={{ "backgroundColor": "#b3b3b3" }}>
        <div className="row w-100 my-3 my-lg-4">
          <div className="col-11"><input type="search" value={search} onChange={handleChange} className="form-control p-3" placeholder="Buscar una receta aqui ..." /></div>
          <div className="col-1"><Button className="btn-success p-3">Buscar</Button></div>
        </div>
        <div className="d-flex gap-3 my-3 flex-wrap">
          {categorias && <Autocomplete
            multiple
            //disableCloseOnSelect
            options={categorias}
            sx={{ width: '160px' }}
            onChange={handleCategorias}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => <TextField {...params} label='categorias' />}
          />}
          <Autocomplete
            multiple
            //disableCloseOnSelect
            options={valoraciones}
            sx={{ width: '160px' }}
            onChange={(event, value) => setFiltro(prev => ({ ...prev, valoracion: value }))}
            renderInput={(params) => <TextField {...params} label='puntuacion' />}
          />
          {ingredientes && <Autocomplete
            multiple
            //disableCloseOnSelect
            options={ingredientes}
            sx={{ width: '160px' }}
            onChange={hadleIngredientes}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => <TextField {...params} label='ingredientes' />}
          />}
        </div>
        <div className="recetasListadas">
          {recetasFiltro.length !== 0 ?
            buscador.map(tarjeta => <Tarjeta key={generarUUID()} datos={tarjeta} />) :
            [...Array(5)].map(() => <LoadingTarjeta key={generarUUID()} />)}
        </div>
      </div>
    </React.Fragment>
  )
}

export default Recetas;