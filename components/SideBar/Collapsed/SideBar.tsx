import { useContext } from "react";
import styles from "./SideBar.module.css"
import Image from "next/image"
import DinoBytes_icon from "@/public/DinoBytes_icon_light 512x512.png"
import Icon from "@/components/Icon";
import { CollaspedContext } from "../SideBar";
import Redirect from "./Redirect";
import { ScreenContext } from "@/app/page";

export default function SideBarExpanded() {
	const [, setCollapsed] = useContext(CollaspedContext)
	const [, setScreen] = useContext(ScreenContext)
	return (
		<div className={styles.side_bar}>
			<div className={styles.side_bar_title}>
				<button title="Side bar collapse" type="button" className={styles.side_bar_title_icon_wrapper} onClick={() => setCollapsed(false)}>
					<Image className={styles.side_bar_title_icon} src={DinoBytes_icon} alt="DinoBytes icons" />
				</button>
			</div>
			<div className={styles.side_bar_redirect_list}>
				<Redirect iconName="dataset" label="Breakdown" />
				<Redirect iconName="lunch_dining" label="Meal Planner" />
				<Redirect iconName="attach_money" label="Budget Planner" />
				<Redirect iconName="bookmark_flag" label="Goal Planner" />
			</div>
			<div className={styles.side_bar_account}>
				<button type="button" title="Account" className={styles.side_bar_account_photo} onClick={() => setScreen("Settings")}>
					<Icon iconName="person" />
				</button>
			</div>
		</div>
	)
}