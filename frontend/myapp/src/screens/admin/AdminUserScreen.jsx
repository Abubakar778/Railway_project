import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { Button, Col, Row, Table } from "react-bootstrap";
import { fetchuser, userSelector } from "../../features/users/userSlice";
import { useNavigate } from "react-router-dom";

const AdminUserScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchuser);
  }, [dispatch]);
  const { user, loading, error } = useSelector(userSelector);

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}

      <Row className="pt-5">
        <Col md={3}>
          <Button
            className="btn btn-primary w-100"
            onClick={() => navigate("/admin/dashboard")}
          >
            Back
          </Button>
        </Col>
      </Row>
      <Table striped bordered className="mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>IS Admin</th>
          </tr>
        </thead>
        {user.map((item) => {
          return (
            <>
              <tr>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.isadmin ? "true" : "false"}</td>
              </tr>
            </>
          );
        })}

        <tbody></tbody>
      </Table>
    </>
  );
};

export default AdminUserScreen;
