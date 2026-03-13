import { Meal, fetchMeals } from "./meals.js";
import { User, Order } from "./user.js";

async function main() {
  const meals = await fetchMeals();
  console.log("Repas récupérés :", meals);
}

main();
