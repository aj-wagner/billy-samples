import React from "react";
import Home from "./Landing/Home";
import SignIn from "./Landing/SignIn";
import PrivateRouteLink from "./Landing/PrivateRouteLink";
import SignUp from "./Landing/SignUp";
import ForgotPassword from "./Landing/ForgotPassword";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import { AuthProvider } from "./auth/Auth";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/private" component={PrivateRouteLink} />

          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/forgotpassword" component={ForgotPassword} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
