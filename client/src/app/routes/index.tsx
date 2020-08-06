import React from "react";
import { Router } from "react-router-dom";
import { history } from "../redux/";
import MainLayout from "../components/Layout";

export default () => {
  return (
    <Router history={history}>
      <MainLayout />
    </Router>
  );
};
