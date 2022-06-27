export const makeCountryList = (svg, official) => {
  return `<div class="country-flag"><img class="flag" src="${svg}" alt="${official}" width="32" height="32"; />
    <h2 class="text">${official}</h2></div>`;
};
