import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const debounce = require('lodash.debounce');
const form = document.querySelector('#search-box');
const profileCountry = document.querySelector('.country-info');
console.log();

const DEBOUNCE_DELAY = 300;

form.addEventListener(
  'input',
  debounce(event => {
    event.preventDefault();
    if (form.value === '') {
      event.preventDefault();
      console.log('Must be value');
    } else {
      fetchCountries(form.value.trim()).then(name => {
        profileCountry.innerHTML = makeCountryCard(name);
      });
    }
  }, 900)
);

function makeCountryCard(name) {
  for (const {
    flags: { svg: flag },
    name: { official: countryName },
    capital: [countryCap],
    languages: { ...lang },
    population: peoples,
  } of name) {
    const langs = Object.values(lang);
    console.log(langs);
    return `
    <img src="${flag}" alt="${countryName}" width="32" />
    <h2>${countryName}</h2>
    <h3>Capital: <span>${countryCap}</span></h3>
    <h3>Population: <span>${peoples}</span></h3>
    <h3>languages: <span>${[langs]}</span></h3>`;
  }
}
