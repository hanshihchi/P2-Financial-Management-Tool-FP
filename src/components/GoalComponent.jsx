import React, { useState, useEffect } from 'react';
import { createGoalFirestore, readGoalsFirestore, deleteGoalFirestore } from '../db/myFirestoreGoals';

const GoalComponent = ({ currentBalance }) => {
  const [goals, setGoals] = useState([]);
  const [newGoalData, setNewGoalData] = useState({
    targetAmount: '',
    deadline: '',
    description: ''
  });

  useEffect(() => {
    async function fetchGoals() {
      const fetchedGoals = await readGoalsFirestore();
      setGoals(fetchedGoals);
    }
    fetchGoals();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoalData(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    const goalData = {
      targetAmount: parseFloat(newGoalData.targetAmount),
      deadline: newGoalData.deadline,
      description: newGoalData.description,
      createdAt: new Date().toISOString(),
    };
    const id = await createGoalFirestore(goalData);
    const newGoal = { ...goalData, id };
    setGoals(prev => [...prev, newGoal]);
    setNewGoalData({ targetAmount: '', deadline: '', description: '' });
  };

  const handleDeleteGoal = async (id) => {
    await deleteGoalFirestore(id);
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const calculateDaysLeft = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateAveragePerDay = (targetAmount, currentBalance, deadline) => {
    const daysLeft = calculateDaysLeft(deadline);
    if (daysLeft > 0) {
      const remaining = targetAmount - currentBalance;
      return (remaining / daysLeft).toFixed(2);
    }
    return 'Deadline passed';
  };

  return (
    <div>
      <h3>Create New Goal</h3>
      <form onSubmit={handleCreateGoal}>
        <div>
          <label>
            Target Amount: <input type="number" step="0.01" name="targetAmount" value={newGoalData.targetAmount} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Deadline: <input type="date" name="deadline" value={newGoalData.deadline} onChange={handleInputChange} required />
          </label>
        </div>
        <div>
          <label>
            Description: <input type="text" name="description" value={newGoalData.description} onChange={handleInputChange} />
          </label>
        </div>
        <button type="submit">Create Goal</button>
      </form>
      <div>
        <h3>My Goals</h3>
        {goals.length === 0 ? (
          <p>No goals created yet.</p>
        ) : (
          <ul>
            {goals.map(goal => {
              const daysLeft = calculateDaysLeft(goal.deadline);
              const averagePerDay = calculateAveragePerDay(goal.targetAmount, currentBalance, goal.deadline);
              return (
                <li key={goal.id} style={{ marginBottom: '10px' }}>
                  <p><strong>Target:</strong> {goal.targetAmount}</p>
                  <p>
                    <strong>Deadline:</strong> {goal.deadline} (
                    {daysLeft > 0 ? `${daysLeft} days left` : "Deadline passed"})
                  </p>
                  <p><strong>Current Balance:</strong> {currentBalance}</p>
                  <p><strong>Average per day:</strong> {averagePerDay}</p>
                  <p><strong>Description:</strong> {goal.description}</p>
                  <button onClick={() => handleDeleteGoal(goal.id)}>Remove Goal</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GoalComponent;
