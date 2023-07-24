import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const DetailCard = ({ item, children }) => {
  return (
    <>
      <Card className="mt-3 p-2 mb-2 product-card text-decoration-none text-dark">
        <Card.Body>
          <Card.Title className="text-uppercase pb-4 fs-1" as={"h4"}>
            {item.name}
          </Card.Title>
          <Card.Text className="fs-5 fw-semibold text-capitalize">
            {item.depcity} to {item.destcity}{" "}
          </Card.Text>
          <Card.Text>
            Departure : {new Date(item.depdate).toDateString()} at{" "}
            {item.deptime}
          </Card.Text>
          <Card.Text>
            Arrival : {new Date(item.destdate).toDateString()} at {item.deptime}
          </Card.Text>

          <Card.Text>
            <p>
              <strong>Business Class : </strong> Avaible Seats{" "}
              <strong>{item.bclassseats}</strong> and the fear is{" "}
              <strong>RS{item.bclassprice}/- </strong>
            </p>
          </Card.Text>
          <Card.Text>
            <p>
              <strong>Economy Class : </strong> Avaible Seats{" "}
              <strong>{item.eclassseats}</strong> and the fear is{" "}
              <strong>RS{item.eclassprice}/- </strong>
            </p>
          </Card.Text>
          <Card.Text>
            <p>
              <strong>Facilities : </strong> {item.detail}
            </p>
          </Card.Text>
        </Card.Body>
        <Card.Text>
          <Row className="justify-content-center">
            <Col md={6}>{children}</Col>
          </Row>
        </Card.Text>
      </Card>
    </>
  );
};

export default DetailCard;
