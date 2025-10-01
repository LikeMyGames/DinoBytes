import style from "./Settings.module.css"
import Icon from "@/components/Icon";

export default function Settings() {
    return (
        <div className={style.settings_container}>
            <div className={style.settings_profile_info}>
                <div className={style.profile_info_account_photo}>
                    <Icon iconName="person" />
                </div>
                Name
                <button className={`${style.profile_info_change_name} concert_one_regular`}>
					Change
				</button>
            </div>
            <div className={style.other}>

            </div>
            <div className={style.other1}>
                
            </div>
        </div>
    )
}