export class OrderItem {
    constructor(id, quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}

export class Order {
    constructor(id, orderData) {
        // Destructure the menu data from the menuData object
        const { date, items, status, user } = orderData;
        this.id = id;
        this.date = date;
        this.items = items;
        this.status = status;
        this.user = user;
    }
}