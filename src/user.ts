import { Meal } from "./meals.js";

export type Order = {
  id: number;
  meals: Meal[];
  total: number;
};

// Utility Type 1: Omit
// Un résumé de commande qui ne contient pas le tableau détaillé des repas
export type OrderSummary = Omit<Order, "meals">;

export class TropPauvreErreur extends Error {
  constructor(wallet: number, price: number) {
    super(
      "Fonds insuffisants : tu as " + wallet + "€ mais le repas coûte " + price + "€"
    );
    this.name = "TropPauvreErreur";
  }
}

export class User {
  id: number;
  name: string;
  wallet: number;
  orders: Order[];

  constructor(id: number, name: string, wallet: number) {
    this.id = id;
    this.name = name;
    this.wallet = wallet;
    
    // Load orders from localStorage if they exist
    const savedOrders = localStorage.getItem("orders_user_" + id);
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    } else {
      this.orders = [];
    }
  }

  orderMeal(meal: Meal) {
    if (meal.price > this.wallet) {
      throw new TropPauvreErreur(this.wallet, meal.price);
    }

    this.wallet -= meal.price;

    const order: Order = {
      id: Date.now(), // Generate a unique ID based on timestamp
      meals: [meal],
      total: meal.price,
    };

    this.orders.push(order);
    this.saveOrders();
  }

  deleteOrder(orderId: number) {
    const orderIndex = this.orders.findIndex(o => o.id === orderId);
    if (orderIndex !== -1) {
      // Refund the wallet
      this.wallet += this.orders[orderIndex].total;
      // Remove from history
      this.orders.splice(orderIndex, 1);
      this.saveOrders();
    }
  }

  private saveOrders() {
    localStorage.setItem("orders_user_" + this.id, JSON.stringify(this.orders));
  }
}

