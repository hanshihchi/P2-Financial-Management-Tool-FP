import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import BaseTemplate from './pages/templates/BaseTemplate';
import HomePage from './pages/HomePage';
import IncomePage from './pages/IncomePage';
import ExpensePage from './pages/ExpensePage';
import GroupPage from './pages/GroupPage';
import GoalPage from './pages/GoalPage';
import { readTran } from './db/myFirestoreTran';

function App() {
  const [balance, setBalance] = useState(0);

  // Compute initial balance from persisted transactions on mount
  useEffect(() => {
    async function computeInitialBalance() {
      const transactions = await readTran();
      let computedBalance = 0;
      transactions.forEach(tx => {
        if (tx.type === 'income') {
          computedBalance += tx.amount;
        } else if (tx.type === 'expense') {
          computedBalance -= tx.amount;
        }
      });
      setBalance(computedBalance);
    }
    computeInitialBalance();
  }, []);

  const handleAddIncome = (amount) => {
    setBalance(prev => prev + amount);
  };

  const handleRemoveIncome = (amount) => {
    setBalance(prev => prev - amount);
  };

  const handleAddExpense = (amount) => {
    setBalance(prev => prev - amount);
  };

  const handleRemoveExpense = (amount) => {
    setBalance(prev => prev + amount);
  };

  return (
    <div className="app-container">
    <BrowserRouter>
    <BaseTemplate>
      <Routes>
        <Route path="/" element={<HomePage currentBalance={balance} />} />
        <Route
          path="/income"
          element={<IncomePage currentBalance={balance} onIncomeAdded={handleAddIncome} onIncomeRemoved={handleRemoveIncome} />}
        />
        <Route
          path="/expense"
          element={<ExpensePage currentBalance={balance} onExpenseAdded={handleAddExpense} onExpenseRemoved={handleRemoveExpense} />}
        />
        <Route path="/group" element={<GroupPage />} />
        <Route path="/goal" element={<GoalPage currentBalance={balance} />} />
      </Routes>
      </BaseTemplate>
    </BrowserRouter>
    </div>
  );
}

export default App;
