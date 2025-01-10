const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const mealsContainer = document.getElementById('meals-container');
const showAllBtn = document.getElementById('show-all-btn');

let meals = [];

async function fetchMeals(query) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await response.json();
  return data.meals || [];
}

function displayMeals(mealsToDisplay) {
  mealsContainer.innerHTML = '';
  mealsToDisplay.forEach(meal => {
    const mealCard = document.createElement('div');
    mealCard.className = 'col-md-4 mb-4';
    mealCard.innerHTML = `
      <div class="card meal-card">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions.substring(0, 100)}...</p>
          <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
        </div>
      </div>
    `;
    mealsContainer.appendChild(mealCard);
  });
}

function handleSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  fetchMeals(query).then(results => {
    meals = results;
    if (meals.length > 5) {
      displayMeals(meals.slice(0, 5));
      showAllBtn.style.display = 'block';
    } else {
      displayMeals(meals);
      showAllBtn.style.display = 'none';
    }
  });
}

searchBtn.addEventListener('click', () => {
  handleSearch();
});

showAllBtn.addEventListener('click', () => {
  displayMeals(meals);
  showAllBtn.style.display = 'none';
});

searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
