import { Meal, fetchMeals } from "./meals.js";
import { User, Order, TropPauvreErreur } from "./user.js";

async function main() {
  const meals = await fetchMeals();
  console.log("Repas récupérés :", meals);

  const user = new User(1, "Bob", 30);
  console.log("Utilisateur :", user.name, "- Portefeuille :", user.wallet + "€");

  const mealList = document.getElementById("mealList");

  if (!mealList) return;

  for (const meal of meals) {
    const li = document.createElement("li");
    li.textContent = meal.name + " - " + meal.price + "€ ";

    const button = document.createElement("button");
    button.textContent = "Commander";
    button.addEventListener("click", () => {
      try {
        user.orderMeal(meal);
        console.log("Commande OK :", meal.name, "- Reste :", user.wallet + "€");
      } catch (error) {
        if (error instanceof TropPauvreErreur) {
          console.error(error.message);
        }
      }
    });

    li.appendChild(button);
    mealList.appendChild(li);
  }
}

main();

