
/**
 * Genera una Identificador unico
 * @returns Devuelve un Numero
 */
const generarUUID = () => {
  var d = new Date().getTime();
  var uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

const upperFirstLetter = (texto)=>{
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const traerDatos = async(url)=>{
  const respuesta = await fetch(url);
  const datos = respuesta.json();
  return datos;
}

export { generarUUID, upperFirstLetter, traerDatos };