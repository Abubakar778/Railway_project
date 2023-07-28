import React, { useState } from "react";
import { loginSelector } from "../../features/auth/loginSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { Form, Button } from "react-bootstrap";
const AddCityScreen = () => {
  const { userInfo } = useSelector(loginSelector);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  const { token } = userInfo;
  const [Train, setTrain] = useState({
    name: "",
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
      .post("/admin/city", Train, config)
      .then((res) => {
        setloading(false);
        navigate("/admin/city");
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
      <div className="pt-5">
        <FormContainer title={"Add Train"}>
          <Form onSubmit={SubmitHadndler}>
            <Form.Group className="mb-3 required">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                required="true"
                value={Train.name}
                onChange={HandleInput}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              ADD
            </Button>
          </Form>
        </FormContainer>
      </div>
    </>
  );
};

export default AddCityScreen;
