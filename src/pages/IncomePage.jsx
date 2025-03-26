// src/pages/IncomePage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import AddIncome from '../components/AddIncome';
import IncomeLog  from '../components/IncomeLog';
import IncomeCategorical from '../components/IncomeCategorical';
import IncomeTrend from '../components/IncomeTrend';
import { readTran } from '../db/myFirestoreTran';

const IncomePage = ({ currentBalance, onIncomeAdded, onIncomeRemoved }) => {
  const [incomes, setIncomes] = useState([]);

  // Fetch incomes from Firestore on mount
  useEffect(() => {
    async function fetchIncomes() {
      const all = await readTran();
      const incomeTransactions = all.filter(tx => tx.type === 'income');
      setIncomes(incomeTransactions);
    }
    fetchIncomes();
  }, []);

  // Callback for new income added from AddIncome
  const handleNewIncome = (newIncome) => {
    setIncomes(prev => [...prev, newIncome]);
    if (onIncomeAdded) {
      onIncomeAdded(newIncome.amount);
    }
  };

  // Callback for removal from IncomeLog
  const handleIncomeRemoval = (id, amount) => {
    setIncomes(prev => prev.filter(income => income.id !== id));
    if (onIncomeRemoved) {
      onIncomeRemoved(amount);
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h2 className="text-center mb-4">Current Balance: ${currentBalance.toFixed(2)}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tab.Container defaultActiveKey="manage">
            <Nav variant="tabs" className="mb-3">
              <Nav.Item>
                <Nav.Link eventKey="manage">Manage</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="analyze">Analyze</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="manage">
                <Row>
                  <Col md={6}>
                    <AddIncome onNewIncome={handleNewIncome} />
                  </Col>
                  <Col md={6}>
                    <IncomeLog incomes={incomes} onRemoveIncome={handleIncomeRemoval} />
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="analyze">
                <Row>
                  <Col md={6}>
                    <IncomeCategorical incomes={incomes}/>
                  </Col>
                  <Col md={6}>
                    <IncomeTrend  incomes={incomes}/>
                  </Col>
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default IncomePage;
