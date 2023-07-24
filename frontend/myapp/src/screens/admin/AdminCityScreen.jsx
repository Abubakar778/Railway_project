import React, { useEffect } from "react";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { citySelector, fetchcities } from "../../features/city/citySlice";

const AdminCityScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchcities);
  }, [dispatch]);
  const { cities, loadind, error } = useSelector(citySelector);
  const CreateHandler = () => {
    navigate("/admin/city/add");
  };
  return (
    <>
      {loadind && <Loader />}
      {error && <Message>{error.message}</Message>}

      <Row className="mt-5">
        <Col md={3}>
          <Button
            className="btn btn-primary w-100"
            onClick={() => navigate("/admin/dashboard")}
          >
            Back
          </Button>
        </Col>
        <Col md={3}>
          <Button
            className="btn btn-success w-100"
            onClick={() => CreateHandler()}
          >
            Add
          </Button>
        </Col>
      </Row>
      <Table striped bordered className="mt-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        {cities.map((item) => {
          return (
            <>
              <tr>
                <td>{item._id}</td>
                <td>{item.name}</td>
              </tr>
            </>
          );
        })}

        <tbody></tbody>
      </Table>
    </>
  );
};

export default AdminCityScreen;
