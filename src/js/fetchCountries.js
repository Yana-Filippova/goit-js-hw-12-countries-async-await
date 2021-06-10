const BASE_URL = 'https://restcountries.eu/rest/v2/name';

// function fetchCountries(name) {
//   return fetch(`${BASE_URL}/${name}`).then(response => response.json());
// }

// export default { fetchCountries };

async function fetchCountries(name) {
  const response = await fetch(`${BASE_URL}/${name}`);
  const newCountry = await response.json();

  return newCountry;
}

export default { fetchCountries };
