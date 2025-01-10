function fetchMealData() {
  // Get search term
  const searchTerm = document.getElementById("searchBox").value.trim();
  document.getElementById("searchBox").value = "";

  if (!searchTerm) {
    alert("Please enter a meal name.");
    return;
  }

  // API URL
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

  // Fetch data from API
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data));
}

function displayMeals(data) {
  const displayArea = document.getElementById("displayArea");
  displayArea.innerHTML = ""; // Clear previous results

  if (!data.meals) {
    displayArea.innerHTML = "<p>No meals found. Please try another search.</p>";
    return;
  }

  const meals = data.meals.slice(0, 5); // Show only the first 5 results initially
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal-card");

    mealDiv.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
      <p>${meal.strInstructions.substring(0, 100)}...</p>
    `;

    displayArea.appendChild(mealDiv);
  });

  if (data.meals.length > 5) {
    const showAllButton = document.createElement("button");
    showAllButton.textContent = "SHOW ALL";
    showAllButton.onclick = () => displayAllMeals(data.meals);
    displayArea.appendChild(showAllButton);
  }
}

function displayAllMeals(allMeals) {
  const displayArea = document.getElementById("displayArea");
  displayArea.innerHTML = ""; // Clear current results

  allMeals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal-card");

    mealDiv.innerHTML = `
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
      <p>${meal.strInstructions.substring(0, 100)}...</p>
    `;

    displayArea.appendChild(mealDiv);
  });
}
