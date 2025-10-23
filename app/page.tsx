'use client'
import styles from "./page.module.css";
import { useState, useRef } from "react";
import MealPlanner from "@/components/MealPlanner/MealPlanner";
import SideBar from "@/components/SideBar/SideBar";
import { GoalPlanner } from "@/components/GoalPlanner/GoalPlanner";
import { BudgetPlanner } from "@/components/BudgetPlanner/BudgetPlanner";
import { Breakdown } from "@/components/Breakdown/Breakdown";
import Settings from "@/components/Settings/Settings";
import { Login } from "@/components/Login/Login"
import { KrogerItem, KrogerLocation } from "@/lib/kroger";
import { SaveUserData } from "@/lib/firebase/database/database";
import { FoodData } from "@/lib/food";
import { ScreenContext, UserContext } from "./contexts";

export type User = {
	uid: string,
	name?: string,
	history?: Record<string, List>,
	savedItems?: Item[],
	prefferedLocation?: KrogerLocation,
	goals?: UserGoals
}

export type UserGoals = {
	targetCalories: number,
	targetProtein: number,
	targetFat: number,
	targetCarbs: number,
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
	foodData?: FoodData,
	KrogerItem?: KrogerItem,
}

export default function Home() {
	const [screen, setScreen] = useState<string>("Breakdown")
	// const [lists, setLists] = useState<List>({
	// 	breakfast: [
	// 		{
	// 			name: "breakfast burrito",
	// 			protein: 25,
	// 			carbs: 40,
	// 			fat: 60,
	// 			calories: 1820,
	// 		}
	// 	] as Item[],
	// 	logged: true
	// })
	const [user, setUser] = useState<User | null>(null)
	const tempUserRef = useRef<User | null>(user)

	function SetUser(val: User | null) {
		tempUserRef.current = val
		setUser(val)
		setTimeout(() => {
			console.log("checking is user data needs to be saved")
			console.log(tempUserRef.current)
			console.log(val)
			if (val == tempUserRef.current && !(tempUserRef.current == null)) {
				SaveUserData(tempUserRef.current ?? { uid: "" })
			}
		}, 10000)
	}

	return (
		<UserContext.Provider value={[user, SetUser]}>
			<div className={`${styles.page} concert_one_regular`}>
				{user == null ? (
					<Login />
				) : (
					<ScreenContext.Provider value={[screen, setScreen]}>
						<SideBar />
						{/* <ListsContext.Provider value={[lists, setLists]}> */}
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
						{/* </ListsContext.Provider> */}
					</ScreenContext.Provider>
				)}
			</div>
		</UserContext.Provider>
	);
}
