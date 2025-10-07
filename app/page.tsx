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
// import { initFoodAPI, queryFood } from "@/lib/food";

export type User = {
	name?: string,
	history?: StringIndexedArray<List>[],
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
	name: string,
	protein: number,
	carbs: number,
	fat: number,
	calories: number
}

export interface StringIndexedArray<T> {
	[index: string]: T
}

export const ScreenContext = createContext<[string, (value: string) => void]>(["Breakdown", () => { }])
export const ListsContext = createContext<[List, (value: List) => void]>([{}, () => { }])
export const UserContext = createContext<[User | null, (value: User | null) => void]>([{}, () => { }])

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
