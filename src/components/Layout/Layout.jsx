import React, { Fragment } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import Customer from "../../pages/Customer";
import Manager from "../../pages/Manager";
import EmployeeRouter from "../../routers/EmployeeRouter";
import ManagerRouter from "../../routers/ManagerRouter";

const Layout = () => {
  const role = localStorage.getItem("role");
  return (
    <div>
      {role == 1 || role == null ? (
        <Fragment>
          <Header />
          <div>
            <Routers />
          </div>
          <Footer />
        </Fragment>
      ) : role == 2 ? (
        <div>
          <EmployeeRouter />
        </div>
      ) : (
        <div>
          <ManagerRouter />
        </div>
      )}
    </div>
  );
};

export default Layout;
