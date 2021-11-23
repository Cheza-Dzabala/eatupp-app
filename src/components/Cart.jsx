/* eslint-disable react-hooks/exhaustive-deps */
import { Timestamp } from '@firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { useFirestore, useUser } from 'reactfire';
import { setDoc } from 'firebase/firestore';
import { CartContext } from '../context/cart-context';
import { OrderItem } from '../data/orders';

function Cart() {
    const [orderStatus, setOrderStatus] = useState('');
    const [orderItems, setOrderItems] = useContext(CartContext);
    const [orderTotal, setOrderTotal] = useState(0);
    const { status, data: user } = useUser();
    const firestore = useFirestore();

    const placeOrder = async () => {
        const items = orderItems.map(item => {
            return new OrderItem(item.id, item.quantity);
        }, []);

        const order = {
            date: Timestamp,
            items: items,
            status: 'pending',
            user: user.uid,
        }

        // Set order to firestore

        try {
            await setDoc(firestore, 'orders', order);
            setOrderStatus('Order placed successfully');
        } catch (e) {
            console.log(e);
            setOrderStatus('Order failed to place');
        }

    };

    const calculateTotal = () => {
        let total = 0;
        orderItems.forEach(item => {
            total += item.price * item.quantity;
        });
        return total;
    }

    useEffect(() => {
        setOrderTotal(calculateTotal());
    }, [orderItems])

    return <div className="cart-page">
        <div className="cart-header">
            <div className="cart-header-title">
                <h1>Your Cart</h1>
            </div>
            <div className="cart-header-items">
                <div className="cart-header-items-count">
                    <h2>{orderItems.length}</h2>
                </div>
                <div className="cart-header-items-total">
                    <h2>Total: {orderTotal}</h2>
                </div>
            </div>
        </div>
        {orderItems.map(item => (
            <div className="cart-item">
                <div className="cart-item-image">
                    <img src={item.image} alt={item.name} height="50px" width="50px" />
                </div>
                <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">MK {item.price}</div>
                    <div className="cart-item-quantity">Quantity: {item.quantity}</div>
                </div>
                {/* Order Button */}

            </div>
        ))}
        <div className="cart-item-order">
            <button className="order-button" onClick={() => placeOrder()}>Order</button>
        </div>
    </div>
}

export default Cart
