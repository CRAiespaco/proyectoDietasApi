import React, { useState } from "react";
import './crear.css'
import {Form} from 'react-router-dom';
import Label from 'react-bootstrap/FormLabel';
import FormControl from "react-bootstrap/FormControl";
import Group from 'react-bootstrap/FormGroup';
import Check from 'react-bootstrap/FormCheck';
import Button from "react-bootstrap/Button";
import  Image  from "react-bootstrap/Image";
import Fila from 'react-bootstrap/Row';
import Columna from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useIngredientes } from "hooks/useIngredientes";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];

function Crear(){
    
    const { ingredientes } = useIngredientes();
    const [datosUsuarios,setDatosUsuarios] = useState();
    const [vista,setVista] = useState();

    const handleChange = (event,value) => {
        const codigos = value.map( valor => valor.id );
        setDatosUsuarios(codigos);
        setVista(value);
    }

    return(
        <React.Fragment>
            <div className=" w-100 d-flex justify-content-center align-content-center vh-100 fonodoCrear">
            <Form method="get" action="/crear" className="m-auto h-auto p-xxl-5 p-xl-5 p-sm-4 p-4 border border-success-subtle rounded-3 bg-white">
                <Fila className="mb-3">
                    <Group as={Columna}>
                        <Label>Edad</Label>
                        <FormControl type="number" placeholder="Pon tu edad"></FormControl>
                    </Group>
                    <Group as={Columna}>
                        <Label>Altura</Label>
                        <FormControl type="number" placeholder="Pon tu altura"></FormControl>
                    </Group>
                </Fila>
                <Fila className="mb-3">
                    <Group as={Columna}>
                        <Label>Peso</Label>
                        <FormControl type="number" placeholder="Pon tu peso"></FormControl>
                    </Group>
                    <Group as={Columna} className=" d-flex gap-3">
                        <Label>Genero</Label>
                        <Check value="chico" type="radio" name="genero" label={<FontAwesomeIcon className="munyecos" color="#1a26d6" icon={faPerson}/>}/>
                        <Check value="chica" type="radio" name="genero" label={<FontAwesomeIcon className="munyecos" color="#f00a9b" icon={faPersonDress}/>}/>
                    </Group>
                </Fila>
                <Fila>
                <Autocomplete
                    multiple
                    suppressHydrationWarning
                    options={ingredientes}
                    value={vista}
                    noOptionsText={'Sin Opciones'}
                    onChange={handleChange}
                    getOptionLabel={(option) => option.nombre}
                    renderOption={(props, option, { selected }) => (
                        <li {...props}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.nombre}
                        </li>
                    )}
                    style={{ width: 500 }}
                    renderInput={(params) => (
                        <TextField {...params} label="Alergenos/Ingredientes" placeholder="Ingredientes" />
                    )}
                    />
                </Fila>
                <Fila>
                    <Group as={Columna} className="mt-3">
                        <Label>Ganar peso o perder peso: </Label>
                        <Check type="radio" defaultChecked name="peso" value="perder" label="Perder Peso" />
                        <Check type="radio" name="peso" value="mantener" label="Mantener Peso" />
                        <Check type="radio" name="peso" value="ganar" label="Ganar Peso" />
                    </Group>
                    <Group as={Columna} className="mt-3">
                        <Label>Tipo de recetas: </Label>
                        <Check type="radio" name="tiempo" value="perder" label="radical" />
                        <Check type="radio" defaultChecked name="tiempo" value="ganar" label="moderado (recomendado)" />
                        <Check type="radio" name="tiempo" value="ganar" label="lento" />
                    </Group>
                </Fila>
                <Fila>
                    <Group>
                    <Label className="mb-0">Ejercicio Semanal: </Label>
                        <Check type="radio" defaultChecked name="ejercicio" value={1.2} label="Nada de ejercicio" />
                        <Check type="radio" name="ejercicio" value={1.4} label="1-3d/semanal" />
                        <Check type="radio" name="ejercicio" value={1.6} label="3-5d/semanal" />
                        <Check type="radio" name="ejercicio" value={1.8} label="6-7d/semanal" />
                        <Check type="radio" name="ejercicio" value={2} label="doble sesiones" />
                    </Group>
                </Fila>
                <Fila className="d-flex justify-content-center align-items-center pt-3">
                    <Button className="w-auto" variant='success'>Enviar</Button>
                </Fila>
            </Form>
            </div>
        </React.Fragment>
    )
}

export default Crear;