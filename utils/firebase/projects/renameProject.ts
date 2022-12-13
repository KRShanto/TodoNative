import { db } from "../../../firebaseConfig";
import { PROJECTS_COLLECTION_NAME } from "../../../constants/variables";
import { getDoc, doc, updateDoc } from "firebase/firestore";

export default async function renameProject(id: string, name: string) {
    try {
        const projectRef = doc(db, PROJECTS_COLLECTION_NAME, id);
        const projectSnap = await getDoc(projectRef);

        if (projectSnap.exists()) {
            await updateDoc(projectRef, {
                name,
            });
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}
