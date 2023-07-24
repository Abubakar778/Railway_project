import React, { useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Row, Col, Container } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import QuickSearchScreen from "../components/QuickSearchScreen";
import {
  filterCitySelector,
  fetchdataCityFilter,
} from "../features/products/filterCityWise";
import { useSelector, useDispatch } from "react-redux";
import Carouselboot from "../components/Carouselboot";

const FilterCityScreen = () => {
  const { search } = useLocation();
  const queryparams = new URLSearchParams(search);
  const dept = queryparams.get("dept");
  const dist = queryparams.get("dist");
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(filterCitySelector);
  useEffect(() => {
    dispatch(fetchdataCityFilter(dept, dist));
  }, [dept, dist]);

  return (
    <>
      {console.log(dept, dist)}
      {console.log(items.length)}
      <Carouselboot />
      <QuickSearchScreen />
      <Container>
        {error && <Message>{error}</Message>}
        {loading && <Loader />}
        <h2 className="mt-5 fw-bolder">On Service</h2>
        <Row>
          {items.length <= 0 ? (
            <>
              <h4>no train on this route</h4>
            </>
          ) : (
            items.map((item) => (
              <>
                <Col key={item._id} md={4} xl={3} sm={6}>
                  <ProductCard item={item}></ProductCard>
                </Col>
              </>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default FilterCityScreen;
