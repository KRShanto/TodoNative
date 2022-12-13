import { TODOS_COLLECTION_NAME } from "../../../constants/variables";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default async function deleteTodo(id: string) {
    try {
        await deleteDoc(doc(db, TODOS_COLLECTION_NAME, id));
    } catch (e) {
        console.error("Error removing document: ", e);
    }
}
