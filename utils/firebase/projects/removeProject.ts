import {
    PROJECTS_COLLECTION_NAME,
    TODOS_COLLECTION_NAME,
} from "../../../constants/variables";
// import {
//     getDocs,
//     collection,
//     query,
//     where,
//     deleteDoc,
//     doc,
// } from "firebase/firestore";
// import { db } from "../../../firebaseConfig";
import firebase from "@react-native-firebase/firestore";

export default async function removeProject(id: string) {
    try {
        // const querySnapshot = await getDocs(
        //     query(
        //         collection(db, TODOS_COLLECTION_NAME),
        //         where("projectId", "==", id)
        //     )
        // );

        // querySnapshot.forEach(async (document) => {
        //     await deleteDoc(doc(db, TODOS_COLLECTION_NAME, document.id));
        // });

        // await deleteDoc(doc(db, PROJECTS_COLLECTION_NAME, id));

        // const querySnapshot = await firebase()
        //     .collection(TODOS_COLLECTION_NAME)
        //     .where("projectId", "==", id)
        //     .get();

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
