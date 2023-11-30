import React from "react";
import Navbar from "../components/Navbar";
import TableData from "../components/TableData";
import { Container } from "react-bootstrap";

export default function Profiles() {
  return (
    <>
      <Navbar />
      <Container>
        <TableData />
      </Container>
    </>
  );
}
