let inputValue = document.querySelector("#input-value");
let searchButton = document.querySelector("#search");
let mealsDiv = document.querySelector("#meals");
let modal = document.querySelector(".modal");
let modalIcon = document.querySelector("#icon");
let error = document.querySelector("#error");
let container = document.querySelector(".container");

try {
  searchButton.addEventListener("click", async () => {
    error.innerHTML = "";

    if (inputValue.value === "") {
      error.innerHTML = "Meal does not exists";

      return;
    }

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue.value}`
    );
    const data = await res.json();

    getMeals(data.meals);
  });
} catch (error) {
  console.log(error);
}

const getMeals = (listMeals) => {
  document.getElementById("meals").innerHTML = "";

  if (listMeals === null) {
    error.innerHTML = "Meal does not exists";
    return;
  }

  listMeals.forEach((meal) => {
    let newsDiv = document.createElement("div");
    newsDiv.classList.add("container__meals__card");

    let img = document.createElement("img");
    img.setAttribute("src", meal.strMealThumb);
    img.setAttribute("alt", meal.strMeal);
    newsDiv.appendChild(img);

    let title = document.createElement("p");
    title.innerHTML = meal.strMeal;
    newsDiv.appendChild(title);

    let button = document.createElement("button");
    button.innerHTML = "MORE";
    button.classList.add("button");
    newsDiv.appendChild(button);

    mealsDiv.appendChild(newsDiv);

    try {
      button.addEventListener("click", async () => {
        modal.style.display = "block";
        modalIcon.style.display = "block";
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
        );
        const data = await res.json();

        getMoreOption(data.meals);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

const getMoreOption = (moreOption) => {
  moreOption.forEach((mealDescription) => {
    let divMoreOption = document.createElement("div");

    let title = document.createElement("p");
    title.innerHTML = mealDescription.strMeal;
    divMoreOption.appendChild(title);

    let description = document.createElement("p");
    description.innerHTML = mealDescription.strInstructions;
    description.classList.add("scorll");
    divMoreOption.appendChild(description);

    let youtoube = document.createElement("a");
    youtoube.href = mealDescription.strYoutube;
    youtoube.innerHTML = "Link";
    youtoube.target = "_blank";
    divMoreOption.appendChild(youtoube);

    modal.appendChild(divMoreOption);
  });
};

modalIcon.addEventListener("click", () => {
  modal.style.display = "none";
  modalIcon.style.display = "none";
  modal.innerHTML = "";
});
