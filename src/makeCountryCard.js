export const makeCountryCard = name => {
  for (const {
    flags: { svg: flag },
    name: { official: countryName },
    capital: [countryCap],
    languages: { ...lang },
    population: peoples,
  } of name) {
    const langs = Object.values(lang);
    return `
    <div class="country-flag">
      <img class="flag" src="${flag}" alt="${countryName}" width="32" height="32";/>
      <h1>${countryName}</h1>
    </div>
    <h3>Capital: <span class="text">${countryCap}</span></h3>
    <h3>Population: <span class="text">${peoples}</span></h3>
    <h3>languages: <span class="text">${[langs]}</span></h3>`;
  }
};
