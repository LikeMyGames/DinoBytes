'use client'
import styles from "./page.module.css";
import { useState, createContext } from "react";
import MealPlanner from "@/components/MealPlanner/MealPlanner";
import SideBar from "@/components/SideBar/SideBar";
import { GoalPlanner } from "@/components/GoalPlanner/GoalPlanner";
import { BudgetPlanner } from "@/components/BudgetPlanner/BudgetPlanner";
import { Breakdown } from "@/components/Breakdown/Breakdown";
import Settings from "@/components/Settings/Settings";
import { Login } from "@/components/Login/Login"
import { KrogerItem } from "@/lib/kroger";
import { Product } from "openfoodfac-ts/dist/OpenFoodFactsApi/types";
import { SaveUserData } from "@/lib/firebase/database/database";

export type User = {
	uid: string,
	name?: string,
	history?: Record<string, List>,
	savedItems?: Item[],
}

export type List = {
	breakfast?: Item[],
	lunch?: Item[],
	dinner?: Item[],
	snacks?: Item[],
	logged?: boolean
}

export type Item = {
	name?: string,
	protein?: number,
	carbs?: number,
	fat?: number,
	calories?: number,
	foodData?: Product,
	KrogerItem?: KrogerItem,
}

export const ScreenContext = createContext<[string, (value: string) => void]>(["Breakdown", () => { }])
export const ListsContext = createContext<[List, (value: List) => void]>([{}, () => { }])
export const UserContext = createContext<[User | null, (value: User | null) => void]>([{ uid: "" }, () => { }])

export default function Home() {
	const [screen, setScreen] = useState<string>("Breakdown")
	const [lists, setLists] = useState<List>({
		breakfast: [
			{
				name: "breakfast burrito",
				protein: 25,
				carbs: 40,
				fat: 60,
				calories: 1820,
			}
		] as Item[],
		logged: true
	})
	const [user, setUser] = useState<User | null>(null)

	async function checkUserSync() {
		const tempUser = user
		setTimeout(() => {
			console.log("checking if user data need to be saved")
			if (tempUser != user) {
				console.log("saving user data")
				SaveUserData(user?.uid ?? "", user ?? { uid: "" })
			}
			checkUserSync()
		}, 1000 * 60 * 5)
	}

	checkUserSync()

	return (
		<UserContext.Provider value={[user, (val: User | null) => { console.log(val); setUser(val) }]}>
			<div className={`${styles.page} concert_one_regular`}>
				{user == null ? (
					<Login />
				) : (
					<ScreenContext.Provider value={[screen, setScreen]}>
						<SideBar />
						<ListsContext.Provider value={[lists, setLists]}>
							<div className={styles.main}>
								<h1 className={styles.main_title}>
									{screen}
								</h1>
								{screen == "Meal Planner" ? (
									<MealPlanner />
								) : (
									<></>
								)}
								{screen == "Goal Planner" ? (
									<GoalPlanner />
								) : (
									<></>
								)}
								{screen == "Budget Planner" ? (
									<BudgetPlanner />
								) : (
									<></>
								)}
								{screen == "Breakdown" ? (
									<Breakdown />
								) : (
									<></>
								)}
								{screen == "Settings" ? (
									<Settings />
								) : (
									<></>
								)}
							</div>
						</ListsContext.Provider>
					</ScreenContext.Provider>
				)}
			</div>
		</UserContext.Provider>
	);
}
