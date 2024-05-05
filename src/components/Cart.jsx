/* eslint-disable react-hooks/exhaustive-deps */
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from '../config/axios';
import { AuthContext } from '../context/auth-context';
import { CartContext } from '../context/cart-context';
import { OrderItem } from '../data/orders';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Cart() {
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [response, setResponse] = useState({
		message: '',
		severity: 'success',
	});
	const [orderStatus, setOrderStatus] = useState('');
	const [orderItems, setOrderItems] = useContext(CartContext);
	const [orderTotal, setOrderTotal] = useState(0);
	const [user, setUser] = useContext(AuthContext);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const placeOrder = async () => {
		const token = localStorage.getItem('token');
		const items = orderItems.map((item) => {
			return new OrderItem(item.id, item.quantity);
		}, []);

		if (items.length === 0) {
			setResponse({
				message: 'No items in cart',
				severity: 'error',
			});
			setOpen(true);
			return;
		}

		const order = {
			userId: user.id,
			items: items,
		};
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		axios
			.post('/order', order, {
				headers: headers,
			})
			.then((res) => {
				console.log({ res });
				setResponse({
					message: 'Order placed successfully',
					severity: 'success',
				});
				setOpen(true);
				setOrderItems([]);
			})
			.catch((err) => {
				setResponse({
					message: 'Order failed',
					severity: 'error',
				});
				setOpen(true);
				console.log({ err });
			});
	};

	const calculateTotal = () => {
		let total = 0;
		orderItems.forEach((item) => {
			total += item.price * item.quantity;
		});
		return total;
	};

	const add = (item) => {
		console.log({ item });
		item = { ...item, quantity: parseInt(item.quantity) + 1 };
		const index = orderItems.findIndex(
			(orderItem) => orderItem.id === item.id
		);
		orderItems[index] = item;
		setOrderItems([...orderItems]);
		setOrderTotal(calculateTotal());
	};

	const removeItem = (item) => {
		console.log({ item });
		const index = orderItems.findIndex(
			(orderItem) => orderItem.id === item.id
		);
		orderItems.splice(index, 1);
		setOrderItems([...orderItems]);
		setOrderTotal(calculateTotal());
	};

	const subtract = (item) => {
		if (item.quantity === 1) {
			removeItem(item);
		} else {
			item = { ...item, quantity: item.quantity - 1 };
			const index = orderItems.findIndex(
				(orderItem) => orderItem.id === item.id
			);
			orderItems[index] = item;
			setOrderItems([...orderItems]);
			setOrderTotal(calculateTotal());
		}
	};

	useEffect(() => {
		setOrderTotal(calculateTotal());
	}, [orderItems]);

	return (
		<div className="cart-page w-full">
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={response.severity}
					sx={{ width: '100%' }}
				>
					{response.message}
				</Alert>
			</Snackbar>
			<div className="">
				<div className="cart-header-title title text-black">
					<h1>Your Cart </h1>
				</div>
				<div className="cart-header-items">
					<div className="cart-header-items-count">
						<h2>{orderItems.length} item(s) in your cart.</h2>
					</div>
					<div className="text-black">
						<h2>Total: {orderTotal}</h2>
					</div>
				</div>
			</div>
			{orderItems.length > 0 ? (
				orderItems.map((item) => (
					<div className="cart-item">
						<div className="cart-item-image">
							<img
								src={`${item.image}`}
								alt={item.name}
								height="150px"
								width="150px"
							/>
						</div>
						<div className="w-full">
							<div className="cart-item-name">{item.name}</div>
							<div className="cart-item-price">
								MK {item.price * item.quantity}
							</div>

							<div className="flex flex-row justify-start items-center space-x-5 w-full">
								<button
									className="btn"
									onClick={() => subtract(item)}
								>
									-
								</button>
								<div className="font-bold text-lg">
									{item.quantity}
								</div>
								<div className="btn" onClick={() => add(item)}>
									+
								</div>
							</div>
						</div>
						{/* Order Button */}
					</div>
				))
			) : (
				<div className="cart-empty">
					<h1>Your cart is empty</h1>
				</div>
			)}
			<div className="cart-item-order">
				<button className="order-button" onClick={() => placeOrder()}>
					Order
				</button>
			</div>
		</div>
	);
}

export default Cart;
