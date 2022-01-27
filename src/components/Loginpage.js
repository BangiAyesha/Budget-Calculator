import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import SocialButton from "./SocialButton";

export default function Loginpage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const URL = "http://localhost:3001/details";
    axios.get(URL).then((res) => {
      setData(res.data);
    });
  }, []);

  const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;
    let user_present = false;
    data.map((value) => {
      if (
        (email === value.email || email === value.username) &&
        password === value.password
      ) {
        user_present = true;
      }
    });

    if (user_present) {
      navigate("/home");
    } else {
      alert("Register or enter correct details");
    }
  };
  const [details, setDetails] = useState([]);
  const handleSocialLogin = (user) => {
    console.log(user);
    setDetails(user._profile);
    navigate("/home");
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };
  return (
    <Container>
      <Form
        style={{
          marginTop: "20vh",
          marginLeft: "40vh",
          width: "100vh",
          border: "1px solid black",
          padding: "5vh",
          borderRadius: "10px",
        }}
      >
        <h2 className="text-center">Login</h2>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" id="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id="pass" placeholder="Password" />
        </Form.Group>

        <div className="text-center">
          <Button variant="warning" type="submit" onClick={login}>
            Submit
          </Button>
          <br />
          <br />
          <SocialButton
            provider="facebook"
            appId="302989334798085"
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
            variant="primary"
          >
            Login with Facebook
          </SocialButton>
          &nbsp;
          <SocialButton
            provider="google"
            appId="1064501936748-nup9k0cldnqbe2uue2bceavriq0t0ek8.apps.googleusercontent.com"
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
            variant="danger"
          >
            Login with Gmail
          </SocialButton>
          <br></br>
          <br></br>
          <Button
            variant="link"
            type="button"
            onClick={() => {
              navigate("/register");
            }}
          >
            Don't have an account? Click Here
          </Button>
        </div>
      </Form>
    </Container>
  );
}
