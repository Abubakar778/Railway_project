import React, { useState, useEffect } from "react";
import FormContainer from "./FormContainer";
import { Form, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../features/auth/loginSlice";
import Loader from "./Loader.jsx";
import Message from "./Message.jsx";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector(loginSelector);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const redirect = query.get("redirect") === null ? "/" : query.get("redirect");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      if (redirect.includes("admin") && userInfo.isadmin) {
        navigate(redirect);
      } else if (!redirect.includes("admin")) {
        navigate(redirect);
      }
    }
  }, [userInfo, navigate, redirect]);

  return (
    <>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}

      <div className="mx-5 py-5 ">
        <div className=" contianer my-5  bg-white py-5  container rounded form-shadow">
          <FormContainer title={"Login"}>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(event) => setemail(event.target.value)}
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

              <Button variant="success" type="submit">
                Login
              </Button>
            </Form>
            <p className="pt-2">
              Don't have an account? <Link to={"/register"}>Register</Link>
            </p>
          </FormContainer>
        </div>
      </div>
    </>
  );
};

export default Login;
