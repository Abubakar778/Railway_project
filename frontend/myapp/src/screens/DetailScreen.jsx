import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import DetailCard from "../components/DetailCard";
import { useDispatch, useSelector } from "react-redux";
import {
  singleProductSelector,
  fetchSingleData,
} from "../features/products/singleProduct";
import { loginSelector } from "../features/auth/loginSlice";

const DetailScreen = () => {
  const { userInfo } = useSelector(loginSelector);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (!userInfo) {
      navigate(`/login?redirect=/train/${id}`);
    }
    dispatch(fetchSingleData(id));
  }, [navigate, id]);

  const [eseats, seteseats] = useState(0);
  const [bseats, setbseats] = useState(0);
  const [text, settext] = useState("");
  const { loading, error, item } = useSelector(singleProductSelector);
  const dispatch = useDispatch();

  let handleSubmit = (e) => {
    e.preventDefault();

    eseats == 0 && bseats == 0
      ? settext("please select the desire seat")
      : eseats > item.eclassseats || bseats > item.bclassseats
      ? settext("your desired number of seats are greater then avaible seats")
      : navigate(`/cart/${id}?&&bseats=${bseats}&&eseats=${eseats}`);
  };

  return (
    <>
      <Container>
        {error && <Message>{error}</Message>}
        {loading && <Loader />}

        <Row>
          <>
            <Col md={12} xl={12} sm={12} className="my-5">
              <DetailCard item={item}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Business Class</Form.Label>
                    <Form.Control
                      type="number"
                      value={bseats}
                      onChange={(e) => setbseats(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Economy class</Form.Label>
                    <Form.Control
                      type="number"
                      value={eseats}
                      onChange={(e) => seteseats(e.target.value)}
                    />
                  </Form.Group>
                  {text && (
                    <>
                      <h4 className="text-danger">{text}</h4>
                    </>
                  )}

                  <Button type="submit" variant="info" className="w-100">
                    Add to Cart
                  </Button>
                </Form>
              </DetailCard>
            </Col>
          </>
        </Row>
      </Container>
    </>
  );
};

export default DetailScreen;
