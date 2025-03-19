export default function createVisualization() {
    /**
     * Renders a chart from the given categorical data.
     * @param {Object} data - Mapping of categories to amounts.
     * @returns {string} - Simulated chart output.
     */
    function renderCharts(data) {
      return `Chart: ${JSON.stringify(data)}`;
    }
  
    /**
     * Renders trends based on a list of transactions.
     * Accumulates the total amount of transactions per day.
     * @param {Array} data - List of transactions.
     * @returns {string} - Simulated trend output with total amounts.
     */
    function renderTrends(data) {
      const trends = data.reduce((acc, tx) => {
        // Use the date as provided by the user
        const date = tx.date;
        acc[date] = (acc[date] || 0) + tx.amount;
        return acc;
      }, {});
      return `Trends: ${JSON.stringify(trends)}`;
    }
  
    return { renderCharts, renderTrends };
  }
  