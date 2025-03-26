import React, { useState } from 'react';
import createSplitting from '../modules/Splitting';
import { Collapse, Row, Col, Form } from 'react-bootstrap';
import { updateGroupFirestore } from '../db/myFirestoreGroups';

const GroupExpenseRight = ({ group, onGroupChange }) => {
  const splittingModule = createSplitting();
  const [sortOption, setSortOption] = useState("added");
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    date: '',
    category: '',
    minAmount: '',
    maxAmount: ''
  });

  if (!group) {
    return <div><h3>No Group Selected</h3></div>;
  }

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

  const filteredExpenses = (group.expenses || []).filter(expense => {
    let valid = true;
    if (filterCriteria.date && expense.date !== filterCriteria.date) valid = false;
    if (filterCriteria.category && expense.category.toLowerCase() !== filterCriteria.category.toLowerCase()) valid = false;
    if (filterCriteria.minAmount && expense.amount < parseFloat(filterCriteria.minAmount)) valid = false;
    if (filterCriteria.maxAmount && expense.amount > parseFloat(filterCriteria.maxAmount)) valid = false;
    return valid;
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortOption === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOption === "added") {
      return a.createdAt - b.createdAt
    }
    return 0;
  });

	const handleRemoveExpense = async (expenseIndex) => {
    const updatedExpenses = group.expenses.filter((_, index) => index !== expenseIndex);
    // Update Firestore with the new expenses array.
    await updateGroupFirestore(group.id, { expenses: updatedExpenses });
    // Call the parent's callback to update the selected group.
    onGroupChange({ ...group, expenses: updatedExpenses });
  };

	// Compute the total expense from all group expenses.
  const totalExpense = (group.expenses || []).reduce((sum, exp) => sum + exp.amount, 0);
  // Prepare an object for splitting.
  const totalExpenseObj = { amount: totalExpense };
  // Calculate splitting based on the total expense.
  const splittingResult = splittingModule.splitExpense(totalExpenseObj, group.members, 'equal');

  return (
    <div>
      <h3>Group Expenses</h3>
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
        {sortedExpenses.map((exp, index) => (
          <li key={index}>
            <span>{exp.date} - {exp.amount} ({exp.category}) - {exp.description}</span>
						<button onClick={() => handleRemoveExpense(index)}>Remove</button>
          </li>
        ))}
      </ul>
      
      <h3>Expense Splitting (Equal)</h3>
			<strong>Total Amount: </strong> {totalExpense}
      <pre>{JSON.stringify(splittingResult, null, 2)}</pre>
    </div>
  );
};

export default GroupExpenseRight;
