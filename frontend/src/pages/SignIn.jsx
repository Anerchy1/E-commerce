import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signInSubmit = () => {
    axios
      .post("http://localhost:8050/api/signin", { email, password })
      .then((res) => {
        if (res.status !== 200) {
          console.error(res.data.message);
        } else {
          console.log(res.data.message);
          localStorage.setItem("token", res.data.body.token);
          // setTimeout(() => {
          //   navigate("/signin");
          // });
        }
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="w-100 min-vh-100 d-flex align-items-center justify-content-center flex-column">
      <div className="col-sm-3">
        <h1 className="mb-3">Sign In</h1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            signInSubmit();
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="text"
              placeholder="Enter your name/email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter your password"
            />
          </Form.Group>

          <Button
            style={{ backgroundColor: "#7F56D9" }}
            className="mt-3 col-sm-3"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
      <div className="d-flex mt-3">
        <p className="me-3" style={{ opacity: 0.7 }}>
          Don't have an account?
        </p>

        <Link
          to={"/signup"}
          className="text-decoration-none"
          style={{ color: "#7F56D9" }}
        >
          Sign Up
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
}
