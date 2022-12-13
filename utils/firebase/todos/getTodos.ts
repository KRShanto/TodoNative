import {
    TODOS_COLLECTION_NAME,
    PROJECTS_COLLECTION_NAME,
} from "../../../constants/variables";
import {
    getDocs,
    collection,
    query,
    where,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,
    addDoc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default async function getTodos() {
    try {
        const querySnapshot = await getDocs(
            collection(db, TODOS_COLLECTION_NAME)
        );
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
