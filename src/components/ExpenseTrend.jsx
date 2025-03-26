import React from 'react';
import createVisualization from '../modules/Visualization';

const ExpenseTrend = ({expenses}) => {
  const visualizationModule = createVisualization();
  const trends = visualizationModule.renderTrends(expenses);

  return (
    <div>
      <h3>Trend Analysis</h3>
      <strong>Total Expense per Day</strong>
      <pre>{trends}</pre>
    </div>
  );
};

export default ExpenseTrend;
