import { useEffect, useState } from 'react';

const useFetchCountries = () => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/countries')
      .then((res) => res.json())
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCountries(response.data);
        } else {
          console.error("Error: La propiedad 'data' no es un array", response);
          setError('Error al cargar los países.');
        }
      })
      .catch((error) => {
        console.error('Error al cargar los países:', error);
        setError('Error al cargar los países.');
      });
  }, []);

  return { countries, error };
};

export default useFetchCountries;
