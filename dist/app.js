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
        const user = new User(1, "Bob", 30);
        const mealList = document.getElementById("mealList");
        const walletDisplay = document.getElementById("walletDisplay");
        const historyList = document.getElementById("historyList");
        const totalSpentDisplay = document.getElementById("totalSpentDisplay");
        if (!mealList || !walletDisplay || !historyList || !totalSpentDisplay)
            return;
        function updateUI() {
            // 1. Mettre à jour le portefeuille
            walletDisplay.textContent = `Portefeuille : ${user.wallet}€`;
            // 2. Calculer le total dépensé
            const totalSpent = user.orders.reduce((sum, order) => sum + order.total, 0);
            totalSpentDisplay.textContent = `Total dépensé : ${totalSpent}€`;
            // 3. Mettre à jour l'historique
            historyList.innerHTML = "";
            user.orders.forEach(order => {
                const li = document.createElement("li");
                const mealNames = order.meals.map(m => m.name).join(", ");
                li.textContent = `Commande #${order.id} : ${mealNames} - ${order.total}€ `;
                const btnDelete = document.createElement("button");
                btnDelete.textContent = "Supprimer";
                btnDelete.className = "delete-btn";
                btnDelete.addEventListener("click", () => {
                    user.deleteOrder(order.id);
                    updateUI(); // Rafraîchir l'interface après suppression
                });
                li.appendChild(btnDelete);
                historyList.appendChild(li);
            });
        }
        // Initialiser les repas
        for (const meal of meals) {
            const li = document.createElement("li");
            li.textContent = `${meal.name} - ${meal.price}€ `;
            const button = document.createElement("button");
            button.textContent = "Commander";
            button.addEventListener("click", () => {
                try {
                    user.orderMeal(meal);
                    updateUI(); // Rafraîchir l'interface après commande
                }
                catch (error) {
                    if (error instanceof TropPauvreErreur) {
                        alert(error.message); // On affiche l'erreur à l'utilisateur
                    }
                }
            });
            li.appendChild(button);
            mealList.appendChild(li);
        }
        // Affichage initial
        updateUI();
    });
}
main();
