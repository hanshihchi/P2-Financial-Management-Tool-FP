import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router';

const HomePage = ({ currentBalance }) => {
  return (
    <Container fluid className="my-4">
      <h2 className="text-center my-3">Current Balance: ${currentBalance.toFixed(2)}</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Income Management</Card.Title>
              <Card.Text>Manage and analyze your incomes.</Card.Text>
              <Button as={Link} to="/income" variant="primary">
                Go
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Expense Management</Card.Title>
              <Card.Text>Manage and analyze your expenses.</Card.Text>
              <Button as={Link} to="/expense" variant="primary">
                Go
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Group Expense Sharing</Card.Title>
              <Card.Text>Manage your groups and shared expenses.</Card.Text>
              <Button as={Link} to="/group" variant="primary">
                Go 
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Financial Goal Setting & Tracking</Card.Title>
              <Card.Text>Set and track your financial goals.</Card.Text>
              <Button as={Link} to="/goal" variant="primary">
                Go 
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
