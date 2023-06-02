import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const navigate = useNavigate();
  const signUpSubmit = () => {
    axios
      .post("http://localhost:8050/api/signup", { email, password, repassword })
      .then((res) => {
        if (res.status !== 200) {
          console.error(res.data.message);
        } else {
          console.log(res.data.message);
          setTimeout(() => {
            navigate("/signin");
          });
        }
        navigate("/signin");
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="w-100 min-vh-100 d-flex align-items-center justify-content-center flex-column">
      <div className="col-sm-3">
        <h1 className="mb-3">Sign Up</h1>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            signUpSubmit();
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter your email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Create a password"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Repassword*</Form.Label>
            <Form.Control
              value={repassword}
              onChange={(e) => {
                setRepassword(e.target.value);
              }}
              type="password"
              placeholder="Confirm a password"
            />
            <p style={{ opacity: 0.5 }}>Must be at least 8 characters.</p>
          </Form.Group>
          <button
            style={{ color: "#fff", backgroundColor: "#7F56D9" }}
            className="btn mt-3 col-sm-3"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </div>

      <div className="d-flex mt-3">
        <p className="me-3" style={{ opacity: 0.7 }}>
          Already have an account?
        </p>

        <Link
          to={"/signin"}
          className="text-decoration-none"
          style={{ color: "#7F56D9" }}
        >
          Sign in
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
}
