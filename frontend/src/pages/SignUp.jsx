import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="w-100 min-vh-100 d-flex align-items-center justify-content-center flex-column">
      <div className="col-sm-3">
        <h1 className="mb-3">Sign Up</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name*</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email*</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password*</Form.Label>
            <Form.Control type="password" placeholder="Create a password" />
            <p style={{ opacity: 0.5 }}>Must be at least 8 characters.</p>
          </Form.Group>
        </Form>
      </div>
      <button
        style={{ color: "#fff", backgroundColor: "#7F56D9" }}
        className="btn mt-3 col-sm-3"
        type="submit"
      >
        Submit
      </button>
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
export default SignUp;
