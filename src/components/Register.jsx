import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react';
import axios from '../config/axios';
import { routes } from '../routes';
import { Alert } from './alerts/Alert';

function Register() {
	const [open, setOpen] = useState(false);
	const [response, setResponse] = useState({
		message: '',
		severity: 'success',
	});

	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		email: '',
		preferredName: '',
		password: '',
		role: 'user',
	});

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		axios
			.post('/auth/register', user)
			.then((res) => {
				setResponse({
					message: 'Successfully registered. Proceed to login',
					severity: 'success',
				});
				setOpen(true);
			})
			.catch((err) => {
				console.log({ err });
				setResponse({
					message: err.response.data.message,
					severity: 'error',
				});
				setOpen(true);
			});
	};

	// onChange function
	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
			error: '',
		});
	};

	return (
		<div className="main auth">
			<div className="auth-card">
				<Snackbar
					open={open}
					autoHideDuration={6000}
					onClose={handleClose}
				>
					<Alert
						onClose={handleClose}
						severity={response.severity}
						sx={{ width: '100%' }}
					>
						{response.message}
					</Alert>
				</Snackbar>

				<p className="auth-heading">REGISTER</p>
				<form action="" className="auth-form" onSubmit={handleSubmit}>
					<input
						type="text"
						name="firstName"
						className="text-input"
						onChange={handleChange}
						placeholder="First Name"
					/>
					<input
						type="text"
						name="lastName"
						className="text-input"
						onChange={handleChange}
						placeholder="Last Name"
					/>
					<input
						type="text"
						name="preferredName"
						className="text-input"
						onChange={handleChange}
						placeholder="Preferred Name"
					/>
					<input
						type="email"
						name="email"
						className="text-input"
						onChange={handleChange}
						placeholder="Email Address"
					/>
					<input
						type="tel"
						name="phoneNumber"
						className="text-input"
						onChange={handleChange}
						placeholder="Phone Number"
					/>
					<input
						type="password"
						name="password"
						className="text-input"
						onChange={handleChange}
						placeholder="Password"
					/>
					<input
						type="password"
						className="text-input"
						placeholder="ConfirmPassword"
						onChange={handleChange}
					/>
					<button className="button-auth">Register</button>
				</form>
				<a href={routes.login} className="link-text">
					Login Instead.
				</a>
			</div>
		</div>
	);
}

export default Register;
