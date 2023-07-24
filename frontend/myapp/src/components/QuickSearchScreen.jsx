import React, { useState, useEffect } from "react";
import Message from "./Message";
import Loader from "./Loader";
import FormContainer from "./FormContainer";
import { Form, Button } from "react-bootstrap";
import { citySelector, fetchcities } from "../features/city/citySlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const QuickSearchScreen = () => {
  const [departure, setdeparture] = useState("");
  const [distination, setdistination] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchcities);
  }, [dispatch]);
  const { cities, error, loading } = useSelector(citySelector);
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(`/train/filter?dept=${departure}&dist=${distination}`);
    setdeparture("");
    setdistination("");
  };

  return (
    <>
      {error ? <Message>{error}</Message> : null}
      {loading ? <Loader /> : null}
      <FormContainer title={"Quick Search"}>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Deparute City</Form.Label>
          <Form.Select
            key={cities._id}
            value={departure}
            onChange={(e) => setdeparture(e.target.value)}
          >
            <option>Select Deparute</option>

            {cities.map((c) => (
              <>
                <option key={c._id}>{c.name}</option>
              </>
            ))}
          </Form.Select>

          <Form.Label>Destination</Form.Label>
          <Form.Select
            key={cities._id}
            value={distination}
            onChange={(e) => setdistination(e.target.value)}
          >
            <option>Select Destination</option>

            {cities.map((c) => (
              <>
                <option key={c._id}>{c.name}</option>
              </>
            ))}
          </Form.Select>

          <Button type="submit" className="btn btn-info mt-2 ">
            Submit
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default QuickSearchScreen;
