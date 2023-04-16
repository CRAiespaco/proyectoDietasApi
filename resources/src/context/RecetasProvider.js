import React, {useState, createContext} from "react";
export const recetasProvedor = createContext();

function RecetasProvider({children}){

    const [recetas,setRecetas] = useState([]);

    let datos = { recetas, setRecetas };

    return(
        <recetasProvedor.Provider value={datos}>
            {children}
        </recetasProvedor.Provider>
    )
}export default RecetasProvider;