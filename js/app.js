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
            <h5 class="card-title">${food.strMeal.slice(0, 50)}</h5>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-primary">Details</button>
            <button class="btn btn-primary">Cart</button>
        </div>
     </div>
    `;
    seeResult.appendChild(foodDetails);
  });
};

productCategory("Beef");

loadData();
