import React, { Fragment, useEffect, useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import Customer from "../../pages/Customer";
import Manager from "../../pages/Manager";
import EmployeeRouter from "../../routers/EmployeeRouter";
import ManagerRouter from "../../routers/ManagerRouter";
import Loading from "../../../src/components/UI/Loading";

const Layout = () => {
  const role = localStorage.getItem("role");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3500);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default Layout;
