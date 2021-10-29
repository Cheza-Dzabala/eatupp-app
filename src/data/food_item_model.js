export class FoodItemModel {
    constructor(id, data) {
        const { name, price, description, image } = data;
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}