import { addDoc, collection } from "firebase/firestore";
import { PROJECTS_COLLECTION_NAME } from "../../../constants/variables";
import { db } from "../../../firebaseConfig";

export default async function createProject(name: string) {
    try {
        const docRef = await addDoc(collection(db, PROJECTS_COLLECTION_NAME), {
            name,
        });

        console.log("Project added with ID: ", docRef.id);

        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
