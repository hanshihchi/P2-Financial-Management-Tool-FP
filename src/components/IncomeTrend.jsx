import React from 'react';
import createVisualization from '../modules/Visualization';

const IncomeTrend = ({ incomes }) => {
  const visualizationModule = createVisualization();
  const trends = visualizationModule.renderTrends(incomes);

  return (
    <div>
      <h3>Trend Analysis</h3>
      <strong>Total Income per Day</strong>
      <pre>{trends}</pre>
    </div>
  );
};

export default IncomeTrend;
