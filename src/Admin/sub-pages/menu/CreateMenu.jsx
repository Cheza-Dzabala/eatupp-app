import MUIDataTable from 'mui-datatables';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from '../../../routes';
import PageHeader from '../../components/PageHeader';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '../../../components/alerts/Alert';
import axios from '../../../config/axios';

function CreateMenu() {
	const history = useHistory();
	const [open, setOpen] = useState(false);
	const [menu, setMenu] = useState({
		name: '',
		description: '',
		image: '',
	});

	const [response, setResponse] = useState({
		message: '',
		severity: 'success',
	});

	const handleChange = (event) => {
		setMenu({ ...menu, [event.target.name]: event.target.value });
	};

	const [image, setImage] = useState('');

	const uploadImage = async () => {
		const formData = new FormData();
		formData.append('image', image);
		try {
			const upload = await axios.post('/files/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${window.localStorage.getItem(
						'token'
					)}`,
				},
			});

			return upload;
		} catch (error) {
			console.log({ error });
			throw new Error(error);
		}
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};
	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const image = await uploadImage();

			console.log(image.data.filename);
			axios
				.post(
					'/menu',
					{
						name: menu.name,
						description: menu.description,
						image: image.data.filename,
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${window.localStorage.getItem(
								'token'
							)}`,
						},
					}
				)
				.then((res) => {
					setResponse({
						message: 'Menu created successfully',
						severity: 'success',
					});
					setOpen(true);
					setTimeout(() => {
						history.push(routes.adminMenu);
					}, 2000);
				})
				.catch((err) => {
					console.log(err);
					setResponse({
						message: 'Error creating menu',
						severity: 'error',
					});
					setOpen(true);
				});
		} catch (error) {
			setResponse({
				message: 'image upload failed',
				severity: 'error',
			});
		}
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
			<PageHeader title="New Menu" />
			<div className="admin-page-content">
				<form
					action=""
					onSubmit={onSubmit}
					className="create-menu-form"
				>
					<input
						type="text"
						className="form-input"
						name="name"
						required
						placeholder="Menu Name"
						onChange={handleChange}
					/>
					<textarea
						type="text"
						className="form-input description"
						placeholder="Description"
						required
						name="description"
						onChange={handleChange}
					></textarea>
					<div className="form-field">
						<label htmlFor="image" className="label">
							Menu Image
						</label>
						<input
							required
							accept="image/*"
							type="file"
							className="form-input"
							name="image"
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>
					<button type="submit" className="button-auth">
						Create
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateMenu;
