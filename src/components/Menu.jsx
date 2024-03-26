/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from '../config/axios';
import { CartContext } from '../context/cart-context';

function Menu(props) {
	const [orderItems, setOrderItems] = useContext(CartContext);

	const { menuId } = useParams();

	const [menu, setMenu] = useState(null);
	const [menuItems, setMenuItems] = useState([]);

	const getMenu = async () => {
		axios
			.get(`/menu/${menuId}`)
			.then((res) => {
				const { data } = res;
				setMenu(data);
			})
			.catch((err) => {
				console.log(err);
			});
		axios
			.get(`/menu/items/${menuId}`)
			.then((res) => {
				const { data } = res;
				data.forEach((item) => {
					setMenuItems((menuItems) => [...menuItems, item]);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getMenu();
	}, [menuId]);

	const addToCart = (e, item) => {
		// prevent form submit
		e.preventDefault();
		// get quantity from form
		const { quantity } = e.target;
		let itemToAdd = item;
		item.quantity = quantity.value;

		// Check cart to see if item is already there
		const itemInCart = orderItems.find(
			(itemInCart) => itemInCart.id === item.id
		);
		if (itemInCart) {
			itemInCart.quantity = item.quantity;
		} else {
			setOrderItems((prevState) => [...prevState, itemToAdd]);
		}

		console.log(orderItems);
	};

	return (
		<div className="content">
			<div className="menu-page">
				{menu ? (
					<div className="full-menu">
						<img
							src={`${menu.image}`}
							alt="menu"
							className="menu-image-full"
						/>
						<p className="title text-black ">{menu.name}</p>
						<p className="menu-description">{menu.description}</p>
						<div className="p-5">
							{menuItems.map((item) => {
								return (
									<div
										className="menu-food-item"
										key={item.id}
									>
										<img
											src={`${process.env.REACT_APP_API_URL}files/${item.image}`}
											alt={item.name}
											width="100"
											className="food-image"
										/>
										<div className="mx-2">
											<h6 className="title-small text-black font-sm">
												{item.name}
											</h6>
											<p className="item-description">
												{item.description}
											</p>
											<form
												className="flex"
												onSubmit={(e) =>
													addToCart(e, item)
												}
											>
												<input
													className="text-input"
													type="number"
													required
													name="quantity"
													placeholder="Quantity"
												/>
												<button
													className="add-to-cart-button"
													type="submit"
												>
													+
												</button>
											</form>
										</div>
										<p className="pricing">{item.price}</p>
									</div>
								);
							})}
						</div>
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}

export default Menu;
