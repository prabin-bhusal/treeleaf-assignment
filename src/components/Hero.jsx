import React, { useState, useEffect } from "react";

export default function Hero() {
  const [quotes, setQuotes] = useState("");

  async function getQuotes() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setQuotes(data.slip.advice);
  }

  useEffect(function () {
    getQuotes();
  }, []);

  return (
    <div className="hero-container">
      <p>
        Hello, Welcome to ProfileApp of Treeleaf.ai and here is your quote of
        the day for you: <span className="heroQuotes">{quotes}</span>
      </p>
      <h1>Profile App</h1>
    </div>
  );
}
