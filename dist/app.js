var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchMeals } from "./meals.js";
import { User, TropPauvreErreur } from "./user.js";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const meals = yield fetchMeals();
        console.log("Repas récupérés :", meals);
        const user = new User(1, "Bob", 30);
        console.log("Utilisateur :", user.name, "- Portefeuille :", user.wallet + "€");
        const mealList = document.getElementById("mealList");
        if (!mealList)
            return;
        for (const meal of meals) {
            const li = document.createElement("li");
            li.textContent = meal.name + " - " + meal.price + "€ ";
            const button = document.createElement("button");
            button.textContent = "Commander";
            button.addEventListener("click", () => {
                try {
                    user.orderMeal(meal);
                    console.log("Commande OK :", meal.name, "- Reste :", user.wallet + "€");
                }
                catch (error) {
                    if (error instanceof TropPauvreErreur) {
                        console.error(error.message);
                    }
                }
            });
            li.appendChild(button);
            mealList.appendChild(li);
        }
    });
}
main();
