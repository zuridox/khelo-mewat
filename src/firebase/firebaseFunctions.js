import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// Function to add contact data to Firestore
export const addContactMessage = async (name, email, message) => {
  try {
    const docRef = await addDoc(collection(db, "contacts"), {
      name,
      email,
      message,
      timestamp: new Date(),
    });
    console.log("Message sent, ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
