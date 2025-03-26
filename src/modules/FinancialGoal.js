export default function createFinancialGoal() {
    let goalIdCounter = 1;
  
    /**
     * Creates a new financial goal.
     * @param {Object} user - The user creating the goal.
     * @param {number} targetAmount - The financial target.
     * @param {string|Date} deadline - The deadline for achieving the goal.
     * @returns {Object} - New goal object.
     */
    function createGoal(user, targetAmount, deadline) {
      return {
        id: goalIdCounter++,
        user,
        targetAmount,
        currentAmount: 0,
        deadline,
        status: 'InProgress'
      };
    }
  
    /**
     * Updates the goal based on an expense.
     * @param {Object} goal - Current goal object.
     * @param {Object} expense - Expense object with an `amount` property.
     * @returns {Object} - Updated goal object.
     */
    function updateGoal(goal, expense) {
      const newAmount = goal.currentAmount + expense.amount;
      const newStatus = newAmount >= goal.targetAmount ? 'Achieved' : 'InProgress';
      return { ...goal, currentAmount: newAmount, status: newStatus };
    }
  
    /**
     * Tracks the progress of the goal.
     * @param {Object} goal - Goal object.
     * @returns {Object} - Progress details (percentage and status).
     */
    function trackProgress(goal) {
      const progress = (goal.currentAmount / goal.targetAmount) * 100;
      return { progress: progress > 100 ? 100 : progress, status: goal.status };
    }
  
    return { createGoal, updateGoal, trackProgress };
  }
  