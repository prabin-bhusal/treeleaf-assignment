import React, { useState } from "react";
import { Link } from "react-router-dom";
import Toggle from "react-toggle";
import "react-toggle/style.css";

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  return (
    <>
      <div className="nav">
        <div className="brand">
          <Link to="/">
            <h3>ProfileApp</h3>
          </Link>
        </div>
      </div>
    </>
  );
}
