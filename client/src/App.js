import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/screens/Home";
import LoginScreen from "./components/screens/LoginScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import RegisterScreen from "./components/screens/RegisterScreen";

import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateScreen from "./components/screens/PrivateScreen";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={PrivateScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
        <Route
          exact
          path="/passwordreset/:resetToken"
          component={ResetPasswordScreen}
        />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}
