export default function createGroupExpense() {
  let groupIdCounter = 1;

  /**
   * Creates a new group with the provided members.
   * @param {Array} members - Array of user objects or IDs.
   * @returns {Object} - New group object.
   */
  function createGroup(members) {
    return { id: groupIdCounter++, members, expenses: [] };
  }

  /**
   * Adds an expense to the group.
   * @param {Object} group - Group object.
   * @param {Object} expense - Expense transaction.
   * @returns {Object} - New group object with updated expenses.
   */
  function addExpense(group, expense) {
    const updatedExpenses = [...group.expenses, expense];
    return { ...group, expenses: updatedExpenses };
  }

  /**
   * Adds a new member to the group.
   * @param {Object} group - Group object.
   * @param {Object} newMember - New member (object with an 'id' property).
   * @returns {Object} - New group object with the new member added.
   */
  function addMember(group, newMember) {
    const updatedMembers = [...group.members, newMember];
    return { ...group, members: updatedMembers };
  }

  /**
   * Removes a member from the group by memberId.
   * @param {Object} group - Group object.
   * @param {string} memberId - The ID of the member to remove.
   * @returns {Object} - New group object with the member removed.
   */
  function removeMember(group, memberId) {
    const updatedMembers = group.members.filter((m) => m.id !== memberId);
    return { ...group, members: updatedMembers };
  }

  return { createGroup, addExpense, addMember, removeMember };
}
