import React, { useState } from 'react';
import { deleteTran } from '../db/myFirestoreTran';
import { Collapse, Row, Col, Form } from 'react-bootstrap';

const ExpenseLog = ({ expenses, onRemoveExpense }) => {
  const [sortOption, setSortOption] = useState("added");
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    date: '',
    category: '',
    minAmount: '',
    maxAmount: ''
  });

  const toggleFilter = () => {
    setFilterVisible(prev => !prev);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterCriteria(prev => ({ ...prev, [name]: value }));
  };

  const filteredExpenses = expenses.filter(exp => {
    let valid = true;
    if (filterCriteria.date && exp.date !== filterCriteria.date) valid = false;
    if (filterCriteria.category && exp.category.toLowerCase() !== filterCriteria.category.toLowerCase()) valid = false;
    if (filterCriteria.minAmount && exp.amount < parseFloat(filterCriteria.minAmount)) valid = false;
    if (filterCriteria.maxAmount && exp.amount > parseFloat(filterCriteria.maxAmount)) valid = false;
    return valid;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === "added") {
      return a.createdAt - b.createdAt;
    }
    return 0;
  });

  const handleRemove = async (id, amount) => {
    await deleteTran(id);
    if (onRemoveExpense) {
      onRemoveExpense(id, amount);
    }
  };

  return (
    <div>
      <h3>Daily Expense Log</h3>
      <div>
        <Form.Group className="mb-3">
          <Form.Label>Sort by:</Form.Label>
          <Form.Control as="select" value={sortOption} onChange={handleSortChange}>
            <option value="added">Added Order</option>
            <option value="date">Date</option>
          </Form.Control>
        </Form.Group>

        <button className="btn btn-outline-secondary mb-3" onClick={toggleFilter}>
          {filterVisible ? "Hide Filters" : "Show Filters"}
        </button>

        <Collapse in={filterVisible}>
          <div className="bg-light p-3 border rounded">
            <Row className="mb-2">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control type="date" name="date" value={filterCriteria.date} onChange={handleFilterChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Category:</Form.Label>
                  <Form.Control type="text" name="category" value={filterCriteria.category} onChange={handleFilterChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Min Amount:</Form.Label>
                  <Form.Control type="number" step="0.01" name="minAmount" value={filterCriteria.minAmount} onChange={handleFilterChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Max Amount:</Form.Label>
                  <Form.Control type="number" step="0.01" name="maxAmount" value={filterCriteria.maxAmount} onChange={handleFilterChange} />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Collapse>
      </div>
      <ul>
        {sortedExpenses.map(exp => (
          <li key={exp.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{exp.date} - {exp.amount} ({exp.category}) - {exp.description}</span>
            <button onClick={() => handleRemove(exp.id, exp.amount)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseLog;
