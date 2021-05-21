import withRoot from "./modules/withRoot";
// --- Post bootstrap -----
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../auth/Auth";

function PrivateRouteLink({ history }) {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return null;
}

export default withRoot(PrivateRouteLink);
