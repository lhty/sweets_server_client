import React, { ReactElement } from "react";
import { Router } from "react-router-dom";
import { history } from "../redux/";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import Products from "../components/Products";

export default (): ReactElement => {
  return (
    <Router history={history}>
      <Header />
      <Banner />
      <Products />
      <Footer />
    </Router>
  );
};
