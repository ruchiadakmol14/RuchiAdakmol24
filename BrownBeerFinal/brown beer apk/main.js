const resultHeading = document.getElementById("meals");
const random = document.getElementById("random");
const meals = document.getElementById("result-heading");
const search = document.getElementById("search__field");
const submit = document.getElementById("submit");

//Search and fetch API
function searchMeal(e) {
  e.preventDefault();
  // Clear Single Meal
  const term = search.value;
  // check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        search.value = "";

        if (data.meals === null) {
          resultHeading.innerHTML = "";
          meals.innerHTML = "";
          resultHeading.innerHTML = "<h1>No Elements Found!</h1>";
        } else {
          resultHeading.innerHTML = `<h1><--Search result for '${term}':<h1>`;
          meals.innerHTML = data.meals
            .map(
              meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        <div class="meal-info" data-mealID ="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `
            )
            .join("");
        }
      });
  } else {
    console.log();
  }
}

// Get Random Meal
function getRandomMeal() {
  meals.innerHTML = "";
  resultHeading.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Add Meal to DOM
function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  console.log(ingredients);
  resultHeading.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal} />
        <div class="single-meal-info">
            ${meal.strCategory ? `<h2>Category: ${meal.strCategory}</h2>` : ""}
            ${meal.strArea ? `<h2>Origin: ${meal.strArea}</h2>` : ""}
        </div>
        <div class="main">
            <p class="instructions">${meal.strInstructions}</p>
            <h1>Ingredients</h1>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
            </ul>
        </div>
        <span>${meal.strYoutube}</span>
        <a href="${meal.strYoutube}Youtube link: />
    </div>
    `;
}

// Fetch Meal by Id function
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// Event Listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);
meals.addEventListener("click", e => {
  const mealInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealID");
    console.log(mealID);
    getMealById(mealID);
  }
});
