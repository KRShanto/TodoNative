// import { addDoc, collection } from "firebase/firestore";
import { PROJECTS_COLLECTION_NAME } from "../../../constants/variables";
// import { db } from "../../../firebaseConfig";
import firebase from "@react-native-firebase/firestore";

export default async function createProject(name: string, userId: string) {
  try {
    const docRef = await firebase().collection(PROJECTS_COLLECTION_NAME).add({
      name,
      userId,
    });

    console.log("Project added with ID: ", docRef.id);

    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
