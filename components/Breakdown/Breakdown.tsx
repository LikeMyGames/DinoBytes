import Icon from "../Icon";
import style from "./Breakdown.module.css"

export function Breakdown() {
    return (
        <div className={style.breakdown_container}>
            <div className={style.breakdown_calories}>
                <h1>Calories:</h1>
                <div className={style.calories_count}>
                    
                </div>
            </div>
            <div className={style.breakdown_budget_planner}>
                <h1>Budget Planner</h1>
                
            </div>
            <div className={style.goal_week}>
				<button className={`${style.goal_week_day} concert_one_regular`}>
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
				<button className={`${style.goal_week_day} concert_one_regular`}>
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
				<button className={`${style.goal_week_day} concert_one_regular`}>
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
				<button className={`${style.goal_week_day} concert_one_regular`}>
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
				<button className={`${style.goal_week_day} concert_one_regular`}>
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
				<button className={`${style.goal_week_day} concert_one_regular`}>
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
				<button className={`${style.goal_week_day} concert_one_regular`}>
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
        </div>
    )
}