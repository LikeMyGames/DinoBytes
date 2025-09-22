import styles from "./Breakdown.module.css"

export function Breakdown() {
    return (
        <div className={styles.breakdown_container}>
            <div className={styles.breakdown_calories}>
                <h1>Calories:</h1>
                <div className={styles.calories_count}>
                    
                </div>
            </div>
            <div className={styles.breakdown_budget_planner}>
                <h1>Budget Planner</h1>
            </div>
        </div>
    )
}