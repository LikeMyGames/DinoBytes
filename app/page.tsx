/* eslint-disable @next/next/no-img-element */
import styles from "./page.module.css";
import Image from "next/image";
import DinoBytes_icon from "@/public/DinoBytes_icon.png"

export default function Home() {
	return (
		<div className={styles.page}>
			<div className={styles.side_bar}>
				<div className={styles.side_bar_title}>
					<Image className={styles.side_bar_title_icon} src={DinoBytes_icon} alt="" />
					<h1 className={`concert_one_regular ${styles.side_bar_title_text}`}>DinoBytes</h1>
				</div>
				<div className={styles.side_bar_redirect_list}>
					<button className={`${styles.side_bar_redirect} concert_one_regular`}>
						<span className="material-symbols-rounded">
							lunch_dining
						</span>
						Meal Planner
					</button>
					<button className={`${styles.side_bar_redirect} concert_one_regular`}>
						<span className="material-symbols-rounded">
							attach_money
						</span>
						Budget Planner
					</button>
					<button className={`${styles.side_bar_redirect} concert_one_regular`}>
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
					<button className={styles.side_bar_account_edit}>
						<span className="material-symbols-rounded">
							settings
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
