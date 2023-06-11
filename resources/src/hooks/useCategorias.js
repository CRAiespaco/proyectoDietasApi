import axios from "axios";
import { BASE_URL } from "constant/constantes";
import { useEffect, useState } from "react";

export function useCategorias() {
    const [categorias, setCategorias] = useState();

    const getCategorias = async () => {
        const { data } = await axios.get(`${BASE_URL}/categorias`);
        setCategorias(data);
    }

    useEffect(() => {
        getCategorias();
    }, []);

    return { categorias }
}