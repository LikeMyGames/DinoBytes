import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import style from "./GoalPlanner.module.css"

export function GoalPlanner() {
	const GoalSuccessData = [
		{ month: "January", Successes: 31 },
		{ month: "Febuary", Successes: 28 },
		{ month: "March", Successes: 30 },
		{ month: "April", Successes: 31 },
		{ month: "May", Successes: 30 },
		{ month: "June", Successes: 31 },
		{ month: "July", Successes: 31 },
		{ month: "August", Successes: 30 },
		{ month: "September", Successes: 19 },
		{ month: "October", Successes: 0 },
		{ month: "November", Successes: 0 },
		{ month: "December", Successes: 0 },
	]

	return (
		<div className={style.goal_container}>
			<div className={style.goal_week}>
				<div className={style.goal_week_day_list}>
					<button type="button" className={`${style.goal_week_day_selector} concert_one_regular`}>
						Monday
					</button>
					<button type="button" className={`${style.goal_week_day_selector} concert_one_regular`}>
						Tuesday
					</button>
					<button type="button" className={`${style.goal_week_day_selector} concert_one_regular`}>
						Wednesday
					</button>
					<button type="button" className={`${style.goal_week_day_selector} concert_one_regular`}>
						Thursday
					</button>
					<button type="button" className={`${style.goal_week_day_selector} concert_one_regular`}>
						Friday
					</button>
					<button type="button" className={`${style.goal_week_day_selector} concert_one_regular`}>
						Saturday
					</button>
					<button type="button" className={`${style.goal_week_day_selector} concert_one_regular`}>
						Sunday
					</button>
				</div>
			</div>
			<div className={style.goal_all}>


			</div>
			<div className={style.goal_success}>
				<h3>Success</h3>
				<ResponsiveContainer className={style.goal_success_chart_container}>
					<BarChart className={style.goal_success_chart} data={GoalSuccessData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
						<XAxis dataKey={"month"} />
						<YAxis />
						<Tooltip wrapperStyle={{ backgroundColor: "var(--foreground)", color: "var(--text)" }} />
						<Bar dataKey="Successes" fill="#11ab11" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}