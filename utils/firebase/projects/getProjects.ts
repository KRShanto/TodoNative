import { PROJECTS_COLLECTION_NAME } from "../../../constants/variables";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default async function getProjects() {
    try {
        const querySnapshot = await getDocs(
            collection(db, PROJECTS_COLLECTION_NAME)
        );
        const projects: any = [];

        querySnapshot.forEach((doc) => {
            projects.push({
                id: doc.id,
                ...doc.data(),
            });
        });

        return projects;
    } catch (e) {
        console.error("Error getting documents: ", e);
    }
}
