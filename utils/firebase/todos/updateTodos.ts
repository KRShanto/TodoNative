import {
  TODOS_COLLECTION_NAME,
  PROJECTS_COLLECTION_NAME,
} from "../../../constants/variables";
import firebase from "@react-native-firebase/firestore";

export default async function updateTodos(
  id: string,
  task: string,
  completed: boolean
) {
  try {
    const todoRef = firebase().collection(TODOS_COLLECTION_NAME).doc(id);
    const todoSnap = await todoRef.get();

    if (todoSnap.exists) {
      await todoRef.update({
        task,
        completed,
      });

      console.log("Todo updated with ID: ", id);

      return id;
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}
