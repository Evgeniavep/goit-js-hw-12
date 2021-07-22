import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const tooManyMatches = 'Too many matches found. Please enter a more specific name.';
const noCountry = 'Oops, there is no country with that name, buy the globe';

import list from './templates/list.hbs';
import card from './templates/card.hbs';
import { fetchCountries } from './fetchCountries.js'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const search = document.getElementById('search-box');
const countriesList = document.querySelector('.country-list');

search.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

function onInputText(evt) {
    const inputValue = evt.target.value;
    fetchCountries(inputValue)
        .then(countries => {
            if (countries.length > 10) {
                addMessage('info', tooManyMatches)
            }

            if (countries.length === 1) {
                renderCountryCard(card(countries));
            }

            if (countries.length >= 2 && countries.length <= 10) {
                renderCountryCard(list(countries));
            }
        })
        .catch(error => addMessage('failure', noCountry));
    
}

function renderCountryCard(markup = '') {
  countriesList.innerHTML = markup;
}

function addMessage(typeMessage, message) {
  Notiflix.Notify[typeMessage](message);
}