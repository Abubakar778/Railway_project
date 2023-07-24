import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  fetchSingleOrder,
  singleOrderSelector,
} from "../features/order/singleOrderSlice";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

const OrderDetailScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Train Ticket",
    onAfterPrint: () => {
      alert("successfully saved or print");
      navigate("/");
    },
  });
  // console.log(id);
  // const { _id } = orderid;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchSingleOrder(id));
  }, [id, dispatch]);
  const { order, loading, error } = useSelector(singleOrderSelector);

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error.Message}</Message>}

      {!order._id ? (
        <>
          <h3>no order yet</h3>
        </>
      ) : (
        <>
          <Container>
            <Row className=" mt-3 flex-column justify-content-center align-items-center">
              <Col md={6} sm={6}>
                <Card ref={componentRef} className="w-100">
                  <Card.Body className="text-center">
                    <Card.Text>
                      <h3>{order.orderItems.name}</h3>
                      <p className="text-uppercase fs-3 mt-3">
                        {order.orderItems.depcity} To{" "}
                        {order.orderItems.distcity}{" "}
                      </p>

                      {new Date(order.orderItems.depdate).toDateString()}
                    </Card.Text>
                    {order.orderItems.bqty > 0 && (
                      <>
                        <Card.Text>
                          {order.orderItems.bqty} Busincess class seats
                        </Card.Text>
                      </>
                    )}
                    {order.orderItems.eqty > 0 && (
                      <>
                        <Card.Text>
                          {order.orderItems.eqty} Economy class seats
                        </Card.Text>
                      </>
                    )}
                    <Card.Text>
                      <strong>Total {order.price} Price</strong>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={2} sm={2} className="mt-2">
                <Button variant="info" className="w-100" onClick={handlePrint}>
                  Print
                </Button>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default OrderDetailScreen;
