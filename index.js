// Function to fetch data and update the HTML
let countries;
const resultList = document.getElementById("result-list");
const newResultList = document.getElementById("new-result-list");
newButton.style.display = "none";
function getCountries(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      countries = data;
      // Get the <ul> element to display the results

      // Clear any previous results
      resultList.innerHTML = "";

      // Iterate through the results and create list items
      countries.forEach((result) => {
        const listItem = document.createElement("li");
        listItem.textContent = `ID: ${result.id}, Name: ${result.name}, Default Currency: ${result.default_currency_id}`;
        resultList.appendChild(listItem);
      });

      // Show the "Fetch New Data" button
      const newButton = document.getElementById("newButton");
      newButton.style.display = "inline-block";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Function to fetch categories based on SITE_ID
function getCategories(siteId) {
  const categoriesUrl = `https://api.mercadolibre.com/sites/${siteId}/categories`;
  fetch(categoriesUrl)
    .then((response) => response.json())
    .then((data) => {
      resultList.style.display = "none";
      data.forEach((result) => {
        const listItem = document.createElement("li");
        listItem.textContent = `ID: ${result.id}, Name: ${result.name}`;
        newResultList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Function to initialize the app
function initializeApp() {
  const fetchButton = document.getElementById("fetchButton");
  const newButton = document.getElementById("newButton");

  fetchButton.addEventListener("click", () => {
    const defaultUrl = "https://api.mercadolibre.com/sites";
    getCountries(defaultUrl);
    fetchButton.style.display = "none";
  });

  newButton.addEventListener("click", () => {
    const colombiaObject = countries.find(
      (country) => country.name === "Colombia"
    );
    const siteIdToFetch = colombiaObject.id; // Replace with the desired SITE_ID
    getCategories(siteIdToFetch);
  });
}

// Initialize the app
initializeApp();
