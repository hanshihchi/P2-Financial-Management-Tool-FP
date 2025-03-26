import React from 'react';
import { createTran } from '../db/myFirestoreTran';

const AddIncome = ({ onNewIncome }) => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.target;
		const income = {
			date: form.date.value,
			amount: parseFloat(form.amount.value),
			category: form.category.value,
			description: form.description.value,
			type: 'income',
			createdAt: Date.now(),
		};
		const docId = await createTran(income);
		const newIncome = { ...income, id: docId };
		if (onNewIncome) {
			onNewIncome(newIncome);
		}
		form.reset();
	};

  return (
    <div>
      <h3>Add Income</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date: <input type="date" name="date" required /></label>
        </div>
        <div>
          <label>Amount: <input type="number" step="0.01" name="amount" required /></label>
        </div>
        <div>
          <label>Category: <input type="text" name="category" required /></label>
        </div>
        <div>
          <label>Description: <input type="text" name="description" /></label>
        </div>
        <button type="submit">Add Income</button>
      </form>
    </div>
  );
};

export default AddIncome;
