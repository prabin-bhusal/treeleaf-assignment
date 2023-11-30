import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavButtonComponent() {
  return (
    <>
      <Container className="linkButton">
        <p>Navigate to profiles page to view all the profiles of people</p>
        <Link to={"/profiles"}>
          <button className="btn btn-primary p-4">Profiles Page</button>
        </Link>
      </Container>
    </>
  );
}
