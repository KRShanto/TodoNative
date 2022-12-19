import {
  TODOS_COLLECTION_NAME,
  PROJECTS_COLLECTION_NAME,
} from "../../../constants/variables";
import firebase from "@react-native-firebase/firestore";
import { UserType } from "../../../constants/contexts";

export default async function getTodos(userId: UserType["id"]) {
  try {
    const querySnapshot = await firebase()
      .collection(TODOS_COLLECTION_NAME)
      .where("userId", "==", userId)
      .get();

    const todos: any = [];

    querySnapshot.forEach((doc) => {
      todos.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return todos;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
}
