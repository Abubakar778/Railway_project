import React, { useEffect } from "react";
import { cartSelector, resetShoppingCart } from "../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { payOrder } from "../features/order/orderPaySlice";
import {
  createSingleOrder,
  createOrderSelector,
} from "../features/order/createOrderSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderid, success } = useSelector(createOrderSelector);

  const { loading, storageItem, error } = useSelector(cartSelector);
  const TotelPrice = storageItem.eprice + storageItem.bprice;
  const strikePrice = TotelPrice * 100;

  const PayNow = (token) => {
    try {
      const responce = dispatch(
        payOrder({
          ammount: TotelPrice * 100,
          token,
        })
      );
      if (responce) {
        const { order } = dispatch(
          createSingleOrder({
            orderItems: storageItem,
            price: TotelPrice,
          })
        );
      }
    } catch (error) {
      alert("order is not successfull");
    }
  };
  useEffect(() => {
    if (success && orderid) {
      dispatch(resetShoppingCart);
      navigate(`/order/${orderid._id}`);
    }
  }, [success, orderid, navigate]);

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {!storageItem.name ? (
        <>
          <h1 className=" ms-2">Cart is empty yet</h1>
        </>
      ) : (
        <>
          <div className="py-3">
            <Container className="my-4">
              <Col md={3}>
                <Button
                  className="btn btn-info w-100"
                  onClick={() => navigate(`/train/${storageItem.pid}`)}
                >
                  Back
                </Button>
              </Col>
              <Card className="my-3 p-3 my-2 product-card">
                <Card.Title className="fs-2">{storageItem.name}</Card.Title>
                <Row className="mt-3">
                  <p className="fs-3">
                    {new Date(storageItem.depdate).toDateString()}
                  </p>
                  <Col md={4}>
                    <p className="text-uppercase">
                      {storageItem.depcity} To {storageItem.distcity}
                    </p>
                  </Col>
                  <Col md={4}>
                    {storageItem.bqty >= 1 && (
                      <>
                        <p>
                          Business class seats {storageItem.bqty} x{" "}
                          {storageItem.bseatPrice} = {storageItem.bprice}
                        </p>
                        <br />
                      </>
                    )}
                    {storageItem.eqty >= 1 && (
                      <>
                        <p>
                          Economy class seats {storageItem.eqty} x{" "}
                          {storageItem.eseatPrice} = {storageItem.eprice}
                        </p>
                      </>
                    )}
                  </Col>
                  <Col md={4}>
                    <Row>
                      <Col md={6}>
                        <strong>
                          Total = {storageItem.eprice + storageItem.bprice}
                        </strong>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>

              <h2 className="my-3">{`Total RS ${TotelPrice}/--`}</h2>
              <StripeCheckout
                stripeKey="pk_test_51MlVDzSAGDOVIp1UGHhVCeyfWMmNFwk1UjsGuVZIq8U8gLbHQHDA92EM4xdlMb6LVbJd8eF61M1fbQUn54KFVD2E00Nm40oq1A"
                lable={`pay RS ${TotelPrice} /--`}
                name="pay with card"
                ammount={strikePrice}
                description={`your total is ${TotelPrice}`}
                token={PayNow}
              />
            </Container>
          </div>
        </>
      )}
    </>
  );
};

export default CartScreen;
