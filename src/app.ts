import { Meal, fetchMeals } from "./meals.js";
import { User, Order } from "./user.js";

async function main() {
  const meals = await fetchMeals();
  console.log("Repas récupérés :", meals);

  const mealList = document.getElementById("mealList");

  if (!mealList) return;

  for (const meal of meals) {
    const li = document.createElement("li");
    li.textContent = meal.name + " - " + meal.price + "€ ";

    const button = document.createElement("button");
    button.textContent = "Commander";
    button.addEventListener("click", () => {
      console.log("Commande :", meal.name);
    });

    li.appendChild(button);
    mealList.appendChild(li);
  }
}

main();
