import React, { useState, useRef } from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { Form, Row, Col, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faDollarSign,
  faCreditCard,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

var expend = [];

export default function Home() {
  const [budget, setBudget] = useState(0);
  const [state, setState] = useState({ expense: 0, balance: 0 });
  const [data, setData] = useState([]);

  const budgets = useRef(null);
  const expense = useRef(null);
  const title = useRef(null);

  const submitBudget = (e) => {
    e.preventDefault();
    setBudget(budgets.current.value);
    setState({ expense: 0, balance: budgets.current.value });
    document.getElementById("budget").value = "";
  };

  const submitExpense = (e) => {
    e.preventDefault();
    let item = { title: title.current.value, expense: expense.current.value };
    setData([...data, item]);
    expend.push(parseInt(expense.current.value));
    let add = expend.reduce((a, b) => a + b, 0);
    let balance = budget - add;
    setState({
      expense: add,
      balance: balance,
    });
    document.getElementById("title").value = "";
    document.getElementById("expense").value = "";
  };
  const handleDelete = (index) => {
    expend.splice(index, 1);
    let add = expend.reduce((a, b) => a + b, 0);
    let balance = budget - add;
    setState({
      expense: add,
      balance: balance,
    });
    data.splice(index, 1);
  };
  const handleEdit = (index, value) => {
    document.getElementById("title").value = value.title;
    document.getElementById("expense").value = value.expense;
    expend.splice(index, 1);
    let add = expend.reduce((a, b) => a + b, 0);
    let bala = budget - add;
    setState({
      expense: add,
      balance: bala,
    });
    data.splice(index, 1);
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="/">Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div style={{ backgroundColor: "lightgrey" }}>
        <Container>
          <br />
          <h3 className="text-center">BUDGET CALCULATOR</h3>
          <br />
          <Row>
            <Col>
              <Form
                style={{
                  width: "500px",
                  border: "2px solid green",
                  padding: "2vh",
                }}
              >
                <Form.Group>
                  <Form.Label className="fw-bold">
                    Please Enter Your Budget
                  </Form.Label>
                  <Form.Control
                    style={{ border: "1px solid green" }}
                    type="number"
                    id="budget"
                    ref={budgets}
                  />
                </Form.Group>
                <br />
                <Button variant="outline-success" onClick={submitBudget}>
                  Calculate
                </Button>
              </Form>
            </Col>

            <Col className="text-center">
              <h4>BUDGET</h4>
              <FontAwesomeIcon
                icon={faMoneyBill}
                style={{ color: "cadetblue" }}
                size={"3x"}
              />
              <h1>{budget}</h1>
            </Col>

            <Col className="text-center">
              <h4>EXPENSES</h4>
              <FontAwesomeIcon
                icon={faCreditCard}
                style={{ color: "cadetblue" }}
                size={"3x"}
              />
              <h1>{state.expense}</h1>
            </Col>

            <Col className="text-center">
              <h4>BALANCE</h4>
              <FontAwesomeIcon
                style={{ color: "cadetblue" }}
                icon={faDollarSign}
                size={"3x"}
              />
              <h1>{state.balance}</h1>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <Form
                style={{
                  width: "500px",
                  border: "2px solid red",
                  padding: "2vh",
                }}
              >
                <Form.Group>
                  <Form.Label className="fw-bold">
                    Please Enter Your Expense Title
                  </Form.Label>
                  <Form.Control
                    style={{ border: "1px solid red" }}
                    type="text"
                    id="title"
                    required
                    ref={title}
                  />
                </Form.Group>
                <br />

                <Form.Group>
                  <Form.Label className="fw-bold">
                    Please Enter Expense Amount
                  </Form.Label>
                  <Form.Control
                    style={{ border: "1px solid red" }}
                    type="number"
                    id="expense"
                    ref={expense}
                    required
                  />
                </Form.Group>
                <br />
                <Button
                  variant="outline-danger"
                  type="submit"
                  onClick={submitExpense}
                >
                  Add Expense
                </Button>
              </Form>
              <br />
              <br />
            </Col>
            <Col>
              <Table>
                <thead>
                  <tr>
                    <th>Expense Title</th>
                    <th>Expense Value</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>{value.title}</td>
                        <td>{value.expense}</td>
                        <td>
                          <Button
                            variant="info"
                            onClick={() => handleEdit(index, value)}
                          >
                            <FontAwesomeIcon icon={faPencilAlt} />
                          </Button>
                          &nbsp;
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(index)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
