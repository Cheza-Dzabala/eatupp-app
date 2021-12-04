import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import axios from '../config/axios';
import { routes } from '../routes';
import PageHeader from './components/PageHeader';
import { menuTableHeaders, tableOptions } from './config/tableConfig';

function AdminMenu() {
	const [menuItems, setMenuItems] = useState([]);
	const history = useHistory();
	const createMenuAction = () => {
		history.push(routes.adminMenuCreate);
	};
	const getMenuItems = () => {
		axios
			.get('/menu')
			.then((res) => {
				const menus = res.data;
				const mappedItems = menus.map((menu) => {
					return {
						id: menu.id,
						image: menu.image,
						name: menu.name,
						description: menu.description,
						itemCount: menu.items.length,
					};
				});
				mappedItems.forEach((item) => {
					setMenuItems((prevState) => [...prevState, item]);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getMenuItems();
	}, []);
	return (
		<div className="admin-content">
			<PageHeader
				icon="plus"
				title="New Menu"
				actionText="Create Menu"
				action={createMenuAction}
			/>{' '}
			<div className="admin-page-content">
				<MUIDataTable
					data={menuItems}
					columns={menuTableHeaders}
					options={tableOptions((rowData, rowMeta) =>
						history.push(`${routes.adminMenu}/${rowData[0]}`)
					)}
				/>
			</div>
		</div>
	);
}

export default AdminMenu;
