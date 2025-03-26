import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "./myFirestoreDB";  // Import the initialized Firestore instance

const groupsCollection = collection(db, "groups");

/**
 * Creates a new group document.
 * @param {Object} groupData - The group data (e.g., name, members, expenses).
 * @returns {Promise<string>} - The new document's ID.
 */
async function createGroupFirestore(groupData) {
  try {
    const docRef = await addDoc(groupsCollection, groupData);
    console.log("Group created with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error creating group: ", e);
  }
}

/**
 * Reads all group documents.
 * @returns {Promise<Array>} - Array of group objects.
 */
async function readGroupsFirestore() {
  try {
    const querySnapshot = await getDocs(groupsCollection);
    const groups = [];
    querySnapshot.forEach((docSnap) => {
      groups.push({ id: docSnap.id, ...docSnap.data() });
    });
    return groups;
  } catch (e) {
    console.error("Error reading groups: ", e);
  }
}

/**
 * Updates a group document.
 * @param {string} id - Document ID.
 * @param {Object} updatedData - Data to update.
 */
async function updateGroupFirestore(id, updatedData) {
  try {
    const groupDoc = doc(db, "groups", id);
    await updateDoc(groupDoc, updatedData);
    console.log("Group updated with ID: ", id);
  } catch (e) {
    console.error("Error updating group: ", e);
  }
}

/**
 * Deletes a group document.
 * @param {string} id - Document ID.
 */
async function deleteGroupFirestore(id) {
  try {
    await deleteDoc(doc(db, "groups", id));
    console.log("Group deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting group: ", e);
  }
}

export { createGroupFirestore, readGroupsFirestore, updateGroupFirestore, deleteGroupFirestore };
