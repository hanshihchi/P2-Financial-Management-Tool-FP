import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import AddExpense from '../components/AddExpense';
import ExpenseLog from '../components/ExpenseLog';
import ExpenseCategorical from '../components/ExpenseCategorical';
import ExpenseTrend from '../components/ExpenseTrend';
import { readTran } from '../db/myFirestoreTran';

const ExpensePage = ({ currentBalance, onExpenseAdded, onExpenseRemoved }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchExpenses() {
      const all = await readTran();
      const expenseTransactions = all.filter(tx => tx.type === 'expense');
      setExpenses(expenseTransactions);
    }
    fetchExpenses();
  }, []);

  const handleNewExpense = (newExpense) => {
    setExpenses(prev => [...prev, newExpense]);
    if (onExpenseAdded) {
      onExpenseAdded(newExpense.amount);
    }
  };

  const handleExpenseRemoval = (id, amount) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
    if (onExpenseRemoved) {
      onExpenseRemoved(amount);
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Current Balance: ${currentBalance.toFixed(2)}</h2>
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
                <AddExpense onNewExpense={handleNewExpense} />
              </Col>
              <Col md={6}>
                <ExpenseLog expenses={expenses} onRemoveExpense={handleExpenseRemoval} />
              </Col>
            </Row>
          </Tab.Pane>
          <Tab.Pane eventKey="analyze">
            <Row>
              <Col md={6}>
                <ExpenseCategorical expenses={expenses} />
              </Col>
              <Col md={6}>
                <ExpenseTrend expenses={expenses} />
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default ExpensePage;
