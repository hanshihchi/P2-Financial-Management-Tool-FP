export default function createTransaction() {
    /**
     * Adds a new transaction to the list.
     * @param {Array} transactions - Current list of transactions.
     * @param {Object} transaction - New transaction object.
     * @returns {Array} - New list of transactions.
     */
    function addTransaction(transactions, transaction) {
      return [...transactions, transaction];
    }
  
    /**
     * Filters transactions by a specific date.
     * @param {Array} transactions - List of transactions.
     * @param {string|Date} date - Date to filter (ISO string or Date).
     * @returns {Array} - Filtered transactions.
     */
    function filterByDate(transactions, date) {
      const targetDate = new Date(date).toDateString();
      return transactions.filter((tx) => new Date(tx.date).toDateString() === targetDate);
    }
  
    /**
     * Categorizes transactions by summing amounts per category.
     * @param {Array} transactions - List of transactions.
     * @returns {Object} - Object mapping category names to total amounts.
     */
    function categorizeTransactions(transactions) {
      return transactions.reduce((acc, tx) => {
        const { category, amount } = tx;
        return { ...acc, [category]: (acc[category] || 0) + amount };
      }, {});
    }
  
    return { addTransaction, filterByDate, categorizeTransactions };
  }
  