import { User } from "@/app/page";
import { app } from "../firebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

export async function SaveUserData(uid: string, data: User) {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, data)
}

export async function CreateUserData(uid: string): Promise<User | null> {
    const docRef = doc(db, "users", uid)
    await setDoc(docRef, { name: "temp" } as User)
    return await GetUserData(uid);
}