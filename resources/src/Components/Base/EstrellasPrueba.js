import React, { useState } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import 'Components/Base/Estrellas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generarUUID } from 'Functions/Funciones';

const EstrellasPrueba = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={generarUUID()}>
            <input
              className='btnEstrella'
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FontAwesomeIcon 
                icon={faStar}
              className="estrella"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default EstrellasPrueba;