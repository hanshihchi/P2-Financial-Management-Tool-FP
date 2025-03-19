export default function createSplitting() {
    /**
     * Splits an expense among members using an equal or percentage-based split.
     * @param {Object} expense - Expense object with an `amount` property.
     * @param {Array} members - Array of user objects or IDs.
     * @param {string} [method='equal'] - Split method: 'equal' or 'percentage'.
     * @param {Array} [percentages=[]] - Array of percentages (only if method is 'percentage').
     * @returns {Object} - Mapping of member IDs to their share of the expense.
     */
    function splitExpense(expense, members, method = 'equal', percentages = []) {
      if (method === 'equal') {
        const share = expense.amount / members.length;
        return members.reduce((acc, member) => {
          // Assume member is an object with an 'id' property or a string ID.
          const memberId = member.id || member;
          acc[memberId] = share;
          return acc;
        }, {});
      } else if (method === 'percentage') {
        return members.reduce((acc, member, index) => {
          const memberId = member.id || member;
          acc[memberId] = expense.amount * (percentages[index] / 100);
          return acc;
        }, {});
      } else {
        throw new Error('Unknown splitting method');
      }
    }
  
    return { splitExpense };
  }
  