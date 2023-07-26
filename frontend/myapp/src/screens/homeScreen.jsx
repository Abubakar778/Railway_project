import React, { useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Row, Col, Container } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import QuickSearchScreen from "../components/QuickSearchScreen";
import { fetchdata, productSliceSelector } from "../features/products/product";
import { useDispatch, useSelector } from "react-redux";
import Carouselboot from "../components/Carouselboot";

const HomeScreen = () => {
  const { loading, error, items } = useSelector(productSliceSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchdata);
  }, [dispatch]);

  return (
    <>
      {""}
      <Carouselboot />
      <div className="py-5 px-4">
        <div className=" py-5  bg-white rounded container form-shadow">
          <QuickSearchScreen />
        </div>
      </div>
      <Container>
        {error && <Message>{error}</Message>}
        {loading && <Loader />}
        <div className="bg-info text-center text-white rounded text-bold">
          <p className="mt-5 fs-1 ps-4 text-capitalize fw-bold">
            Avaible for you
          </p>
        </div>
        <Row className="py-3">
          {items.map((item) => (
            <>
              <Col key={item._id} md={4} xl={3} sm={6}>
                <ProductCard key={item._id} item={item}></ProductCard>
              </Col>
            </>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
