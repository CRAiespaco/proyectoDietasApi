import axios from "axios";
import { BASE_URL } from "constant/constantes";

export async function recetasUser() {

    const cargar = async () => {
        const usuario = sessionStorage.getItem('usuario');
        if (usuario) {
            const { id } = JSON.parse(usuario);
            const { data } = await axios.get(`${BASE_URL}/usuario/${id ?? 0}`);
            const { recetas } = data;
            return { recetas }
        } else {
            return false
        }
    }
    let recetas = await cargar();
    return recetas
}