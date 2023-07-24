import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  productSliceSelector,
  fetchdata,
  deleteTrain,
} from "../../features/products/product";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginSelector } from "../../features/auth/loginSlice";
import axios from "axios";

const AdminProductScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchdata);
  }, [dispatch]);
  const { items, loadind, error } = useSelector(productSliceSelector);

  const EditHandler = (id) => {
    navigate(`/admin/train/edit/${id}`);
  };
  const CreateHandler = () => {
    navigate("/admin/train/add");
  };
  const { userInfo } = useSelector(loginSelector);
  const DeleteHandler = (id) => {
    dispatch(deleteTrain(id));
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
            <th>Name</th>
            <th>Route</th>
            <th>Departure</th>
            <th>Seats Bclass</th>
            <th>Price Bclass</th>
            <th>Seats Eclass</th>
            <th>Price Eclass</th>
            <th>Action</th>
          </tr>
        </thead>
        {items.map((item) => {
          return (
            <>
              <tr>
                <td>{item.name}</td>
                <td>
                  {item.depcity} to {item.destcity}
                </td>
                <td>{item.depdate}</td>
                <td>{item.bclassseats}</td>
                <td>{item.bclassprice}</td>
                <td>{item.eclassseats}</td>
                <td>{item.eclassprice}</td>
                <td>
                  <Button
                    className=" btn-danger text-dark"
                    onClick={(e) => DeleteHandler(item._id)}
                  >
                    Del
                  </Button>
                  <Button
                    className=" btn-warning text-dark"
                    onClick={() => EditHandler(item._id)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            </>
          );
        })}

        <tbody></tbody>
      </Table>
    </>
  );
};

export default AdminProductScreen;
