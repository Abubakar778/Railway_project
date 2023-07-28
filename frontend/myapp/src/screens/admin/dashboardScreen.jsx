import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  productSliceSelector,
  fetchdata,
} from "../../features/products/product";
import { citySelector, fetchcities } from "../../features/city/citySlice";
import { userSelector, fetchuser } from "../../features/users/userSlice";
import { loginSelector } from "../../features/auth/loginSlice";
import {
  fetchorder,
  orderSliceSelector,
} from "../../features/order/orderListSlice";

const DashboardScreen = () => {
  const { userInfo } = useSelector(loginSelector);
  const { token } = userInfo;
  const config = {
    headers: {
      authentication: `Bearer ${token}`,
      "content-type": "application/json",
    },
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchcities);
    dispatch(fetchuser);
    dispatch(fetchdata);
    dispatch(fetchorder);
  }, [dispatch]);

  const { cities } = useSelector(citySelector);
  const { user } = useSelector(userSelector);
  const { items } = useSelector(productSliceSelector);
  const { orders } = useSelector(orderSliceSelector);

  return (
    <>
      <Container className="py-4">
        <Row className="">
          <Col md={3}>
            <Card className="bg-success text-light">
              <Card.Body
                as={NavLink}
                to="/admin/train"
                className="text-decoration-none"
              >
                <Card.Title>Trains</Card.Title>
                <Card.Text className="text-center display-4">
                  {items.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="bg-info text-light ">
              <Card.Body
                as={NavLink}
                to="/admin/order"
                className="text-decoration-none"
              >
                <Card.Title>Orders</Card.Title>
                <Card.Text className="text-center display-4">
                  {orders.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="bg-primary text-light">
              <Card.Body
                as={NavLink}
                to="/admin/user"
                className="text-decoration-none"
              >
                <Card.Title>Users</Card.Title>
                <Card.Text className="text-center display-4">
                  {user.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="bg-secondary text-light">
              <Card.Body
                as={NavLink}
                to="/admin/city"
                className="text-decoration-none"
              >
                <Card.Title>Cities</Card.Title>
                <Card.Text className="text-center display-4">
                  {cities.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardScreen;
