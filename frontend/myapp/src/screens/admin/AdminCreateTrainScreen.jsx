import React, { useState, useEffect } from "react";
import { loginSelector } from "../../features/auth/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { citySelector, fetchcities } from "../../features/city/citySlice";
const AdminCreateTrainScreen = () => {
  const { userInfo } = useSelector(loginSelector);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  const { token } = userInfo;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchcities);
  }, [dispatch]);
  const { cities } = useSelector(citySelector);

  const [Train, setTrain] = useState({
    name: "",
    depcity: "",
    deptime: "",
    depdate: "",
    depday: "",
    destcity: "",
    desttime: "",
    destdate: "",
    destday: "",
    eclassseats: 0,
    eclassprice: 0,
    bclassseats: 0,
    bclassprice: 0,
    detail: "",
  });
  const navigate = useNavigate();

  const SubmitHadndler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authentication: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    axios
      .post("/admin/train/create", Train, config)
      .then((res) => {
        setloading(false);
        navigate("/admin/train");
      })
      .catch((err) => {
        seterror(err.message);
        setloading(false);
      });
  };
  const HandleInput = (e) => {
    const { name, value } = e.target;
    setTrain((prevform) => ({
      ...prevform,
      [name]: value,
    }));
  };
  return (
    <>
      <FormContainer title={"Add Train"}>
        <Form onSubmit={SubmitHadndler} className="my-3">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={Train.name}
              onChange={HandleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deparute City</Form.Label>
            <Form.Select
              key={cities._id}
              name="depcity"
              value={Train.depcity}
              onChange={HandleInput}
            >
              <option>Select Deparute</option>

              {cities.map((c) => (
                <>
                  <option key={c._id}>{c.name}</option>
                </>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Departure Date</Form.Label>
            <Form.Control
              type="date"
              name="depdate"
              value={Train.depdate}
              onChange={HandleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Departure Time</Form.Label>
            <Form.Control
              type="text"
              name="deptime"
              value={Train.deptime}
              onChange={HandleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Departure Day</Form.Label>
            <Form.Control
              type="text"
              name="depday"
              value={Train.depday}
              onChange={HandleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Destination</Form.Label>
            <Form.Select
              key={cities._id}
              name="destcity"
              value={Train.destcity}
              onChange={HandleInput}
            >
              <option>Select Destination</option>

              {cities.map((c) => (
                <>
                  <option key={c._id}>{c.name}</option>
                </>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Arrival date</Form.Label>
            <Form.Control
              type="date"
              name="destdate"
              value={Train.destdate}
              onChange={HandleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Arrival Time</Form.Label>
            <Form.Control
              type="text"
              name="desttime"
              value={Train.desttime}
              onChange={HandleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Arrival Day</Form.Label>
            <Form.Control
              type="text"
              name="destday"
              value={Train.destday}
              onChange={HandleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>E-class Seats</Form.Label>
            <Form.Control
              type="number"
              name="eclassseats"
              value={Train.eclassseats}
              onChange={HandleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>E-class Price</Form.Label>
            <Form.Control
              type="number"
              name="eclassprice"
              value={Train.eclassprice}
              onChange={HandleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>B-class Seats</Form.Label>
            <Form.Control
              type="number"
              name="bclassseats"
              value={Train.bclassseats}
              onChange={HandleInput}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>B-class Price</Form.Label>
            <Form.Control
              type="number"
              name="bclassprice"
              value={Train.bclassprice}
              onChange={HandleInput}
            />
          </Form.Group>
          <FloatingLabel
            controlId="floatingTextarea"
            label="Comments"
            className="mb-3"
          >
            <Form.Control
              as="textarea"
              placeholder="Enter Details Here"
              name="detail"
              value={Train.detail}
              onChange={HandleInput}
            />
          </FloatingLabel>

          <Button variant="primary" type="submit">
            ADD
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default AdminCreateTrainScreen;
