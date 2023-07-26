import React, { useState, useEffect } from "react";
import FormContainer from "./FormContainer";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registorUser } from "../features/auth/registorSlice";
import {
  registorSelector,
  resetRegistor,
} from "../features/auth/registorSlice";
import Loader from "./Loader";
import Message from "./Message";
import { loginSelector } from "../features/auth/loginSlice";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [text, settext] = useState("");

  const { loading, success, error } = useSelector(registorSelector);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(registorUser(name, email, password, confirmpassword));
  };
  useEffect(() => {
    if (success) {
      dispatch(resetRegistor);
      navigate("/");
    }
  }, [success, dispatch, navigate]);

  return (
    <>
      {loading && <Loader></Loader>}
      {error && <Message>{error}</Message>}
      <div className="mx-5 py-5">
        <div className="container py-5 bg-white rounded form-shadow">
          <FormContainer title={"Register"}>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmpassword}
                  onChange={(e) => setconfirmpassword(e.target.value)}
                />
              </Form.Group>
              {text && <Message>{text}</Message>}

              <Button variant="primary" type="submit">
                Registor
              </Button>
            </Form>
            <p className="mt-2">
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </FormContainer>
        </div>
      </div>
    </>
  );
};

export default Register;
