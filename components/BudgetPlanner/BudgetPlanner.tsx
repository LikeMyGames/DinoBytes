import style from "./BudgetPlanner.module.css"

export default function BudgetPlanner() {
    return (
        <div className={style.budget_container}>
            <div className={style.budget_store}>
                <h2>
                    Store
                </h2>
            </div>
            <div className={style.budget_overall}>

            </div>
            <div className={style.budget_shopping}>

            </div>
        </div>
    ) 
}