export class TropPauvreErreur extends Error {
    constructor(wallet, price) {
        super("Fonds insuffisants : tu as " + wallet + "€ mais le repas coûte " + price + "€");
        this.name = "TropPauvreErreur";
    }
}
export class User {
    constructor(id, name, wallet) {
        this.id = id;
        this.name = name;
        this.wallet = wallet;
        // Load orders from localStorage if they exist
        const savedOrders = localStorage.getItem("orders_user_" + id);
        if (savedOrders) {
            this.orders = JSON.parse(savedOrders);
        }
        else {
            this.orders = [];
        }
    }
    orderMeal(meal) {
        if (meal.price > this.wallet) {
            throw new TropPauvreErreur(this.wallet, meal.price);
        }
        this.wallet -= meal.price;
        const order = {
            id: Date.now(), // Generate a unique ID based on timestamp
            meals: [meal],
            total: meal.price,
        };
        this.orders.push(order);
        this.saveOrders();
    }
    deleteOrder(orderId) {
        const orderIndex = this.orders.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            // Refund the wallet
            this.wallet += this.orders[orderIndex].total;
            // Remove from history
            this.orders.splice(orderIndex, 1);
            this.saveOrders();
        }
    }
    saveOrders() {
        localStorage.setItem("orders_user_" + this.id, JSON.stringify(this.orders));
    }
}
