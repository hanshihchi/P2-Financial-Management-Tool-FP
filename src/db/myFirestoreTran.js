import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import db from "./myFirestoreDB";

  // Reference to the 'transactions' collection
  const transactionsCollection = collection(db, "transactions");
  
  /**
   * Create a new transaction document.
   * @param {Object} data - Transaction data (should include a `type` field).
   * @returns {Promise<string>} - The new document's ID.
   */
  async function createTran(data) {
    try {
      const docRef = await addDoc(transactionsCollection, data);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  
  /**
   * Read all transaction documents.
   * @returns {Promise<Array>} - Array of transaction objects.
   */
  async function readTran() {
    try {
      const querySnapshot = await getDocs(transactionsCollection);
      const transactions = [];
      querySnapshot.forEach((docSnap) => {
        transactions.push({ id: docSnap.id, ...docSnap.data() });
      });
      return transactions;
    } catch (e) {
      console.error("Error reading documents: ", e);
    }
  }
  
  /**
   * Update an existing transaction.
   * @param {string} id - Document ID.
   * @param {Object} updatedData - New data.
   */
  async function updateTran(id, updatedData) {
    try {
      const transactionDoc = doc(db, "transactions", id);
      await updateDoc(transactionDoc, updatedData);
      console.log("Document updated with ID: ", id);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }
  
  /**
   * Delete a transaction document.
   * @param {string} id - Document ID.
   */
  async function deleteTran(id) {
    try {
      await deleteDoc(doc(db, "transactions", id));
      console.log("Document deleted with ID: ", id);
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  }
  
  export { createTran, readTran, updateTran, deleteTran };