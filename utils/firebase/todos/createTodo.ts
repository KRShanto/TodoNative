import { TODOS_COLLECTION_NAME } from "../../../constants/variables";
// import { collection, doc, addDoc } from "firebase/firestore";
// import { db } from "../../../firebaseConfig";
import firebase from "@react-native-firebase/firestore";

export default async function createTodo(
    projectId: string,
    userId: string,
    task: string
) {
    try {
        // const docRef = await addDoc(collection(db, TODOS_COLLECTION_NAME), {
        //     projectId,
        //     task,
        //     completed: false,
        // });

        // console.log("Todo added with ID: ", docRef.id);

        // return docRef.id;

        const docRef = await firebase().collection(TODOS_COLLECTION_NAME).add({
            projectId,
            userId,
            task,
            completed: false,
        });

        console.log("Todo added with ID: ", docRef.id);

        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
