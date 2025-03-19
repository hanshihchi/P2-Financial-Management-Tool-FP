import React, { useState } from 'react';
import createFinancialGoal from '../modules/FinancialGoal';

const FinancialGoal = () => {
  const financialGoalModule = createFinancialGoal();
  const [goal, setGoal] = useState(null);

  const handleCreateGoal = (e) => {
    e.preventDefault();
    const form = e.target;
    const newGoal = financialGoalModule.createGoal(
      { id: 'user1', username: 'user1' },
      parseFloat(form.targetAmount.value),
      form.deadline.value
    );
    setGoal(newGoal);
    form.reset();
  };

  return (
    <section style={{ border: '1px solid #ccc', padding: '10px' }}>
      <h2>Financial Goal Setting & Tracking</h2>
      <form onSubmit={handleCreateGoal}>
        <h3>Create Goal</h3>
        <div>
          <label>
            Target Amount: <input type="number" step="0.01" name="targetAmount" required />
          </label>
        </div>
        <div>
          <label>
            Deadline: <input type="date" name="deadline" required />
          </label>
        </div>
        <button type="submit">Create Goal</button>
      </form>
      {goal && (
        <div>
          <h3>Goal Progress</h3>
          <p>Target: {goal.targetAmount}</p>
          <p>Current: {goal.currentAmount}</p>
          <p>Status: {goal.status}</p>
          <p>
            Progress: {financialGoalModule.trackProgress(goal).progress.toFixed(2)}%
          </p>
        </div>
      )}
    </section>
  );
};

export default FinancialGoal;
