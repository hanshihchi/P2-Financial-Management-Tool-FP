// src/App.jsx
import React from 'react';
import ExpenseTracking from './components/ExpenseTracking';
import GroupExpense from './components/GroupExpense';
import FinancialGoal from './components/FinancialGoal';

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Financial Management Tool</h1>
      <ExpenseTracking />
      <GroupExpense />
      <FinancialGoal />
    </div>
  );
}

export default App;
