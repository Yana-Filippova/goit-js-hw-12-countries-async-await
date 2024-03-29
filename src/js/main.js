import API from './fetchCountries.js';
import countryListTpl from '../templates/country-list.hbs';
import countryCardTpl from '../templates/country-card.hbs';
import getRefs from './get-refs.js';

import { alert, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash.debounce');

const refs = getRefs();
let searchCountry = '';

refs.inputRef.addEventListener(
  'input',
  debounce(() => {
    onSearch();
  }, 500),
);

async function onSearch() {
  try {
    searchCountry = refs.inputRef.value;

    if (!searchCountry) {
      clearMarkup();
    }

    const countries = await API.fetchCountries(searchCountry);
    if (countries.length > 10) {
      clearMarkup();
      specifyQuery();
    } else if (countries.length >= 2 && countries.length <= 10) {
      clearMarkup();
      renderMarkup(countryListTpl, countries);
    } else if (countries.length === 1) {
      clearMarkup();
      renderMarkup(countryCardTpl, countries[0]);
    } else {
      clearMarkup();
      showAlert();
    }
  } catch (error) {
    clearMarkup();
    console.log(error);
  }
}

function renderMarkup(template, countries) {
  const markup = template(countries);
  refs.cardContainer.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.cardContainer.innerHTML = '';
}

function showAlert() {
  alert({
    text: 'No matches found! Please enter correct data!',
    delay: 1000,
  });
}

function specifyQuery() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
    delay: 1000,
  });
}
