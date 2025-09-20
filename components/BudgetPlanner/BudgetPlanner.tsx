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
                        Address:
                    </h3>
                    <ul className ={style.store_list}>
                        <li>
                            Bla blah blahhhh
                        </li>
                        <li>
                            more of blashhhhh
                        </li>
                    </ul>
                </div>
                <button className={style.store_change}>
                    <Icon iconName="add" />
                    <h4 className="concert_one_regular">Change store</h4>
                </button>
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

                        
                    </div>
                    <h3 className={style.budget_cost_total}>
                            $
                        </h3>
                </div>

                <button className={style.budget_change}>
                    <Icon iconName="add" />
                    <h4 className="concert_one_regular">Change budget</h4>
                </button>
            </div>
            <div className={style.budget_shopping}>
                <h2 className={style.shopping_list}>
                    Shopping List

                </h2>
                <div className = {style.shopping_info}>
                    <h3>
                        Dairy:
                    </h3>
                    <ul className = {style.shopping_info_dairy}>
                        
                    </ul>
                    <h3>
                        Meat:
                    </h3>
                    <ul>
                     
                    </ul>
                </div>
                <button className={style.add_item}>
                    <Icon iconName="add" />
                    <h4 className="concert_one_regular">Add item</h4>
                </button>
            </div>
            
        </div>
    )
}