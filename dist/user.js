// Classe User
export class User {
    constructor(id, name, wallet) {
        this.id = id;
        this.name = name;
        this.wallet = wallet;
        this.orders = [];
    }
}
