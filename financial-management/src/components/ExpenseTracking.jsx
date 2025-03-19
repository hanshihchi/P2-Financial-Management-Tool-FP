import React, { useState } from 'react';
import createTransaction from '../modules/Transaction';
import createVisualization from '../modules/Visualization';

const ExpenseTracking = ({ onTransactionAdded, goal, updateGoal }) => {
  const transactionModule = createTransaction();
  const visualizationModule = createVisualization();
  const [transactions, setTransactions] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const form = e.target;
    const transaction = {
      id: transactions.length + 1,
      date: form.date.value,
      amount: parseFloat(form.amount.value),
      category: form.category.value,
      description: form.description.value,
      payer: form.payer.value,
    };
    const updatedTransactions = transactionModule.addTransaction(transactions, transaction);
    setTransactions(updatedTransactions);
    form.reset();

    // update a financial goal if one exists
    if (goal && updateGoal) {
      updateGoal(transaction);
    }

    if (onTransactionAdded) {
      onTransactionAdded(updatedTransactions);
    }
  };

  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
  };

  const filteredTransactions = filterDate
    ? transactionModule.filterByDate(transactions, filterDate)
    : transactions;

  const categorizedData = transactionModule.categorizeTransactions(transactions);
  const trendsData = visualizationModule.renderTrends(transactions);

  return (
    <section style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <h2>Expense Tracking & Visualization</h2>
      <form onSubmit={handleAddTransaction}>
        <h3>Add Transaction</h3>
        <div>
          <label>
            Date: <input type="date" name="date" required />
          </label>
        </div>
        <div>
          <label>
            Amount: <input type="number" step="0.01" name="amount" required />
          </label>
        </div>
        <div>
          <label>
            Category: <input type="text" name="category" required />
          </label>
        </div>
        <div>
          <label>
            Description: <input type="text" name="description" />
          </label>
        </div>
        <div>
          <label>
            Payer: <input type="text" name="payer" required />
          </label>
        </div>
        <button type="submit">Add Transaction</button>
      </form>

      <div style={{ marginTop: '10px' }}>
        <h3>Filter Transactions by Date</h3>
        <input type="date" value={filterDate} onChange={handleFilterChange} />
      </div>

      <div>
        <h3>Daily Expense Log</h3>
        <ul>
          {filteredTransactions.map((tx) => (
            <li key={tx.id}>
              {tx.date} - {tx.amount} ({tx.category}) - {tx.description}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Categorical Breakdown</h3>
        <pre>{JSON.stringify(categorizedData, null, 2)}</pre>
      </div>

      <div>
        <h3>Trend Analysis</h3>
        <pre>{trendsData}</pre>
      </div>
    </section>
  );
};

export default ExpenseTracking;
