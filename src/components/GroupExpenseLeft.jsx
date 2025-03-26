import React, { useState, useEffect } from 'react';
import { createGroupFirestore, readGroupsFirestore, updateGroupFirestore, deleteGroupFirestore } from '../db/myFirestoreGroups';

const GroupExpenseLeft = ({ onGroupChange }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [expenseFormData, setExpenseFormData] = useState({
    date: '',
    amount: '',
    category: '',
    description: '',
    payer: '',
  });
  const [newMemberId, setNewMemberId] = useState('');

  useEffect(() => {
    async function fetchGroups() {
      const fetchedGroups = await readGroupsFirestore();
      setGroups(fetchedGroups);
      if (fetchedGroups.length > 0) {
        setSelectedGroupId(fetchedGroups[0].id);
        if (onGroupChange) onGroupChange(fetchedGroups[0]);
      }
    }
    fetchGroups();
  }, [onGroupChange]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const groupData = {
      name: newGroupName,
      members: [],
      expenses: [],
    };
    const id = await createGroupFirestore(groupData);
    const newGroup = { ...groupData, id };
    setGroups(prev => [...prev, newGroup]);
    setNewGroupName('');
    setSelectedGroupId(id);
    if (onGroupChange) onGroupChange(newGroup);
  };

  const handleGroupChange = (e) => {
    const groupId = e.target.value;
    setSelectedGroupId(groupId);
    const currentGroup = groups.find(g => g.id === groupId);
    if (onGroupChange) onGroupChange(currentGroup);
  };

  const handleDeleteGroup = async () => {
    if (!selectedGroupId) return;
    await deleteGroupFirestore(selectedGroupId);
    const updatedGroups = groups.filter(g => g.id !== selectedGroupId);
    setGroups(updatedGroups);
    const newSelected = updatedGroups.length > 0 ? updatedGroups[0] : null;
    setSelectedGroupId(newSelected ? newSelected.id : '');
    if (onGroupChange) onGroupChange(newSelected);
  };

  const handleAddMember = async () => {
    if (!selectedGroupId || !newMemberId.trim()) return;
    const currentGroup = groups.find(g => g.id === selectedGroupId);
    if (!currentGroup) return;
    const updatedMembers = currentGroup.members ? [...currentGroup.members, { id: newMemberId.trim() }] : [{ id: newMemberId.trim() }];
    const updatedGroup = { ...currentGroup, members: updatedMembers };
    await updateGroupFirestore(selectedGroupId, { members: updatedMembers });
    setGroups(prev => prev.map(g => g.id === selectedGroupId ? updatedGroup : g));
    setNewMemberId('');
    if (onGroupChange) onGroupChange(updatedGroup);
  };

  const handleRemoveMember = async (memberId) => {
    if (!selectedGroupId) return;
    const currentGroup = groups.find(g => g.id === selectedGroupId);
    if (!currentGroup) return;
    const updatedMembers = currentGroup.members.filter(m => m.id !== memberId);
    const updatedGroup = { ...currentGroup, members: updatedMembers };
    await updateGroupFirestore(selectedGroupId, { members: updatedMembers });
    setGroups(prev => prev.map(g => g.id === selectedGroupId ? updatedGroup : g));
    if (onGroupChange) onGroupChange(updatedGroup);
  };

  const handleExpenseFormChange = (e) => {
    const { name, value } = e.target;
    setExpenseFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddGroupExpense = async (e) => {
    e.preventDefault();
    if (!selectedGroupId) return;
    const expense = {
      date: expenseFormData.date,
      amount: parseFloat(expenseFormData.amount),
      category: expenseFormData.category,
      description: expenseFormData.description,
      payer: expenseFormData.payer,
      createdAt: Date.now(),
    };
    const currentGroup = groups.find(g => g.id === selectedGroupId);
    if (!currentGroup) return;
    const updatedExpenses = currentGroup.expenses ? [...currentGroup.expenses, expense] : [expense];
    const updatedGroup = { ...currentGroup, expenses: updatedExpenses };
    await updateGroupFirestore(selectedGroupId, { expenses: updatedExpenses });
    setGroups(prev => prev.map(g => g.id === selectedGroupId ? updatedGroup : g));
    setExpenseFormData({ date: '', amount: '', category: '', description: '', payer: '' });
    if (onGroupChange) onGroupChange(updatedGroup);
  };

  const currentGroup = groups.find(g => g.id === selectedGroupId);

  return (
    <div>
      <h3>Create New Group</h3>
      <form onSubmit={handleCreateGroup}>
        <input 
          type="text" 
          placeholder="Group Name" 
          value={newGroupName} 
          onChange={(e) => setNewGroupName(e.target.value)} 
          required 
        />
        <button type="submit">Create Group</button>
      </form>
      {groups.length > 0 && (
        <div>
          <h3>Select Group</h3>
          <select value={selectedGroupId} onChange={handleGroupChange}>
            {groups.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
          <button onClick={handleDeleteGroup}>Delete Group</button>
        </div>
      )}
      {currentGroup && (
        <div>
          <h3>Group Details</h3>
          <p><strong>ID:</strong> {currentGroup.id}</p>
          <p><strong>Name:</strong> {currentGroup.name}</p>
          <p>
            <strong>Members:</strong> {currentGroup.members.map(m => (
              <span key={m.id} style={{ marginRight: '10px' }}>
                {m.id} <button onClick={() => handleRemoveMember(m.id)} style={{ fontSize: 'small' }}>Remove</button>
              </span>
            ))}
          </p>
          <div>
            <input 
              type="text" 
              placeholder="New Member ID" 
              value={newMemberId} 
              onChange={(e) => setNewMemberId(e.target.value)} 
            />
            <button onClick={handleAddMember}>Add Member</button>
          </div>
          <h3>Add Group Expense</h3>
          <form onSubmit={handleAddGroupExpense}>
            <div>
              <label>Date: <input type="date" name="date" value={expenseFormData.date} onChange={handleExpenseFormChange} required /></label>
            </div>
            <div>
              <label>Amount: <input type="number" step="0.01" name="amount" value={expenseFormData.amount} onChange={handleExpenseFormChange} required /></label>
            </div>
            <div>
              <label>Category: <input type="text" name="category" value={expenseFormData.category} onChange={handleExpenseFormChange} required /></label>
            </div>
            <div>
              <label>Description: <input type="text" name="description" value={expenseFormData.description} onChange={handleExpenseFormChange} /></label>
            </div>
            <div>
              <label>Payer: <input type="text" name="payer" value={expenseFormData.payer} onChange={handleExpenseFormChange} required /></label>
            </div>
            <button type="submit">Add Group Expense</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GroupExpenseLeft;
