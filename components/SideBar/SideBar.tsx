import { useContext, useState, createContext } from "react";
import { ScreenContext } from "@/app/page";
import SideBarExpanded from "./Expanded/SideBar";
import SideBarCollapsed from "./Collapsed/SideBar"

export const CollaspedContext = createContext<[boolean, (value: boolean) => void]>([false, () => { }])

export default function SideBar() {
	const [, setScreen] = useContext(ScreenContext)
	const [collapsed, setCollapsed] = useState<boolean>(false)
	return (
		<>
			<CollaspedContext.Provider value={[collapsed, setCollapsed]}>
				{collapsed ? (
					<SideBarCollapsed />
				) : (
					<SideBarExpanded />
				)}
			</CollaspedContext.Provider>
		</>

	)
}