import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

export const SignIn = () => {
  const navigate = useNavigate();
  return (
    <div className="w-100 min-vh-100 d-flex align-items-center justify-content-center flex-column">
      <div className="col-sm-3">
        <h1 className="mb-3">Sign Up</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name or Email</Form.Label>
            <Form.Control type="text" placeholder="Enter your name/email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" />
          </Form.Group>
        </Form>
      </div>
      <Button
        style={{ backgroundColor: "#7F56D9" }}
        className="mt-3 col-sm-3"
        type="submit"
      >
        Submit
      </Button>
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
};
