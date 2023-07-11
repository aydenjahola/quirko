import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Form from "./components/Form";
import SignUp from "./components/SignUp";
import LogIn from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <PrivateRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <Route exact path="/" component={Form} />
                <Route path="/app" component={Form} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={LogIn} />
                <Route path="/forgot-password" component={ForgotPassword} />
              </Switch>
            </div>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
