/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { getDoc, doc } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { MenuModel } from '../data/menu';
import { FoodItemModel } from '../data/food_item_model';
import { CartContext } from '../context/cart-context';

function Menu(props) {
    const [orderItems, setOrderItems] = useContext(CartContext);
    const firestore = useFirestore();
    const storage = getStorage();
    const { menuId } = useParams();

    const [menu, setMenu] = useState(null);
    const [menuItems, setMenuItems] = useState([]);

    const getMenu = async () => {
        const menuRef = doc(firestore, 'menu', menuId);
        const menuDoc = await getDoc(menuRef);
        const menu = new MenuModel(menuDoc.id, menuDoc.data());
        const imageRef = ref(storage, menu.image);
        const image = await getDownloadURL(imageRef);
        menu.image = image;
        menu.items.forEach(async item => {
            const itemDoc = await getDoc(item);
            const itemModel = new FoodItemModel(itemDoc.id, itemDoc.data());
            const imageRef = ref(storage, itemModel.image);
            const image = await getDownloadURL(imageRef);
            itemModel.image = image;
            setMenuItems(prevState => [...prevState, itemModel]);
        });

        setMenu(menu);
    }

    useEffect(() => {
        getMenu();
    }, [menuId])

    const addToCart = (e, item) => {
        // prevent form submit 
        e.preventDefault();
        // get quantity from form 
        const { quantity } = e.target;
        let itemToAdd = item;
        item.quantity = quantity.value;

        // Check cart to see if item is already there
        const itemInCart = orderItems.find(itemInCart => itemInCart.id === item.id);
        if (itemInCart) {
            itemInCart.quantity = item.quantity;
        } else {
            setOrderItems(prevState => [...prevState, itemToAdd]);
        }

        console.log(orderItems);
    }

    return <div className="content">
        <div className="menu-page">
            {
                menu ? <div className="full-menu">
                    <img src={menu.image} alt="menu" className="menu-image-full" />
                    <p className="title text-black ">{menu.name}</p>
                    <p className="menu-description">{menu.description}</p>
                    <div className="p-5">
                        {
                            menuItems.map(item => {
                                return <div className="menu-food-item" key={item.id}>
                                    <img src={item.image} alt={item.name} width="100" className="food-image" />
                                    <div className="mx-2">
                                        <h6 className="title-small text-black font-sm">{item.name}</h6>
                                        <p className="item-description">{item.description}</p>
                                        <form className="flex" onSubmit={(e) => addToCart(e, item)}>
                                            <input className="text-input" type="number" required name="quantity" placeholder="Quantity" />
                                            <button className="add-to-cart-button" type="submit">+</button>
                                        </form>
                                    </div>
                                    <p className="pricing">{item.price}</p>
                                </div>
                            })
                        }
                    </div>
                </div> : <p>Loading...</p>
            }
        </div>
    </div>
}

export default Menu
