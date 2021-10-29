// Create a class to represent the Menu
export class MenuModel {
    constructor(id, menuData) {
        // Destructure the menu data from the menuData object
        const { description, image, items, name } = menuData;
        this.id = id;
        this.description = description;
        this.image = image;
        this.items = items;
        this.name = name;
    }
}