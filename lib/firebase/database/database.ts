'use server'
import { User } from "@/app/page";
import { GetApp } from "../firebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const app = await GetApp();
const db = getFirestore(app);

export async function GetUserData(uid: string): Promise<User | null> {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        const data = docSnap.data()
        console.log("Document data:", data);
        // return docSnap.data() as User;
        return { uid: uid, ...data } as User;
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        CreateUserData(uid)
    }
    return null;
}

export async function SaveUserData(data: User) {
    console.log("attempting user data save to firebase")
    const docRef = doc(db, "users", data.uid);
    await setDoc(docRef, data)
    console.log("successfully saved to firebase")
}

export async function CreateUserData(uid: string): Promise<User | null> {
    const docRef = doc(db, "users", uid)
    await setDoc(docRef, { name: "temp" } as User)
    return await GetUserData(uid);
}