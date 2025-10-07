import style from "./Settings.module.css"
import Icon from "@/components/Icon";

export default function Settings() {
    return (
        <div className={style.settings_container}>
            <div className={style.profile_info_edit_account}>
                <div className={style.social_profile}>
                    <div className={style.left}>
                        <div className={style.profile_icon}>
                            <Icon iconName="person" />
                        </div>
                        Name
                    </div>
                    <div className={style.right}>
                        <button className={`${style.change_button} concert_one_regular`}>
                            Change
                        </button>
                    </div>
                </div>
                <div className={style.email}>
                    maclex3983@gmail.com
                    <button className={`${style.change_button} concert_one_regular`}>
                        Change
                    </button>
                </div>
            </div>
        </div>
    )
}