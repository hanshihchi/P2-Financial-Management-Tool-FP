import React, { useState } from 'react';
import createGroupExpense from '../modules/GroupExpense';
import createSplitting from '../modules/Splitting';

const GroupExpense = () => {
  const groupExpenseModule = createGroupExpense();
  const splittingModule = createSplitting();
  const [group, setGroup] = useState(null);
  const [newMemberId, setNewMemberId] = useState('');

  // Create a new group with dummy members
  const handleCreateGroup = () => {
    const newGroup = groupExpenseModule.createGroup([{ id: 'user1' }, { id: 'user2' }]);
    setGroup(newGroup);
  };

  // Add a new expense to the group
  const handleAddGroupExpense = (e) => {
    e.preventDefault();
    if (!group) return;
    const form = e.target;
    const expense = {
      id: Math.floor(Math.random() * 1000),
      date: form.date.value,
      amount: parseFloat(form.amount.value),
      category: form.category.value,
      description: form.description.value,
      payer: form.payer.value,
    };
    const updatedGroup = groupExpenseModule.addExpense(group, expense);
    setGroup(updatedGroup);
    form.reset();
  };

  // Add a new member to the group
  const handleAddMember = () => {
    if (!group || !newMemberId.trim()) return;
    const newMember = { id: newMemberId.trim() };
    const updatedGroup = groupExpenseModule.addMember(group, newMember);
    setGroup(updatedGroup);
    setNewMemberId('');
  };

  // Remove a member from the group
  const handleRemoveMember = (memberId) => {
    if (!group) return;
    const updatedGroup = groupExpenseModule.removeMember(group, memberId);
    setGroup(updatedGroup);
  };

  return (
    <section style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '20px' }}>
      <h2>Group Expense Sharing</h2>
      <button onClick={handleCreateGroup}>Create Group</button>
      {group && (
        <div>
          <h3>Group Details</h3>
          <p>Group ID: {group.id}</p>
          <p>
            Members:{' '}
            {group.members.map((m) => (
              <span key={m.id} style={{ marginRight: '10px' }}>
                {m.id}{' '}
                <button onClick={() => handleRemoveMember(m.id)} style={{ fontSize: 'small' }}>
                  Remove
                </button>
              </span>
            ))}
          </p>
          <div style={{ marginTop: '10px' }}>
            <input
              type="text"
              placeholder="New member ID"
              value={newMemberId}
              onChange={(e) => setNewMemberId(e.target.value)}
            />
            <button onClick={handleAddMember}>Add Member</button>
          </div>
        </div>
      )}
      {group && (
        <form onSubmit={handleAddGroupExpense}>
          <h3>Add Group Expense</h3>
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
          <button type="submit">Add Group Expense</button>
        </form>
      )}
      {group && group.expenses.length > 0 && (
        <div>
          <h3>Group Expenses</h3>
          <ul>
            {group.expenses.map((exp) => (
              <li key={exp.id}>
                {exp.date} - {exp.amount} ({exp.category}) - {exp.description}
              </li>
            ))}
          </ul>
          <h3>Expense Splitting (Equal)</h3>
          <pre>
            {JSON.stringify(
              splittingModule.splitExpense(
                group.expenses[group.expenses.length - 1],
                group.members,
                'equal'
              ),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </section>
  );
};

export default GroupExpense;
