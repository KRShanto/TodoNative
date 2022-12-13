import {
    PROJECTS_COLLECTION_NAME,
    TODOS_COLLECTION_NAME,
} from "../../../constants/variables";
import {
    getDocs,
    collection,
    query,
    where,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default async function removeProject(id: string) {
    try {
        const querySnapshot = await getDocs(
            query(
                collection(db, TODOS_COLLECTION_NAME),
                where("projectId", "==", id)
            )
        );

        querySnapshot.forEach(async (document) => {
            await deleteDoc(doc(db, TODOS_COLLECTION_NAME, document.id));
        });

        await deleteDoc(doc(db, PROJECTS_COLLECTION_NAME, id));
    } catch (e) {
        console.error("Error removing document: ", e);
    }
}
