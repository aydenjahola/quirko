import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "./NavBar";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              style={{ padding: "0.5rem 1rem", marginTop: "30px" }}
            >
              Reset Password
            </Button>
          </Form>
          <div className="W-100 text-center mt-3">
            <Link to="/login">login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="W-100 text-center mt-2">
        need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
