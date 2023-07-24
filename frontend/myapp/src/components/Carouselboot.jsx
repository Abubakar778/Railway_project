import React from "react";
import { Carousel } from "react-bootstrap";

const Carouselboot = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/karachirailway.jpg"
            alt="First slide"
            style={{ height: "400px" }}
          />
          <Carousel.Caption>
            <h3>Karachi Railway</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/lahorerailway.jpg"
            alt="Second slide"
            style={{ height: "400px" }}
          />

          <Carousel.Caption>
            <h3>Lahore Railway</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="/trainimage.jpg"
            alt="Third slide"
            style={{ height: "400px" }}
          />

          <Carousel.Caption>
            <h3>Green Line</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Carouselboot;
