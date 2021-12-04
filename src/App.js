import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import Layout from './layout';
import { routes } from './routes';
import ForgotPassword from './components/ForgotPassword';
import Menu from './components/Menu';
import { useState } from 'react';
import { CartContext } from './context/cart-context';
import { AuthContext } from './context/auth-context';
import Cart from './components/Cart';
import AdminLayout from './Admin/Layout';
import AdminHome from './Admin/AdminHome';
import Orders from './Admin/Orders';
import ViewOrder from './Admin/ViewOrder';
import AdminMenu from './Admin/AdminMenu';
import CreateMenu from './Admin/sub-pages/menu/CreateMenu';
import ViewMenu from './Admin/sub-pages/menu/ViewMenu';
import AddItem from './Admin/sub-pages/menu/AddItem';

function App() {
	const [orderItems, setOrderItems] = useState([]);
	const [user, setUser] = useState([]);

	return (
		<AuthContext.Provider value={[user, setUser]}>
			<CartContext.Provider value={[orderItems, setOrderItems]}>
				<Router>
					<Switch>
						<Route exact path={routes.home}>
							<Layout>
								<Home />
							</Layout>
						</Route>
						<Route exact path={routes.login}>
							<Login />
						</Route>
						<Route exact path={routes.register}>
							<Register />
						</Route>
						<Route exact path={routes.forgotPassword}>
							<ForgotPassword />
						</Route>
						<Route exact path={routes.menu}>
							<Layout>
								<Menu />
							</Layout>
						</Route>
						<Route exact path={routes.cart}>
							<Layout>
								<Cart />
							</Layout>
						</Route>
						<Route exact path={routes.admin}>
							<AdminLayout>
								<AdminHome />
							</AdminLayout>
						</Route>
						<Route exact path={routes.orders}>
							<AdminLayout>
								<Orders />
							</AdminLayout>
						</Route>
						<Route exact path={routes.getOrder}>
							<AdminLayout>
								<ViewOrder />
							</AdminLayout>
						</Route>
						<Route exact path={routes.adminMenu}>
							<AdminLayout>
								<AdminMenu />
							</AdminLayout>
						</Route>
						<Route exact path={routes.adminMenuCreate}>
							<AdminLayout>
								<CreateMenu />
							</AdminLayout>
						</Route>
						<Route exact path={routes.adminViewMenu}>
							<AdminLayout>
								<ViewMenu />
							</AdminLayout>
						</Route>
						<Route exact path={routes.adminAddMenuItem}>
							<AdminLayout>
								<AddItem />
							</AdminLayout>
						</Route>

						<Route path="*">
							<Layout>
								<NotFound />
							</Layout>
						</Route>
					</Switch>
				</Router>
			</CartContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
