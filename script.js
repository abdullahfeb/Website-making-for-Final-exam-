function fetchMealData() {
  var searchTerm = document.getElementById("search-input").value.trim();
  var mealsContainer = document.getElementById("meals-container");
  var showAllBtn = document.getElementById("show-all-btn");

  document.getElementById("search-input").value = "";
  mealsContainer.innerHTML = "";
  showAllBtn.style.display = "none";

  if (!searchTerm) {
    displayMessage("Please enter a meal name to search.");
    return;
  }

  var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  fetch(url)
    .then((res) => res.json())
    .then(data => displayMeals(data.meals));
  }

function displayMeals(meals) {
  var mealsContainer = document.getElementById("meals-container");
  var showAllBtn = document.getElementById("show-all-btn");
  var initialMeals = meals.slice(0, 5);

  initialMeals.forEach((meal) => createMealCard(meal, mealsContainer));

  if (meals.length > 5) {
    showAllBtn.style.display = "block";
    showAllBtn.onclick = () => displayAllMeals(meals);
  }
}

function displayMessage(message) {
  var mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerHTML = `<p class="text-center text-danger">${message}</p>`;
}

function createMealCard(meal, container) {
  var mealCard = document.createElement("div");
  mealCard.className = "col-md-4 mb-4";

  mealCard.innerHTML = `
    <div class="card h-100">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text"><strong>Meal ID:</strong> ${meal.idMeal}</p>
        <p class="card-text">${meal.strInstructions.substring(0, 100)}...</p>
      </div>
    </div>
  `;
  container.appendChild(mealCard);
}

function displayAllMeals(allMeals) {
  var mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerHTML = ""; 

  allMeals.forEach((meal) => createMealCard(meal, mealsContainer));

  var showAllBtn = document.getElementById("show-all-btn");
  showAllBtn.style.display = "none"; 
}
document.getElementById("search-btn").addEventListener("click", fetchMealData);

