import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const FormContainer = ({ title, children }) => {
  return (
    <>
      <Row className="justify-content-center mt-5">
        <Col md={6} xs={12}>
          {title ? (
            <Card.Body>
              <Card.Title className="text-uppercase pb-2 text-center">
                {title}
              </Card.Title>
              <hr />
              {children}
            </Card.Body>
          ) : (
            children
          )}
        </Col>
      </Row>
    </>
  );
};

export default FormContainer;
