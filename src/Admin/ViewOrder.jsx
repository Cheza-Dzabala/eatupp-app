/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from '../config/axios';
import PageHeader from './components/PageHeader';
import MUIDataTable from 'mui-datatables';
import { tableOptions, viewOrderTableHeaders } from './config/tableConfig';

function ViewOrder() {
	const token = window.localStorage.getItem('token');
	const { orderId } = useParams();
	const [customer, setCustomer] = useState({});
	const [order, setOrder] = useState({});
	const [total, setTotal] = useState(0);
	const [orderItems, setOrderItems] = useState([]);

	const getOrder = async () => {
		axios
			.get(`/order/${orderId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setCustomer(res.data.user);
				const items = res.data.items;
				const total = items.reduce((acc, cur) => {
					// console.log({cur})
					return acc + cur.quantity * cur.item.price;
				}, 0);

				setTotal(total);
				setOrder(res.data);
				items.forEach((item) => {
					const data = {
						id: item.id,
						name: item.item.name,
						image: item.item.image,
						unitPrice: item.item.price,
						quantity: item.quantity,
						total: item.quantity * item.item.price,
					};
					setOrderItems((prev) => [...prev, data]);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	useEffect(() => {
		getOrder();
	}, []);

	const updateOrder = (status) => {
		axios
			.put(
				`/order/${orderId}`,
				{ status },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				getOrder();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// get id from params using UseParams
	return (
		<div className="admin-content">
			<PageHeader
				icon=""
				title={`${customer.firstName} ${customer.lastName}`}
				actionText=""
			/>
			<div className="admin-page-content">
				<div className="admin-page-header">
					<h1 className="order-status">Status: {order.status}</h1>
					<h1 className="order-status">
						Total:{' '}
						{Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'MWK',
						}).format(total)}
					</h1>
					<div className="update-order-status">
						<select
							className="update-order"
							name="status"
							id="status"
							defaultValue={order.status}
							onChange={(e) => updateOrder(e.target.value)}
						>
							<option value="pending">Pending</option>
							<option value="approved">Approved</option>
							<option value="delivered">Delivered</option>
							<option value="cancelled">Cancelled</option>
						</select>
					</div>
				</div>
				<div className="admin-page-content">
					<MUIDataTable
						data={orderItems}
						columns={viewOrderTableHeaders}
						options={tableOptions(() => console.log('clicked'))}
					/>
				</div>
			</div>
		</div>
	);
}

export default ViewOrder;
