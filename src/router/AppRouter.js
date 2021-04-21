import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { cheking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (cheking) {
    return <h5>Espere..</h5>;
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            path="/login"
            exact
            component={LoginScreen}
            isAuthenticated={!!uid}
          />
          <PrivateRoute
            path="/"
            exact
            component={CalendarScreen}
            isAuthenticated={!!uid}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
