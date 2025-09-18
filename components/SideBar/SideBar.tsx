import { useState, createContext } from "react";
import SideBarExpanded from "./Expanded/SideBar";
import SideBarCollapsed from "./Collapsed/SideBar"

export const CollaspedContext = createContext<[boolean, (value: boolean) => void]>([false, () => { }])

export default function SideBar() {
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