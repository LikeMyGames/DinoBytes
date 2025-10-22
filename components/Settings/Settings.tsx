import style from "./Settings.module.css"
import Icon from "@/components/Icon";
import { UserContext } from "@/app/page";
import { useContext } from "react";
import { SaveUserData } from "@/lib/firebase/database/database"

export default function Settings() {
    const [user, setUser] = useContext(UserContext)
    return (
        <div className={style.settings_container}>
            <div className={style.profile_info_edit_account}>
                <div className={style.social_profile}>
                    <div className={style.left}>
                        <div className={style.profile_icon}>
                            <Icon iconName="person" />
                            <button type="button" title="edit button" className={`${style.change_icon} concert_one_regular`}>
                                <Icon iconName="edit" />
                            </button>
                        </div>
                        {user?.name}
                    </div>
                    <button className={`${style.change_button} concert_one_regular`}>
                        Change
                    </button>
                </div>
                <div className={style.email}>
                    email:
                    maclex3983@gmail.com
                    <button className={`${style.change_button} concert_one_regular`}>
                        Change
                    </button>
                </div>
                <div className={style.password}>
                    <div className={style.left}>
                        Password:
                        {"\u2022"}{"\u2022"}{"\u2022"}{"\u2022"}{"\u2022"}{"\u2022"}{"\u2022"}{"\u2022"}{"\u2022"}{"\u2022"}
                    </div>
                    <button className={`${style.change_button} concert_one_regular`}>
                        Change
                    </button>
                </div>
                <div className={style.theme}>
                    Theme:
                    Dark
                    <button className={`${style.change_button} concert_one_regular`}>
                        Change
                    </button>
                </div>
                <div className={style.logout_containter}>
                    <button className={`${style.logout} concert_one_regular`} onClick={() => { SaveUserData(user ?? { uid: "" }); setUser(null); }}>
                        Logout
                    </button>
                </div>
            </div>

        </div >
    )
}