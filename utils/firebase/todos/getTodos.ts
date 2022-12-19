import {
    TODOS_COLLECTION_NAME,
    PROJECTS_COLLECTION_NAME,
} from "../../../constants/variables";
// import {
//     getDocs,
//     collection,
//     query,
//     where,
//     deleteDoc,
//     doc,
//     getDoc,
//     updateDoc,
//     addDoc,
// } from "firebase/firestore";
// import { db } from "../../../firebaseConfig";
import firebase from "@react-native-firebase/firestore";
import { UserType } from "../../../constants/contexts";

export default async function getTodos(userId: UserType["id"]) {
    try {
        // const querySnapshot = await getDocs(
        //     collection(db, TODOS_COLLECTION_NAME)
        // );
        // const todos: any = [];

        // querySnapshot.forEach((doc) => {
        //     todos.push({
        //         id: doc.id,
        //         ...doc.data(),
        //     });
        // });

        // return todos;

        // const querySnapshot = await firebase()
        //     .collection(TODOS_COLLECTION_NAME)
        //     .get();

        // const todos: any = [];

        // querySnapshot.forEach((doc) => {
        //     todos.push({
        //         id: doc.id,
        //         ...doc.data(),
        //     });
        // });

        const querySnapshot = await firebase()
            .collection(TODOS_COLLECTION_NAME)
            .where("userId", "==", userId)
            .get();

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
