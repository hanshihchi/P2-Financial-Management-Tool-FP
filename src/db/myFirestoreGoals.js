import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "./myFirestoreDB";

const goalsCollection = collection(db, "goals");

/**
 * Creates a new goal document.
 * @param {Object} goalData - The goal data.
 * @returns {Promise<string>} - The new document's ID.
 */
async function createGoalFirestore(goalData) {
  try {
    const docRef = await addDoc(goalsCollection, goalData);
    console.log("Goal created with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error creating goal: ", e);
  }
}

/**
 * Reads all goal documents.
 * @returns {Promise<Array>} - Array of goal objects.
 */
async function readGoalsFirestore() {
  try {
    const querySnapshot = await getDocs(goalsCollection);
    const goals = [];
    querySnapshot.forEach((docSnap) => {
      goals.push({ id: docSnap.id, ...docSnap.data() });
    });
    return goals;
  } catch (e) {
    console.error("Error reading goals: ", e);
  }
}

/**
 * Updates a goal document.
 * @param {string} id - Document ID.
 * @param {Object} updatedData - New data.
 */
async function updateGoalFirestore(id, updatedData) {
  try {
    const goalDoc = doc(db, "goals", id);
    await updateDoc(goalDoc, updatedData);
    console.log("Goal updated with ID: ", id);
  } catch (e) {
    console.error("Error updating goal: ", e);
  }
}

/**
 * Deletes a goal document.
 * @param {string} id - Document ID.
 */
async function deleteGoalFirestore(id) {
  try {
    await deleteDoc(doc(db, "goals", id));
    console.log("Goal deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting goal: ", e);
  }
}

export { createGoalFirestore, readGoalsFirestore, updateGoalFirestore, deleteGoalFirestore };
