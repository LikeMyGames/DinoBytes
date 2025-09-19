import Icon from "../Icon"
import style from "./BudgetPlanner.module.css"

export function BudgetPlanner() {
    return (
        <div className={style.budget_container}>
            <div className={style.budget_store}>
                <h2>
                    Store
                </h2>
                <div className={style.store_info}>
                    <h3>
                        Address
                    </h3>
                </div>
            </div>
            <div className={style.budget_overall}>
                <h2>
                    Budget
                </h2>
                <div>
                    <div className={style.budget_info}>
                        <h3>
                            Weekly budget:
                        </h3>

                        <h3 className={style.budget_info_weekly}>
                            $
                        </h3>

                    </div>
                    <div className={style.budget_cost}>
                        <h3>
                            Total Weekly Cost:
                        </h3>
                        <h3 className={style.budget_cost_total}>
                            $
                        </h3>
                    </div>
                </div>

                <button className={style.budget_change}>
                    <Icon iconName="add" />
                    <h4 className="concert_one_regular">Change budget</h4>
                </button>
            </div>
            <div className={style.budget_shopping}>
                <h2>
                    Shopping List
                </h2>
            </div>
        </div>
    )
}