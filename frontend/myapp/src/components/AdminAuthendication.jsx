import React from "react";
import { loginSelector } from "../features/auth/loginSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const AdminAuthendication = (isadmin = false) => {
  const { userInfo } = useSelector(loginSelector);

  if (!userInfo) {
    return <Navigate to="/login" replace={true} />;
  }
  if (isadmin && !userInfo.isadmin) {
    return <Navigate to="/login?redirect=/admin" replace={true} />;
  }
  if (isadmin) {
    return (
      <>
        <Container>
          <Outlet />
        </Container>
      </>
    );
  }
};

export default AdminAuthendication;
