import axios from 'axios';
import { BASE_URL } from 'constant/constantes';
import { recetasProvedor } from 'context/RecetasProvider';
import { useEffect, useContext } from 'react';

export function useIngredientes() {

  const { ingredientes, setIngredientes } = useContext(recetasProvedor);

  const cargarIngredientes = async () => {
    const { data } = await axios.get(`${BASE_URL}/ingredientes`);
    setIngredientes(data);
  }

  useEffect(() => {
    if (ingredientes.length === 0) {
      cargarIngredientes();
    }
  }, [])
  return { ingredientes, cargarIngredientes }
}

