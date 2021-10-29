import food4 from './../images/food/food5.jpg';

class Special {
    constructor(name, description, image, price, id) {
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
        this.id = id;
    }
}
export const specialOne = new Special('Pasta A La King', 'Creamy pasta with basil and stuff.', food4, 'ML 6,000.00', 1);