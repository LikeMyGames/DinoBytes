import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import style from "./GoalPlanner.module.css"
import Icon from "@/components/Icon"
import { createContext, useContext, useState } from "react"
import { User, UserContext, UserGoals } from "@/app/page"

const GoalEditOpenContext = createContext<[boolean, (val: boolean) => void]>([false, () => { }])
const GoalDayEditOpenContext = createContext<[boolean, (val: boolean) => void]>([false, () => { }])
export function GoalPlanner() {
	const GoalSuccessData = [
		{ month: "January", Completions: 31 },
		{ month: "Febuary", Completions: 28 },
		{ month: "March", Completions: 30 },
		{ month: "April", Completions: 31 },
		{ month: "May", Completions: 30 },
		{ month: "June", Completions: 31 },
		{ month: "July", Completions: 31 },
		{ month: "August", Completions: 30 },
		{ month: "September", Completions: 19 },
		{ month: "October", Completions: 0 },
		{ month: "November", Completions: 0 },
		{ month: "December", Completions: 0 },
	]

	const [goalDayEdit, setGoalDayEditting] = useState<boolean>(false)
	const [goalEditOpen, setGoalEditOpen] = useState<boolean>(false)
	const [goalDayOpen, setGoalDayEditOpen] = useState<boolean>(false)
	const [user,] = useContext(UserContext)

	return (
		<GoalDayEditOpenContext.Provider value={[goalDayOpen, setGoalDayEditOpen]}>
			<GoalEditOpenContext.Provider value={[goalEditOpen, setGoalEditOpen]}>
				<div className={style.goal_container}>
					<div className={style.goal_week}>
						<button className={`${style.goal_week_day} concert_one_regular`} onClick={() => { setGoalDayEditting(true); }}>
							M
							<Icon iconName={"star"} />
							<div className={style.goal_week_day_data}>
								<div>
									<p>Weight</p>
									<p>150 lbs</p>
								</div>
								<div>
									<p>Calories</p>
									<p>2500 Cal</p>
								</div>
							</div>
						</button>
						<button className={`${style.goal_week_day} concert_one_regular`} onClick={() => { setGoalDayEditting(true); }}>
							T
							<div className={style.goal_week_day_data}>
								<div>
									<p>Weight</p>
									<p>150 lbs</p>
								</div>
								<div>
									<p>Calories</p>
									<p>2500 Cal</p>
								</div>
							</div>
						</button>
						<button className={`${style.goal_week_day} concert_one_regular`} onClick={() => { setGoalDayEditting(true); }}>
							W
							<div className={style.goal_week_day_data}>
								<div>
									<p>Weight</p>
									<p>150 lbs</p>
								</div>
								<div>
									<p>Calories</p>
									<p>2500 Cal</p>
								</div>
							</div>
						</button>
						<button className={`${style.goal_week_day} concert_one_regular`} onClick={() => { setGoalDayEditting(true); }}>
							Th
							<Icon iconName={"star"} />
							<div className={style.goal_week_day_data}>
								<div>
									<p>Weight</p>
									<p>--</p>
								</div>
								<div>
									<p>Calories</p>
									<p>--</p>
								</div>
							</div>
						</button>
						<button className={`${style.goal_week_day} concert_one_regular`} onClick={() => { setGoalDayEditting(true); }}>
							F
							<div className={style.goal_week_day_data}>
								<div>
									<p>Weight</p>
									<p>150 lbs</p>
								</div>
								<div>
									<p>Calories</p>
									<p>2500 Cal</p>
								</div>
							</div>
						</button>
						<button className={`${style.goal_week_day} concert_one_regular`} onClick={() => { setGoalDayEditting(true); }}>
							S
							<div className={style.goal_week_day_data}>
								<div>
									<p>Weight</p>
									<p>150 lbs</p>
								</div>
								<div>
									<p>Calories</p>
									<p>2500 Cal</p>
								</div>
							</div>
						</button>
						<button className={`${style.goal_week_day} concert_one_regular`} onClick={() => { setGoalDayEditting(true); }}>
							Su
							<div className={style.goal_week_day_data}>
								<div>
									<p>Weight</p>
									<p>150 lbs</p>
								</div>
								<div>
									<p>Calories</p>
									<p>2500 Cal</p>
								</div>
							</div>
						</button>
					</div>
					<div className={style.goal_all}>
						<h1>Goals</h1>
						<div className={style.goal_weight}>
							<p>Goal weight: 120lb</p>
							<button className={`${style.budget_planner_change_store} concert_one_regular`}>
								Change
							</button>
						</div>
						<div className={style.goal_calories}>
							<p>Calories: {user?.goals?.targetCalories}cal</p>
							<button className={`${style.budget_planner_change_store} concert_one_regular`} onClick={() => { setGoalEditOpen(true) }}>
								Change
							</button>
						</div>
					</div>
					<div className={style.goal_success}>
						<h3>Completions</h3>
						<ResponsiveContainer className={style.goal_success_chart_container}>
							<BarChart className={style.goal_success_chart} data={GoalSuccessData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
								<XAxis dataKey={"month"} />
								<YAxis />
								<Tooltip wrapperStyle={{ backgroundColor: "var(--foreground)", color: "var(--text)" }} />
								<Bar dataKey="Completions" fill="#11ab11" />
							</BarChart>
						</ResponsiveContainer>
					</div>
					{
						goalDayEdit ? (
							<GoalDayEdit />
						) : (
							<></>
						)
					}
					{
						goalEditOpen ? (<GoalEdit />) : (<></>)
					}
				</div>
			</GoalEditOpenContext.Provider>
		</GoalDayEditOpenContext.Provider>
	)
}

function GoalEdit() {
	const [, setGoalEditOpen] = useContext(GoalEditOpenContext)
	const [user, setUser] = useContext(UserContext)
	let calories = user?.goals?.targetCalories
	let protein = user?.goals?.targetProtein
	let carbs = user?.goals?.targetCarbs
	let fat = user?.goals?.targetFat


	function checkNum(val: number, field: string) {
		const oldQuery = val
		setTimeout(() => {
			if (oldQuery != val) {
				return
			}
			setUser({
				...user,
				goals: {
					...user?.goals,
					[field]: val
				} as UserGoals
			} as User)
		}, 1000)
	}
	return (
		<div className={style.goal_day_edit}>
			<div className={style.goal_day_edit_card}>
				<div className={`${style.goal_day_edit_topbar} concert_one_regular`}>
					<button type="button" title="Close" className={style.goal_day_edit_topbar_close} onClick={() => {
						setUser({
							...user,
							goals: {
								...user?.goals,
								targetCalories: calories,
								targetProtein: protein,
								targetCarbs: carbs,
								targetFat: fat
							} as UserGoals
						} as User);

						setGoalEditOpen(false)
					}}>
						<Icon iconName="close" />
					</button>
				</div>
				<div className={style.goal_edit_body}>
					<div>
						Calories
						<input placeholder={"Calories"} defaultValue={user?.goals?.targetCalories} onChange={(e) => { e.preventDefault(); calories = Number(e.target.value); checkNum(Number(e.target.value), "targetCalories") }} />
					</div>
					<div>
						Protein
						<input placeholder={"Protein"} defaultValue={user?.goals?.targetProtein} onChange={(e) => { e.preventDefault(); protein = Number(e.target.value); checkNum(Number(e.target.value), "targetProtein") }} />
					</div>
					<div>
						Carbs
						<input placeholder={"Carbs"} defaultValue={user?.goals?.targetCarbs} onChange={(e) => { e.preventDefault(); carbs = Number(e.target.value); checkNum(Number(e.target.value), "targetCarbs") }} />
					</div>
					<div>
						Fat
						<input placeholder={"Fat"} defaultValue={user?.goals?.targetFat} onChange={(e) => { e.preventDefault(); fat = Number(e.target.value); checkNum(Number(e.target.value), "targetFat") }} />
					</div>
				</div>
			</div>
		</div>
	)
}

function GoalDayEdit() {
	const [user, setUser] = useContext(UserContext)
	const [, setGoalDayEditOpen] = useContext(GoalDayEditOpenContext)
	return (
		<div className={style.goal_day_edit}>
			<div className={style.goal_day_edit_card}>
				<div>
					Goal Calories:
					{user?.goals?.targetCalories}
					Cal
				</div>
				<div>
					Goal Protein:
					{user?.goals?.targetProtein}
					g
				</div>
				<div>
					Goal Carbs:
					{user?.goals?.targetCarbs}
					g
				</div>
				<div>
					Goal Fat:
					{user?.goals?.targetFat}
					g
				</div>
				<button className={style.goal_day_edit_close} onClick={() => { setGoalDayEditOpen(false) }}>
					hello
				</button>
			</div>
		</div>
	)
}