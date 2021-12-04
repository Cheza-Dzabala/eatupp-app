/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import axios from '../config/axios';
import PageHeader from './components/PageHeader';
import MUIDataTable from 'mui-datatables';

function AdminHome() {
	const token = window.localStorage.getItem('token');
	const [admins, setAdmins] = React.useState([]);
	const columns = [
		{
			name: 'firstName',
			label: 'First Name',
		},
		{
			name: 'lastName',
			label: 'Last Name',
		},
		{
			name: 'email',
			label: 'Email',
		},
		{
			name: 'phone',
			label: 'Phone',
		},
		{
			name: 'role',
			label: 'Role',
		},
	];
	useEffect(() => {
		axios
			.get('/users/admin', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				const data = res.data.map((item) => {
					const tableItem = {
						firstName: item.firstName,
						lastName: item.lastName,
						email: item.email,
						phone: item.phoneNumber,
						role: item.role,
					};
					return tableItem;
				});

				data.forEach((item) => {
					setAdmins((prevState) => [...prevState, item]);
				});
			})
			.catch((err) => {
				console.log({ err });
			});
	}, []);
	return (
		<div className="admin-content">
			<PageHeader
				icon="plus"
				title="Admin Home"
				actionText="Create Admin"
			/>
			<div className="admin-page-content">
				<MUIDataTable
					data={admins}
					columns={columns}
					options={{
						elevation: 0,
					}}
				/>
			</div>
		</div>
	);
}

export default AdminHome;
