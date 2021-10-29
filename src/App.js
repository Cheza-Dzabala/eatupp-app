
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Layout from "./layout";
import { routes } from "./routes";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider, useFirebaseApp, FirestoreProvider } from 'reactfire';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore";
import Menu from "./components/Menu";



function App() {
  const app = useFirebaseApp();
  const firestoreInstance = getFirestore(useFirebaseApp());
  const auth = getAuth(app);

  return <AuthProvider sdk={auth}>
    <FirestoreProvider sdk={firestoreInstance}>
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
            <Layout><Menu /></Layout>
          </Route>
          <Route path="*">
            <Layout>
              <NotFound />
            </Layout>
          </Route>
        </Switch>
      </Router>
    </FirestoreProvider>
  </AuthProvider>
}

export default App;