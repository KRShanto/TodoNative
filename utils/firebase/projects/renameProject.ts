// import { db } from "../../../firebaseConfig";
import { PROJECTS_COLLECTION_NAME } from "../../../constants/variables";
// import { getDoc, doc, updateDoc } from "firebase/firestore";
import firebase from "@react-native-firebase/firestore";

export default async function renameProject(id: string, name: string) {
    try {
        // const projectRef = doc(db, PROJECTS_COLLECTION_NAME, id);
        // const projectSnap = await getDoc(projectRef);

        // if (projectSnap.exists()) {
        //     await updateDoc(projectRef, {
        //         name,
        //     });
        // } else {
        //     console.log("No such document!");
        // }

        const projectRef = firebase()
            .collection(PROJECTS_COLLECTION_NAME)
            .doc(id);
        const projectSnap = await projectRef.get();

        if (projectSnap.exists) {
            await projectRef.update({
                name,
            });

            console.log("Project updated with ID: ", id);

            return id;
        }
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}
