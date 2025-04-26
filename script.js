const countryInfoContainer = document.getElementById('country-info');
const searchButton = document.getElementById('search-button');
const countryInput = document.getElementById('country-input');

searchButton.addEventListener('click', () => {
  const countryName = countryInput.value.trim();

  if (!countryName) {
    countryInfoContainer.innerHTML = '<p>Please enter a country name.</p>';
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => {
      if (!res.ok) throw new Error('Country not found');
      return res.json();
    })
    .then((data) => {
      const country = data[0];
      countryInfoContainer.innerHTML = ''; // Clear previous results

      const card = document.createElement('div');
      card.className = 'country-card';

      card.innerHTML = `
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
        <div class="card-text">
          <h2 class="card-title">${country.name.common}</h2>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Capital:</strong> ${country.capital}</p>
        </div>
      `;

      countryInfoContainer.appendChild(card);
    })
    .catch((error) => {
      console.error('Error fetching country:', error);
      countryInfoContainer.innerHTML = '<p>Country not found. Please try again.</p>';
    });
});
