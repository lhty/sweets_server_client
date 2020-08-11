import React, { Suspense, ReactElement } from "react";

import Header from "../Header";
import Footer from "../Footer";
import Banner from "../Banner";
import Products from "../Products";

import "../../styles/main.css";

export default function index(): ReactElement {
  return (
    <>
      <Header />
      <Suspense fallback={<></>}>
        <Banner />
        <Products />
      </Suspense>
      <Footer />
    </>
  );
}
