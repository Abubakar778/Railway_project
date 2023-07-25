import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <Card
      className="mt-3 p-2  product-card text-decoration-none text-dark"
      style={{ height: "300px" }}
    >
      <Card.Body>
        <Card.Title className="text-capitalize pb-4 text-center fs-3">
          {item.name}
        </Card.Title>
        <Card.Text className="fs-5  text-capitalize fst-italic">
          {item.depcity} to {item.destcity}{" "}
        </Card.Text>
        <Card.Text>
          Date & Time : {new Date(item.depdate).toDateString()} at{" "}
          {item.deptime}
        </Card.Text>
      </Card.Body>
      <Link to={`/train/${item._id}`}>
        <Button className="btn btn-info w-100">Book Now</Button>
      </Link>
    </Card>
  );
};

export default ProductCard;
