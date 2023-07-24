import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { Row, Col, Card, Button, Container } from "react-bootstrap";
// import { payOrder } from "../features/order/orderPaySlice";
// import StripeCheckout from "react-stripe-checkout";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
import {
  addCartItem,
  // cartSelector,
  // resetShoppingCart,
} from "../features/cart/cartSlice";
// import { createSingleOrder } from "../features/order/createOrderSlice";
const AddCartScreen = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const eseats = query.get("eseats");
  const bseats = query.get("bseats");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(addCartItem(id, bseats, eseats))
      .then((res) => navigate("/cart"))
      .catch((errro) => (
        <>
          <h2>not added to cart</h2>
        </>
      ));
  }, [id, bseats, eseats, dispatch, navigate]);

  // const { loading, storageItem, error } = useSelector(cartSelector);
  // const TotelPrice = storageItem.eprice + storageItem.bprice;
  // const strikePrice = TotelPrice * 100;

  // const payNow = (token) => {
  //   try {
  //     const responce = dispatch(
  //       payOrder({
  //         ammount: TotelPrice * 100,
  //         token,
  //       })
  //     );
  //     if (responce) {
  //       dispatch(
  //         createSingleOrder({
  //           orderItems: storageItem,
  //           price: TotelPrice,
  //         })
  //       );
  //       dispatch(resetShoppingCart);

  //       alert("your seats have been booked successfuly");
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     alert("order is not successfull");
  //   }
  // };

  return (
    <>
      {/* {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {!storageItem ? (
        <>
          <h1>Cart is empty</h1>
        </>
      ) : (
        <>
          <Container className="my-4">
            <Col md={3}>
              <Button
                className="btn btn-primary w-100"
                onClick={() => navigate(`/train/${storageItem.pid}`)}
              >
                Back
              </Button>
            </Col>
            <Card className="my-3 p-3 my-2">
              <Row>
                <Col md={4}>
                  <h4>{storageItem.name}</h4>
                  <br />
                  <p>
                    {storageItem.depcity} To {storageItem.distcity}
                  </p>
                  <br />
                  <strong>
                    <p>{storageItem.depdate}</p>
                  </strong>
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
                    <Col md={1}>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => dispatch(resetShoppingCart)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>

            <h4 className="mb-3">{`Total RS ${TotelPrice}`}</h4>
            <StripeCheckout
              stripeKey="pk_test_51MlVDzSAGDOVIp1UGHhVCeyfWMmNFwk1UjsGuVZIq8U8gLbHQHDA92EM4xdlMb6LVbJd8eF61M1fbQUn54KFVD2E00Nm40oq1A"
              lable={`pay RS ${TotelPrice} /--`}
              name="pay with card"
              ammount={strikePrice}
              description={`your total is ${TotelPrice}`}
              token={payNow}
            />
          </Container>
        </>
      )} */}
    </>
  );
};

export default AddCartScreen;
