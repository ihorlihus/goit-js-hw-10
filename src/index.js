import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { makeCountryList } from './makeCountryList';
import { makeCountryCard } from './makeCountryCard';

const debounce = require('lodash.debounce');
const form = document.querySelector('#search-box');
const profileCountry = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
console.log();

const DEBOUNCE_DELAY = 300;

form.addEventListener(
  'input',
  debounce(event => {
    event.preventDefault();
    if (form.value === '') {
      event.preventDefault();
    } else {
      fetchCountries(form.value.trim())
        .then(name => {
          countryList.innerHTML = '';
          profileCountry.innerHTML = '';
          if (name.length > 10) {
            Notify.info(
              'Too many matches found. Please enter a more specific name.'
            );
            return;
          }
          if (name.length > 1 && name.length < 11) {
            name.map(name => {
              const {
                flags: { svg },
                name: { official },
              } = name;
              countryList.insertAdjacentHTML(
                'beforeend',
                makeCountryList(svg, official)
              );
            });
          }
          if (name.length === 1) {
            profileCountry.innerHTML = makeCountryCard(name);
          }
        })
        .catch(error => {
          Notify.failure('Oops, there is no country with that name');
        });
    }
  }, DEBOUNCE_DELAY)
);
