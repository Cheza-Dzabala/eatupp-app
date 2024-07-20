import React, { useContext } from 'react';
import LineIcon from 'react-lineicons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { CartContext } from '../../context/cart-context';
import logo from '../../images/logo.png';
import { routes } from '../../routes';

function Header() {
	const [user, setUser] = useContext(AuthContext);
	return (
		<div className="header">
			<Link to={routes.home}>
				{' '}
				<img src={logo} alt="Application Logo" />{' '}
			</Link>
			<div className="header-end">
				{user ? <Authenticated /> : <AuthLinks />}
			</div>
		</div>
	);
}

export default Header;

const AuthLinks = () => {
	return (
		<div className="">
			<input
				className="text-input"
				type="text"
				placeholder="Search Food"
			/>
			<a className="link-text" href={routes.login}>
				<LineIcon name="user" /> Login
			</a>
			<a className="link-text" href={routes.register}>
				{' '}
				<LineIcon name="users" /> Register
			</a>
		</div>
	);
};

const Authenticated = () => {
	const logout = async () => {
		window.localStorage.clear();
		window.history.pushState({}, '', '/');
		setUser(null);
	};
	const [orderItems, setOrderItems] = useContext(CartContext);
	const [user, setUser] = useContext(AuthContext);

	return (
		<div className="">
			<input
				className="text-input"
				type="text"
				placeholder="Search Foods"
			/>{' '}
			<Link to={routes.cart} className="link-text">
				<LineIcon name="cart" /> Cart
				<span className="cart-count">{orderItems.length}</span>
			</Link>{' '}
			{user.role == 'admin' && (
				<Link to={routes.admin} className="link-text">
					<LineIcon name="cogs" /> Admin Panel{' '}
				</Link>
			)}
			<span className="link-text" onClick={() => logout()}>
				<LineIcon name="exit" /> Logout
			</span>
		</div>
	);
};
