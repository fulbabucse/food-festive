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
            <h5 class="card-title">${food.strMeal.slice(0, 40)}</h5>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <button class="details-btn" onclick="foodDetails(${
              food.idMeal
            })" data-bs-toggle="modal"
            data-bs-target="#detailModal">Details</button>
            <button class="cart-btn" onclick="cartFoods(${
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
            <h5 class="card-title">${meal.strMeal.slice(0, 40)}</h5>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <button class="details-btn" onclick="foodDetails(${
              meal.idMeal
            })" data-bs-toggle="modal"
            data-bs-target="#detailModal">Details</button>
            <button class="cart-btn" onclick="cartFoods(${
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

const cartFoods = (foodId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFoodCart(data.meals));

  const cartNumberEle = document.getElementById("cart-number");
  const cartNumberStr = cartNumberEle.innerText;
  const CartNumberInt = parseInt(cartNumberStr);
  const cartNumber = CartNumberInt + 1;
  cartNumberEle.innerText = cartNumber;
};

const displayFoodCart = (foodCart) => {
  const foodCartList = document.getElementById("food-cart-list");
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <th scope="row"><img src="${
      foodCart[0].strMealThumb
    }" class="cart-image" alt="" srcset="" /></th>
    <td class="text-center">${foodCart[0].strMeal.slice(0, 50)}</td>
    <td class="text-center">${foodCart[0].strCategory}</td>
    <td class="text-center">1</td>
  `;

  foodCartList.appendChild(tr);
};

const foodDetails = (foodId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFoodDetails(data.meals));
};

const displayFoodDetails = (foodDetails) => {
  document.getElementById("detailsModal").innerText =
    foodDetails[0].strMeal.slice(0, 45);
  const foodDetail = document.getElementById("foodDetails");
  foodDetail.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
    <img src="${
      foodDetails[0].strMealThumb
    }" class="food-details" alt="" srcset="" />
    <p class="mt-2"><strong>Instruction: </strong>${foodDetails[0].strInstructions.slice(
      0,
      200
    )}</p>
    <a href="${
      foodDetails[0].strYoutube
    }" class="text-decoration-none" target="_blank">Youtube Recipe link</a>
  `;
  foodDetail.appendChild(div);
};

productCategory("Beef");

loadData();
