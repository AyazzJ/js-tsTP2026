import { Meal, fetchMeals } from "./meals.js";
import { User, Order, TropPauvreErreur } from "./user.js";

async function main() {
  const meals = await fetchMeals();
  const user = new User(1, "Bob", 30);

  const mealList = document.getElementById("mealList");
  const walletDisplay = document.getElementById("walletDisplay");
  const historyList = document.getElementById("historyList");
  const totalSpentDisplay = document.getElementById("totalSpentDisplay");

  if (!mealList || !walletDisplay || !historyList || !totalSpentDisplay) return;

  function updateUI() {
    // 1. Mettre à jour le portefeuille
    walletDisplay!.textContent = `${user.wallet} €`;

    // 2. Calculer le total dépensé
    const totalSpent = user.orders.reduce((sum, order) => sum + order.total, 0);
    totalSpentDisplay!.textContent = `${totalSpent} €`;

    // 3. Mettre à jour l'historique
    historyList!.innerHTML = "";
    
    if (user.orders.length === 0) {
      historyList!.innerHTML = `<li class="empty-state">Aucune commande récente</li>`;
    }

    user.orders.forEach(order => {
      const li = document.createElement("li");
      
      const mealNames = order.meals.map(m => m.name).join(", ");
      
      li.innerHTML = `
        <div class="history-header">
          <span class="order-id">#${order.id}</span>
          <span class="order-total">${order.total} €</span>
        </div>
        <div class="order-items">${mealNames}</div>
      `;

      const btnDelete = document.createElement("button");
      btnDelete.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
        </svg>
        Supprimer
      `;
      btnDelete.className = "delete-btn";
      btnDelete.addEventListener("click", () => {
        user.deleteOrder(order.id);
        updateUI(); // Rafraîchir l'interface après suppression
      });

      li.appendChild(btnDelete);
      historyList!.appendChild(li);
    });
  }

  // Initialiser les repas
  for (const meal of meals) {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="meal-info">
        <span class="meal-name">${meal.name}</span>
        <span class="meal-price">${meal.price} €</span>
      </div>
    `;

    const button = document.createElement("button");
    button.className = "btn-order";
    button.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <path d="M16 10a4 4 0 0 1-8 0"></path>
      </svg>
      Commander
    `;
    button.addEventListener("click", () => {
      try {
        user.orderMeal(meal);
        updateUI(); // Rafraîchir l'interface après commande
      } catch (error) {
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
}

main();

