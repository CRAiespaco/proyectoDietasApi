import axios from 'axios';
import { BASE_URL } from 'constant/constantes';
import { recetasProvedor } from 'context/RecetasProvider';
import { useEffect, useContext } from 'react';

export function useRecetas() {

  const { recetas, setRecetas } = useContext(recetasProvedor);

  const cargarRecetas = async () => {
    const recetas = await axios.get(`${BASE_URL}/recetas`);
    setRecetas(recetas.data);
  }

  useEffect(() => {
    if (recetas.length === 0) {
      cargarRecetas();
    }
  }, [])
  return { recetas, cargarRecetas }
}

