import React, { useState, createContext } from "react";
export const recetasProvedor = createContext();

function RecetasProvider({ children }) {

    const [recetas, setRecetas] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
    const [ingredientesIncluidos, setIngredientesIncluidos] = useState([]);

    let datos = { recetas, setRecetas, ingredientesIncluidos, setIngredientesIncluidos, ingredientes, setIngredientes };

    return (
        <recetasProvedor.Provider value={datos}>
            {children}
        </recetasProvedor.Provider>
    )
} export default RecetasProvider;