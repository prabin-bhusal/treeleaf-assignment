import React, { useState } from "react";
import { nepalDistricts, nepalProvinces, countries } from "../assets/data";
import { Container, Col, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Forms() {
  const notifyError = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifySuccess = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDOB] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("nepal");
  const [user, setUser] = useState();

  const randomID = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const id = [];

    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * 7);
      id.push(charset[randomIndex]);
    }

    return id.join("");
  };

  const validateData = (data) => {
    const errors = [];

    if (!data.name) {
      errors.push("Name is required");
    }
    if (!data.email) {
      errors.push("Email is required");
    }
    if (!data.phone) {
      errors.push("Phone number is required");
    }

    if (!data.dob) {
      errors.push("DOB is required");
    }

    if (!data.city) {
      errors.push("City is required");
    }

    if (!data.district) {
      errors.push("District is required");
    }

    if (!data.province) {
      errors.push("Province is required");
    }

    if (!data.country) {
      errors.push("Country is required");
    }

    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
      errors.push("Invalid email format");
    }

    if (data.phone && !/^\d{7,}$/.test(data.phone)) {
      errors.push(
        "Phone number must be at least 7 digits and contain only numbers"
      );
    }

    return errors;
  };

  const addRecord = (e) => {
    e.preventDefault();

    let data = {
      name,
      email,
      phone,
      dob,
      city,
      district,
      province,
      country,
    };

    let errors = validateData(data);

    if (errors.length > 0) {
      errors.map((e) => {
        notifyError(e);
      });
    } else {
      console.log("heeee", randomID());
      const info = {
        id: randomID(),
        data: data,
      };

      const existingData = localStorage.getItem("ProfileApp");
      let entryData = {};
      if (existingData) {
        entryData = JSON.parse(existingData);
      }

      entryData[info.id] = info;

      try {
        console.log("entrydata:", entryData);
        localStorage.setItem("ProfileApp", JSON.stringify(entryData));
        console.log("New record added");
        window.location.reload();
        notifySuccess("Record Added");
      } catch (error) {
        console.log("Error adding record:", error);
      }
    }

    setUser(user);
  };

  const resetRecord = () => {
    console.log("Reset");
    setName("");
    setEmail("");
    setPhone("");
    setDOB("");
    setCity("");
    setDistrict("");
    setProvince("");
    setCountry("Nepal");
  };

  const getRecord = () => {
    const existingData = localStorage.getItem("ProfileApp");
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="form-container">
        <form action="" onSubmit={addRecord}>
          <Container>
            <Row className="form-row">
              <Col md={6}>
                <label className="fullname">
                  Name:
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    placeholder="Enter full name"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>
              </Col>
              <Col md={6}>
                <label className="email">
                  Email:
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
              </Col>
            </Row>

            <Row className="form-row">
              <Col md={6}>
                <label className="phone">
                  Phone Number:
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </label>
              </Col>
              <Col md={6}>
                <label className="dob">
                  DOB:
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    placeholder="Enter dob"
                    onChange={(e) => setDOB(e.target.value)}
                    required
                  />
                </label>
              </Col>
            </Row>

            <Row className="form-row">
              <Col md={6}>
                <label className="city">
                  City:
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Enter city name"
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </label>
              </Col>
              <Col md={6}>
                <label className="district">
                  District:
                  <select
                    id="district"
                    name="district"
                    placeholder="Enter district name"
                    defaultValue={"arghakhanchi"}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                  >
                    {nepalDistricts.map((district, index) => {
                      return (
                        <option
                          key={index}
                          defaultValue={"arghakhanchi"}
                          value={district.toLocaleLowerCase()}
                        >
                          {district}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </Col>
            </Row>
            <Row className="form-row">
              <Col md={6}>
                <label className="province">
                  Province:
                  <select
                    id="province"
                    name="province"
                    placeholder="Enter province name"
                    onChange={(e) => setProvince(e.target.value)}
                    required
                  >
                    {nepalProvinces.map((province, index) => {
                      return (
                        <option
                          defaultValue={"lumbini"}
                          key={index}
                          value={province.toLocaleLowerCase()}
                        >
                          {province}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </Col>
              <Col md={6}>
                <label className="country">
                  Country:
                  <select
                    id="country"
                    name="country"
                    placeholder="Enter country name"
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {countries.map((country, index) => {
                      return (
                        <option
                          defaultValue={"nepal"}
                          key={index}
                          value={country.toLocaleLowerCase()}
                          // disabled={true}
                        >
                          {country}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </Col>
            </Row>
            <div className="form-btn">
              <button type="submit">Add Record</button>
              <button type="reset">Reset Form</button>
            </div>
          </Container>
        </form>
      </div>
    </>
  );
}
