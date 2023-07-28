import React, { useState, useEffect } from "react";
import { loginSelector } from "../../features/auth/loginSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { Form, Button, FloatingLabel, Col } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { fetchcities, citySelector } from "../../features/city/citySlice";
import {
  fetchSingleData,
  singleProductSelector,
} from "../../features/products/singleProduct";

const AdminEditTrainScreen = () => {
  const { userInfo } = useSelector(loginSelector);
  const { token } = userInfo;
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const { id } = useParams();
  const [Train, setTrain] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    fetchTrain(id);
    dispatch(fetchcities);
  }, [id]);

  const fetchTrain = async (tid) => {
    try {
      const { data } = await axios.get(`/api/train/${tid}`);
      setTrain(data);
      setloading(false);
    } catch (err) {
      seterror(err.message);
      setloading(false);
    }
  };

  const { cities } = useSelector(citySelector);

  const navigate = useNavigate();

  // name: item.name,
  // depcity: item.depcity,
  // deptime: item.deptime,
  // depdate: item.depdate,
  // depday: item.depday,
  // destcity: item.destcity,
  // desttime: item.desttime,
  // destdate: item.destdate,
  // destday: item.destday,
  // eclassseats: item.eclassseats,
  // eclassprice: item.eclassprice,
  // bclassseats: item.bclassseats,
  // bclassprice: item.bclassprice,
  // detail: item.detail,

  const SubmitHadndler = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authentication: `Bearer ${token}`,
        "content-type": "application/json",
      },
    };
    axios
      .put(`/admin/train/${id}`, Train, config)
      .then((res) => {
        setTrain({});
        navigate("/admin/train");
      })
      .catch((err) => {
        seterror(err.message);
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
      {loading && <Loader />}
      {error && <Message>{error}</Message>}

      <div className="py-5">
        <Col md={3}>
          <Button
            className="btn btn-primary w-100"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Col>
        <FormContainer title={"Edit Train"}>
          <Form onSubmit={SubmitHadndler}>
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
                // value={Train.depdate}
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
                // value={Train.destdate}
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
              placeholder="description"
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
              UPDATE
            </Button>
          </Form>
        </FormContainer>
      </div>
    </>
  );
};

export default AdminEditTrainScreen;
