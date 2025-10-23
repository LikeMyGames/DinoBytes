import { ScreenContext } from "@/app/contexts"
import styles from "./SideBar.module.css"
import { useContext } from "react"
import Icon from "@/components/Icon"

export default function Redirect({ iconName, label }: { iconName: string, label: string }) {
    const [screen, setScreen] = useContext(ScreenContext)

    return (
        <button type="button" title={label} className={`${styles.side_bar_redirect} ${screen == label ? styles.side_bar_redirect_highlighted : ""} concert_one_regular`} onClick={() => setScreen(label)}>
            <Icon iconName={iconName} />
        </button>
    )
}