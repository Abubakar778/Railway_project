import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faTrainSubway,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { loginSelector, logoutUser } from "../features/auth/loginSlice";
// import { useState } from "react";
// import { Jwt } from "jsonwebtoken";
const Header = () => {
  // const [isasmin, setisasmin] = useState(false);

  const { userInfo } = useSelector(loginSelector);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser);
  };
  return (
    <>
      <Navbar variant="dark" className="navColor">
        <Container>
          <Navbar.Brand href="/">
            <FontAwesomeIcon icon={faTrainSubway} /> Pakistan Railway
          </Navbar.Brand>
          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to={"/cart"}>
                <FontAwesomeIcon icon={faCartShopping} />
                Cart &nbsp;
              </Nav.Link>
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="nav-dropdown">
                    <NavDropdown.Item
                      as={NavLink}
                      to={"#"}
                      className="disabled"
                    >
                      Profile
                    </NavDropdown.Item>
                    {userInfo && userInfo.isadmin && (
                      <>
                        <NavDropdown.Item as={NavLink} to={"/admin"}>
                          Admin
                        </NavDropdown.Item>
                      </>
                    )}

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    <FontAwesomeIcon icon={faUser} /> Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
