import React, { useEffect } from 'react';
import PageHeader from './components/PageHeader';
import MUIDataTable from 'mui-datatables';
import axios from '../config/axios';
import { useHistory } from 'react-router';
import { routes } from '../routes';

function Orders() {
	const history = useHistory();
	const token = window.localStorage.getItem('token');
	const [orders, setOrder] = React.useState([]);
	const options = {
		elevation: 0,
		rowsPerPage: 5,
		// select table row
		onRowClick: (rowData, rowMeta) => {
			history.push(`${routes.orders}/${rowData[0]}`);
		},
	};
	const columns = [
		{
			name: 'id',
			label: 'order Id ',
		},
		{
			name: 'date',
			label: 'Date / Time',
		},
		{
			name: 'status',
			label: 'Status',
		},
		{
			name: 'user',
			label: 'User',
		},
		{
			name: 'total',
			label: 'Total',
			options: {
				viewColumns: false,
			},
		},
	];
	useEffect(() => {
		axios
			.get('order/all', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				const data = res.data;
				const items = data.map((item) => {
					const total = item.items.reduce((acc, cur) => {
						// console.log({cur})
						return acc + cur.quantity * cur.item.price;
					}, 0);

					return {
						id: item.id,
						date: Intl.DateTimeFormat('en-GB', {
							year: 'numeric',
							month: 'long',
							day: '2-digit',
						}).format(new Date(item.createdAt)),
						status: item.status,
						total: Intl.NumberFormat('en-US', {
							style: 'currency',
							currency: 'MWK',
						}).format(total),
						user: item.user.firstName + ' ' + item.user.lastName,
					};
				});

				items.reverse();
				items.forEach((item) => {
					setOrder((prev) => [...prev, item]);
				});
			})
			.catch((err) => {
				console.log({ err });
			});
	}, []);
	return (
		<div className="admin-content">
			<PageHeader icon="" title="Orders" actionText="" />
			<div className="admin-page-content">
				<MUIDataTable
					options={options}
					data={orders}
					columns={columns}
				/>
			</div>
		</div>
	);
}

export default Orders;
