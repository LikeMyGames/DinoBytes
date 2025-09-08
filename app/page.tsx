'use client'
/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import Image from "next/image";
import DinoBytes_icon from "@/public/DinoBytes_icon_light 512x512.png"
import { useState } from "react";
import { initFoodAPI, queryFood } from "@/lib/food";

export default function Home() {
	const [screen, setScreen] = useState<string>("Meal Planner")


	return (
		<div className={`${styles.page} concert_one_regular`}>
			<div className={styles.side_bar}>
				<div className={styles.side_bar_title}>
					<button title="Side bar collapse" type="button" className={styles.side_bar_title_icon_wrapper}>
						<Image className={styles.side_bar_title_icon} src={DinoBytes_icon} alt="DinoBytes icons" />
					</button>
					<h1 className={`concert_one_regular ${styles.side_bar_title_text}`}>DinoBytes</h1>
				</div>
				<div className={styles.side_bar_redirect_list}>
					<button type="button" className={`${styles.side_bar_redirect} concert_one_regular`} onClick={() => { setScreen("Meal Planner"); queryFood(); }}>
						<span className="material-symbols-rounded">
							lunch_dining
						</span>
						Meal Planner
					</button>
					<button type="button" className={`${styles.side_bar_redirect} concert_one_regular`} onClick={() => { setScreen("Budget Planner"); initFoodAPI(); }}>
						<span className="material-symbols-rounded">
							attach_money
						</span>
						Budget Planner
					</button>
					<button type="button" className={`${styles.side_bar_redirect} concert_one_regular`} onClick={() => setScreen("Goal Planner")}>
						<span className="material-symbols-rounded">
							bookmark_flag
						</span>
						Goal Planner
					</button>
				</div>
				<div className={styles.side_bar_account}>
					<div className={styles.side_bar_account_photo}>
						<span className="material-symbols-rounded">
							person
						</span>
					</div>
					<div className={styles.side_bar_account_info}>
						Name
					</div>
					<button type="button" className={styles.side_bar_account_edit} onClick={() => setScreen("Settings")}>
						<span className="material-symbols-rounded">
							settings
						</span>
					</button>
				</div>
			</div>
			<div className={styles.main}>
				<h1 className={styles.main_title}>
					{screen}
				</h1>
			</div>
		</div>
	);
}
