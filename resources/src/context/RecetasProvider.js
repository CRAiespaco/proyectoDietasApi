import React, { useState, createContext } from "react";
export const recetasProvedor = createContext();

function RecetasProvider({children}){

    const [recetas,setRecetas] = useState([]);
    const [ingredientesIncluidos,setIngredientesIncluidos] = useState([]);

    let datos = { recetas, setRecetas, ingredientesIncluidos, setIngredientesIncluidos };

    return(
        <recetasProvedor.Provider value={datos}>
            {children}
        </recetasProvedor.Provider>
    )
}export default RecetasProvider;