const loadData = () => {
  const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.categories));
};

const displayData = (drinks) => {
  const category = document.getElementById("category");
  drinks.map((drink) => {
    const singleCategory = document.createElement("div");
    singleCategory.classList.add("category-container");
    singleCategory.innerHTML = `
    <span onclick="productCategory('${drink.strCategory}')" id="category" class="category">${drink.strCategory}</span>
    `;
    category.appendChild(singleCategory);
  });
};

const productCategory = (category_name) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category_name}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => dsiplayFood(data.meals));
};

const dsiplayFood = (foods) => {
  const seeResult = document.getElementById("see-result");
  seeResult.innerHTML = "";
  foods.forEach((food) => {
    // console.log(food);
    const foodDetails = document.createElement("div");
    foodDetails.classList.add("col");
    foodDetails.innerHTML = `
    <div class="card food-card">
        <img
            src="${food.strMealThumb}"
            class="drink-card-img"
            alt="..."
        />
        <div class="card-body">
            <h5 class="card-title">${food.strMeal.slice(0, 50)}</h5>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-primary">Details</button>
            <button class="btn btn-primary" onclick="cartFoods(${
              food.idMeal
            })">Cart</button>
        </div>
     </div>
    `;
    seeResult.appendChild(foodDetails);
  });
};

const searchFoodApi = (mealName) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySearchResult(data.meals));
};

const displaySearchResult = (meals) => {
  const seeResult = document.getElementById("see-result");
  seeResult.innerHTML = "";
  meals.forEach((meal) => {
    // console.log(meal);
    const foodDetails = document.createElement("div");
    foodDetails.classList.add("col");
    foodDetails.innerHTML = `
    <div class="card food-card">
        <img
            src="${meal.strMealThumb}"
            class="drink-card-img"
            alt="..."
        />
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal.slice(0, 50)}</h5>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-primary">Details</button>
            <button class="btn btn-primary" onclick="cartFoods(${
              meal.idMeal
            })">Cart</button>
        </div>
     </div>
    `;
    seeResult.appendChild(foodDetails);
  });
};

const searchButton = () => {
  const searchField = document.getElementById("search-field").value;
  searchFoodApi(searchField);
};

const cartFoods = (id) => {
  const cartNumberEle = document.getElementById("cart-number");
  const cartNumberStr = cartNumberEle.innerText;
  const CartNumberInt = parseInt(cartNumberStr);
  const cartNumber = CartNumberInt + 1;
  cartNumberEle.innerText = cartNumber;
};

productCategory("Beef");

loadData();
