import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import style from "./GoalPlanner.module.css"

export function GoalPlanner() {
	const GoalSuccessData = [
		{ month: "January", numSuccess: 5 },
		{ month: "Febuary", numSuccess: 2 },
		{ month: "March", numSuccess: 6 },
		{ month: "April", numSuccess: 16 },
		{ month: "May", numSuccess: 19 },
		{ month: "June", numSuccess: 31 },
		{ month: "July", numSuccess: 9 },
		{ month: "August", numSuccess: 1 },
		{ month: "September", numSuccess: 25 },
		{ month: "October", numSuccess: 13 },
		{ month: "November", numSuccess: 23 },
		{ month: "December", numSuccess: 27 },
	]

	return (
		<div className={style.goal_container}>
			<div className={style.goal_week}>

			</div>
			<div className={style.goal_all}>

			</div>
			<div className={style.goal_success}>
				<ResponsiveContainer>
					<BarChart width={10} height={10} className={style.goal_success_chart} data={GoalSuccessData}>
						<XAxis dataKey={"month"} />
						<YAxis />
						<Bar dataKey="numSuccess" fill="#11ab11" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}