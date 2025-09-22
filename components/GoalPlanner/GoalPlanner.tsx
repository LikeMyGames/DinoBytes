import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import style from "./GoalPlanner.module.css"
import Icon from "@/components/Icon"
import { useContext, useState } from "react"
import { ListsContext } from "@/app/page"

export function GoalPlanner() {
	const [lists,] = useContext(ListsContext)
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
	const [goalOverallEdit, setGoalOverallEdit] = useState<boolean>(true)

	return (
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
		</div>
	)
}

function GoalDayEdit() {
	return (
		<div className={style.goal_day_edit}>
			<div className={style.goal_day_edit_card}>

			</div>
		</div>
	)
}