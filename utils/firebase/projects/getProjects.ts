import { PROJECTS_COLLECTION_NAME } from "../../../constants/variables";
// import { getDocs, collection } from "firebase/firestore";
// import { db } from "../../../firebaseConfig";
import firebase from "@react-native-firebase/firestore";
import { UserType } from "../../../constants/contexts";

export default async function getProjects(userId: UserType["id"]) {
    try {
        // const querySnapshot = await getDocs(
        //     collection(db, PROJECTS_COLLECTION_NAME)
        // );
        // const projects: any = [];

        // querySnapshot.forEach((doc) => {
        //     projects.push({
        //         id: doc.id,
        //         ...doc.data(),
        //     });
        // });

        // return projects;

        // const querySnapshot = await firebase()
        //     .collection(PROJECTS_COLLECTION_NAME)
        //     .get();

        // const projects: any = [];

        // querySnapshot.forEach((doc) => {
        //     projects.push({
        //         id: doc.id,
        //         ...doc.data(),
        //     });
        // });

        const querySnapshot = await firebase()
            .collection(PROJECTS_COLLECTION_NAME)
            .where("userId", "==", userId)
            .get();

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
