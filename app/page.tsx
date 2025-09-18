'use client'
import styles from "./page.module.css";
import { useState, createContext } from "react";
import MealPlanner from "@/components/MealPlanner/MealPlanner";
import SideBar from "@/components/SideBar/SideBar";
import { GoalPlanner } from "@/components/GoalPlanner/GoalPlanner";
import { BudgetPlanner } from "@/components/BudgetPlanner/BudgetPlanner";
// import { initFoodAPI, queryFood } from "@/lib/food";

export type List = {
	breakfast?: Item[],
	lunch?: Item[],
	dinner?: Item[],
	snacks?: Item[]
}

export type Item = {
	name: string,
	protein: number,
	carbs: number,
	fat: number,
	calories: 1820
}

export const ScreenContext = createContext<[string, (value: string) => void]>(["Breakdown", () => { }])
export const ListsContext = createContext<[List, (value: List) => void]>([{}, () => { }])

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
		] as Item[]
	})


	return (
		<div className={`${styles.page} concert_one_regular`}>
			<ScreenContext.Provider value={[screen, setScreen]}>
				<SideBar />
				<ListsContext.Provider value={[lists, setLists]}>
					<div className={styles.main}>
						<h1 className={styles.main_title}>
							{screen}
						</h1>
						{screen == "Meal Planner" ? (
							<MealPlanner lists={lists ?? {}} />
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
					</div>
				</ListsContext.Provider>
			</ScreenContext.Provider>
		</div>
	);
}
