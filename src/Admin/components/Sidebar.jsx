import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { routes } from '../../routes';

function Sidebar() {
	const [user, setUser] = useContext(AuthContext);
	return (
		<div className="sidebar">
			<span>
				<div className="sidebar-header">
					<h1 className="username">Welcome {user.preferredName}</h1>
				</div>
				<ul className="sidebar-options">
					<Link to={routes.admin}>
						<li className="sidebar-option">Admins</li>
					</Link>
					<Link to="/">
						<li className="sidebar-option">Users</li>
					</Link>
					<Link to={routes.orders}>
						<li className="sidebar-option">Orders</li>
					</Link>
					<Link to={routes.adminMenu}>
						<li className="sidebar-option">Menus</li>
					</Link>
					<Link to="/">
						<li className="sidebar-option">Specials</li>
					</Link>
				</ul>
			</span>

			<button className="logout">Exit</button>
		</div>
	);
}

export default Sidebar;
