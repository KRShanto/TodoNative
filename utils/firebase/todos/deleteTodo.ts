import { TODOS_COLLECTION_NAME } from "../../../constants/variables";
// import { collection, doc, deleteDoc } from "firebase/firestore";
// import { db } from "../../../firebaseConfig";
import firebase from "@react-native-firebase/firestore";

export default async function deleteTodo(id: string) {
    try {
        // await deleteDoc(doc(db, TODOS_COLLECTION_NAME, id));

        await firebase().collection(TODOS_COLLECTION_NAME).doc(id).delete();

        console.log("Todo deleted with ID: ", id);

        return id;
    } catch (e) {
        console.error("Error removing document: ", e);
    }
}
