import React from 'react';
import createTransaction from '../modules/Transaction';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseCategorical = ({expenses}) => {
  const transactionModule = createTransaction();
  const categorizedData = transactionModule.categorizeTransactions(expenses);
  
	const labels = Object.keys(categorizedData);
	const dataValues = Object.values(categorizedData);
	const backgroundColors = labels.map(() => {
		const r = Math.floor(Math.random() * 255);
		const g = Math.floor(Math.random() * 255);
		const b = Math.floor(Math.random() * 255);
		return `rgba(${r}, ${g}, ${b}, 0.8)`;
	});

	const chartData = {
		labels: labels,
		datasets: [
			{
				data: dataValues,
				backgroundColor: backgroundColors,
				borderWidth: 1,
			},
		],
	};

	const chartOptions = {
		plugins: {
			legend: {
				position: 'bottom',
				labels: {
					usePointStyle: true,
				},
			},
			tooltip: {
				callbacks: {
					label: (context) => {
						const label = context.label || '';
						const value = context.parsed || 0;
						const total = dataValues.reduce((sum, num) => sum + num, 0);
						const percentage = ((value / total) * 100).toFixed(2) + '%';
						return `${label}: $${value} (${percentage})`;
					},
				},
			},
		},
	};

	return (
		<div>
			<h3>Categorical Breakdown</h3>
			<pre>{JSON.stringify(categorizedData, null, 2)}</pre>
			<div style={{ width: '300px', margin: '0 auto' }}>
				<Doughnut data={chartData} options={chartOptions} />
			</div>
		</div>
  );
};

export default ExpenseCategorical;
