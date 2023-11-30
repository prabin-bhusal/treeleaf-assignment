import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Col,
  Row,
  Form,
} from "react-bootstrap";

import { nepalDistricts, nepalProvinces, countries } from "../assets/data";

export default function TableData() {
  const [data, setData] = useState({});
  const [displayCount, setDisplayCount] = useState(5);

  const [show, setShow] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // form data
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState("");
  const [dob, setDOB] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("nepal");

  const getRecord = () => {
    const existingData = localStorage.getItem("ProfileApp");
    if (existingData) {
      setData(JSON.parse(existingData));
    }
  };

  useEffect(() => {
    getRecord();
    console.log("Refreshed");
    console.log(data);
  }, []);

  const handleLoadMore = () => {
    setDisplayCount((prevCount) => prevCount + 5); // Increase display count by 5
  };

  const handleEdit = (key) => {
    setSelectedKey(key);
    console.log(data[key]);
    setName(data[key].data.name);
    setEmail(data[key].data.email);
    setPhone(data[key].data.phone);
    setCity(data[key].data.city);
    setDOB(data[key].data.dob);
    setDistrict(data[key].data.district);
    setCountry(data[key].data.country);
    handleShow(); // Open the modal
  };

  const handleEditChange = (e) => {
    e.preventDefault();
    // let keyIndex = selectedKey;

    const existingData = JSON.parse(localStorage.getItem("ProfileApp"));
    console.log(1);
    if (existingData && existingData.hasOwnProperty(selectedKey)) {
      console.log(2);
      const updatedData = { ...existingData };

      console.log(updatedData[selectedKey].data.name);
      updatedData[selectedKey].data.name = name;
      updatedData[selectedKey].data.email = email;
      updatedData[selectedKey].data.phone = phone;
      updatedData[selectedKey].data.city = city;
      updatedData[selectedKey].data.district = district;
      updatedData[selectedKey].data.dob = dob;
      updatedData[selectedKey].data.province = province;
      console.log(updatedData);

      localStorage.setItem("ProfileApp", JSON.stringify(updatedData));
      console.log("Data updated successfully!");
      window.location.reload();
    } else {
      console.log("Error: Something went wrong while editing data.");
    }
  };

  const handleRemove = (key) => {
    setSelectedKey(key);
    const existingData = JSON.parse(localStorage.getItem("ProfileApp"));
    if (existingData && existingData.hasOwnProperty(key)) {
      const updatedData = { ...existingData };
      delete updatedData[key];
      console.log("Deleted");
      localStorage.setItem("ProfileApp", JSON.stringify(updatedData));
      window.location.reload();
    } else {
      console.log("something wrong");
    }
    // console.log(data);
  };

  return (
    <div className="mt-5">
      <Table striped className="m-2 table_data">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).length > 0 ? (
            Object.keys(data)
              .slice(0, displayCount)
              .map((key, i) => {
                const item = data[key];
                return (
                  <tr key={key}>
                    <td>{i + 1}</td>
                    <td>{item.data.name}</td>
                    <td>{item.data.phone}</td>
                    <td>
                      <Button
                        className="ml-1"
                        variant="primary"
                        onClick={() => handleEdit(key)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="ml-1"
                        variant="secondary"
                        onClick={() => handleRemove(key)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
          {/* Load More button */}
          {Object.keys(data).length > displayCount && (
            <tr>
              <td colSpan="4">
                <div className="center-align">
                  <Button
                    className="ml-1"
                    variant="warning"
                    onClick={handleLoadMore}
                  >
                    Load More
                  </Button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleEditChange}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Use the selectedKey to display dynamic content */}
            {selectedKey && (
              <>
                <p>ID: {data[selectedKey].id}</p>
                <p>Name: {data[selectedKey].data.name}</p>
                <p>Email Address: {data[selectedKey].data.email}</p>

                <Container>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          placeholder="Enter name"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          value={email}
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="Enter email"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          value={phone}
                          required
                          onChange={(e) => setPhone(e.target.value)}
                          type="text"
                          placeholder="Enter phone"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3" controlId="formDOB">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          value={dob}
                          required
                          onChange={(e) => setDOB(e.target.value)}
                          type="date"
                          placeholder="Enter dob"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          value={city}
                          required
                          onChange={(e) => setCity(e.target.value)}
                          type="text"
                          placeholder="Enter city"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>District</Form.Label>
                        <Form.Select
                          id="district"
                          name="district"
                          required
                          defaultValue={district}
                          onChange={(e) => setDistrict(e.target.value)}
                        >
                          {nepalDistricts.map((district, index) => {
                            return (
                              <option
                                key={index}
                                value={district.toLocaleLowerCase()}
                              >
                                {district}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Province</Form.Label>
                        <Form.Select
                          id="province"
                          name="province"
                          required
                          defaultValue={province}
                          onChange={(e) => setProvince(e.target.value)}
                        >
                          {nepalProvinces.map((province, index) => {
                            return (
                              <option
                                key={index}
                                value={province.toLocaleLowerCase()}
                              >
                                {province}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="ml-1" onClick={handleClose}>
              Close
            </Button>
            <Button
              className="ml-1"
              type="submit"
              variant="primary"
              onSubmit={(e) => handleEditChange}
              onClick={handleClose}
            >
              Edit Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
