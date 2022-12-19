import {
  PROJECTS_COLLECTION_NAME,
  TODOS_COLLECTION_NAME,
} from "../../../constants/variables";
import firebase from "@react-native-firebase/firestore";

export default async function removeProject(id: string) {
  try {
    const querySnapshot = await firebase()
      .collection(TODOS_COLLECTION_NAME)
      .where("projectId", "==", id)
      .get();

    querySnapshot.forEach(async (document) => {
      await firebase()
        .collection(TODOS_COLLECTION_NAME)
        .doc(document.id)
        .delete();
    });

    await firebase().collection(PROJECTS_COLLECTION_NAME).doc(id).delete();

    console.log("Project deleted with ID: ", id);

    return id;
  } catch (e) {
    console.error("Error removing document: ", e);
  }
}
