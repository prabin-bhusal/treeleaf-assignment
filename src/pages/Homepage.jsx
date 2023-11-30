import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { default as Forms } from "../components/Forms";
import TableData from "../components/TableData";
import NavButtonComponent from "../components/NavButtonComponent";

export default function Homepage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Hero />
        <Forms />
        <TableData />
        <NavButtonComponent />
      </div>
    </>
  );
}
