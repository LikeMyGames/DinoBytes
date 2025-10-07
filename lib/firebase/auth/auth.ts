import { app } from "../firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { User } from "@/app/page"
import { CreateUserData, GetUserData } from "../database/database";
import { FirebaseError } from "firebase/app";

const providerGoogle = new GoogleAuthProvider();
providerGoogle.addScope('https://www.googleapis.com/auth/contacts.readonly');
providerGoogle.setCustomParameters({
    'login_hint': 'user@example.com'
});

export const auth = getAuth(app)
auth.languageCode = 'it'

export async function CreateUserEmailPassword(email: string, password: string): Promise<User | null> {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        console.log(user)
        try {
            return CreateUserData(user.uid);

        } catch (error) {
            console.error(error)
        }
    } catch (error: unknown) {
        const errorCode = (error as { code?: string }).code;
        const errorMessage = (error as { message?: string }).message;
        console.error(errorCode, errorMessage);
    }
    return Promise.resolve(null);
}

export async function SignInEmailPassword(email: string, password: string): Promise<User | null> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        console.log(user)
        return GetUserData(user.uid);
    } catch (error: unknown) {
        const errorCode = (error as { code?: string }).code;
        const errorMessage = (error as { message?: string }).message;
        console.error(errorCode, errorMessage);
    }
    return Promise.resolve(null);
}

export async function SignInGoogle(): Promise<User | null> {
    try {
        const result = await signInWithPopup(auth, providerGoogle);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        return GetUserData(user.uid);
        // IdP data available using getAdditionalUserInfo(result)
    } catch (error: unknown) {
        // Handle Errors here.
        const errorCode = (error as { code?: string }).code;
        const errorMessage = (error as { message?: string }).message;
        console.error(errorCode, errorMessage)
        // The email of the user's account used.
        const email = (error as { customData: { email?: string } }).customData.email;
        console.log(email)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error as FirebaseError);
        console.log(credential)
    }
    return Promise.resolve(null);
}