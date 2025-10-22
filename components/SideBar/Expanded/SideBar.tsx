import { useContext } from "react";
import styles from "./SideBar.module.css"
import { ScreenContext, UserContext } from "@/app/page";
import Image from "next/image"
import DinoBytes_icon from "@/public/DinoBytes_icon_light 512x512.png"
import Redirect from "./Redirect";
import Icon from "@/components/Icon";
import { CollaspedContext } from "../SideBar";

export default function SideBarExpanded() {
    const [, setScreen] = useContext(ScreenContext)
    const [, setCollapsed] = useContext(CollaspedContext)
    const [user,] = useContext(UserContext)

    return (
        <div className={styles.side_bar}>
            <div className={styles.side_bar_title}>
                <button title="Side bar collapse" type="button" className={styles.side_bar_title_icon_wrapper} onClick={() => setCollapsed(true)}>
                    <Image className={styles.side_bar_title_icon} src={DinoBytes_icon} alt="DinoBytes icons" />
                </button>
                <h1 className={`concert_one_regular ${styles.side_bar_title_text}`}>DinoBytes</h1>
            </div>
            <div className={styles.side_bar_redirect_list}>
                <Redirect iconName="dataset" label="Breakdown" />
                <Redirect iconName="lunch_dining" label="Meal Planner" />
                <Redirect iconName="attach_money" label="Budget Planner" />
                <Redirect iconName="bookmark_flag" label="Goal Planner" />
            </div>
            <div className={styles.side_bar_account}>
                <div className={styles.side_bar_account_photo}>
                    <Icon iconName="person" />
                </div>
                <div className={styles.side_bar_account_info}>
                    {user?.name}
                </div>
                <button type="button" title="Settings" className={styles.side_bar_account_edit} onClick={() => setScreen("Settings")}>
                    <Icon iconName="settings" />
                </button>
            </div>
        </div>
    )
}