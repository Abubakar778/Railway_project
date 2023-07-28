import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  orderSliceSelector,
  fetchorder,
} from "../../features/order/orderListSlice";

const AdminOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchorder);
    console.log("this is admin order screen");
  }, [dispatch]);
  const { orders, loadind, error } = useSelector(orderSliceSelector);

  return (
    <>
      {loadind && <Loader />}
      {console.log("this is return of admin order screen")}
      {/* {console.log(orders.user.name)} */}
      {error && <Message>{error.message}</Message>}
      <Row className="pt-5">
        <Col md={3}>
          <Button
            className="btn btn-primary w-100"
            onClick={() => navigate("/admin/dashboard")}
          >
            Back
          </Button>
        </Col>
      </Row>
      <Table striped bordered className="mt-5">
        <thead>
          <tr>
            <th>Customer</th>

            <th>Train</th>
            <th>Route</th>
            <th>Dep Date</th>

            <th>Seats Bclass</th>
            <th>Seats Eclass</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => {
            return (
              <tr>
                <td>
                  {item.user.name}
                  <br />
                  {item.user.email}
                </td>
                {console.log(item.user.name)}
                <td>{item.orderItems.name}</td>
                <td>
                  {item.orderItems.depcity} to {item.orderItems.distcity}
                </td>
                <td>{item.orderItems.depdate}</td>
                <td>{item.orderItems.bqty}</td>

                <td>{item.orderItems.eqty}</td>

                <td>{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default AdminOrderScreen;
