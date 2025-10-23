import { createContext } from "react";
import { User } from "./page";


export const ScreenContext = createContext<[string, (value: string) => void]>(["", () => { }]);
export const UserContext = createContext<[User | null, (value: User | null) => void]>([{ uid: "" }, () => { }]);