import Icon from "../Icon";
import style from "./Breakdown.module.css"

export function Breakdown() {
    return (
        <div className={style.breakdown_container}>
            <div className={style.breakdown_calories}>
                <h1>Calories:</h1>
                <div className={style.calories_count}>
                    0
                </div>
            </div>
            <div className={style.breakdown_budget_planner}>
                <h1>Budget Planner</h1>
                <p>This week's budget:</p>
				<p>$ 1000</p>
				<div className={style.budget_planner_store}>
					<p>Store: Ralphs 1982</p>
					<button className={`${style.budget_planner_change_store} concert_one_regular`}>
						Change
					</button>
				</div>
				<p>Total Cost: $765</p>
            </div>
            <div className={style.breakdown_goal_week}>
				<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
					M
					<Icon iconName={"star"} />
					<div className={style.breakdown_goal_week_day_data}>
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
				<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
					T
					<div className={style.breakdown_goal_week_day_data}>
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
				<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
					W
					<div className={style.breakdown_goal_week_day_data}>
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
				<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
					Th
					<Icon iconName={"star"} />
					<div className={style.breakdown_goal_week_day_data}>
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
				<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
					F
					<div className={style.breakdown_goal_week_day_data}>
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
				<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
					S
					<div className={style.breakdown_goal_week_day_data}>
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
				<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
					Su
					<div className={style.breakdown_goal_week_day_data}>
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
        </div>
    )
}