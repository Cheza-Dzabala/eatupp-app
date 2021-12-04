import { Snackbar } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Alert } from '../../../components/alerts/Alert';
import axios from '../../../config/axios';
import { routes } from '../../../routes';
import PageHeader from '../../components/PageHeader';
import {
	tableOptions,
	viewMenuItemsTableHeaders,
} from '../../config/tableConfig';

function ViewMenu() {
	const history = useHistory();
	const [open, setOpen] = React.useState(false);
	const [menu, setMenu] = React.useState({});
	const [menuItems, setMenuItems] = React.useState([]);
	const { menuId } = useParams();
	const [response, setResponse] = React.useState({
		message: '',
		severity: '',
	});

	const getMenu = async () => {
		axios
			.get(`/menu/${menuId}`)
			.then((res) => {
				const items = res.data.items;
				const mappedItems = items.map((item) => {
					return {
						id: item.id,
						name: item.name,
						description: item.description,
						price: item.price,
						image: item.image,
					};
				});

				mappedItems.forEach((item) => {
					setMenuItems((items) => [...items, item]);
				});

				setMenu(res.data);
			})
			.catch((err) => {
				setResponse({
					message: 'Could not get menu',
					severity: 'error',
				});
				setOpen(true);
			});
	};

	useEffect(() => {
		getMenu();
	}, []);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<div className="admin-content">
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={response.severity}
					sx={{ width: '100%' }}
				>
					{response.message}
				</Alert>
			</Snackbar>
			<PageHeader
				title="View Menu"
				icon="plus"
				actionText="Add Item"
				action={() =>
					history.push(`${routes.adminMenu}/${menuId}/add-item`)
				}
			/>
			<div className="admin-page-content">
				{menu && (
					<div className="admin-page-header">
						<h1 className="order-status">{menu.name}</h1>
						<h1 className="order-status">
							Item Count: {menu.items && menu.items.length}
						</h1>
					</div>
				)}
			</div>
			<div className="admin-page-content">
				<MUIDataTable
					options={tableOptions(() => console.log('clicked'))}
					data={menuItems}
					columns={viewMenuItemsTableHeaders}
				/>
			</div>
		</div>
	);
}

export default ViewMenu;
