'use client'
import { KrogerLocation, KrogerLocationSearch } from "@/lib/kroger";
import Icon from "../Icon";
import style from "./Breakdown.module.css"
import { createContext, useContext, useEffect, useState } from "react";
<<<<<<< HEAD
import { UserContext } from "@/app/contexts";
// import { onAuthStateChanged } from "firebase/auth";
=======
import { UserContext } from "@/app/page";
import { onAuthStateChanged } from "firebase/auth";
>>>>>>> d56753b (started and got user object saving to a decent point)

const ChangingLocContext = createContext<[boolean, (value: boolean) => void]>([false, () => { }])

export function Breakdown() {
	const [changingLoc, setChangingLoc] = useState(false)
<<<<<<< HEAD
	const [user,] = useContext(UserContext)
=======
>>>>>>> d56753b (started and got user object saving to a decent point)

	return (
		<ChangingLocContext.Provider value={[changingLoc, setChangingLoc]}>
			<div className={style.breakdown_container}>
				<div className={style.breakdown_calories}>
					<h1>Calories:</h1>
					<div className={style.calories_count}>
						0
					</div>
				</div>
				<div className={style.breakdown_budget_planner}>
					<h1>Budget Planner</h1>
					<p>This week{"\'"}s budget:</p>
					<p>$ 1000</p>
					<div className={style.budget_planner_store}>
<<<<<<< HEAD
						<p>Store: {user?.prefferedLocation?.locationId}</p>
=======
						<p>Store: Ralphs 1982</p>
>>>>>>> d56753b (started and got user object saving to a decent point)
						<button className={`${style.budget_planner_change_store} concert_one_regular`} onClick={() => setChangingLoc(true)}>
							Change
						</button>
					</div>
					<p>Total Cost: $765</p>
				</div>
				<div className={style.breakdown_goal_week}>
					<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
						M
						<Icon iconName={"star"} />
						<div className={style.breakdown_goal_week_day_data}>
							<div>
								<p>Weight</p>
								<p>150 lbs</p>
							</div>
							<div>
								<p>Calories</p>
								<p>2500 Cal</p>
							</div>
						</div>
					</button>
					<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
						T
						<div className={style.breakdown_goal_week_day_data}>
							<div>
								<p>Weight</p>
								<p>150 lbs</p>
							</div>
							<div>
								<p>Calories</p>
								<p>2500 Cal</p>
							</div>
						</div>
					</button>
					<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
						W
						<div className={style.breakdown_goal_week_day_data}>
							<div>
								<p>Weight</p>
								<p>150 lbs</p>
							</div>
							<div>
								<p>Calories</p>
								<p>2500 Cal</p>
							</div>
						</div>
					</button>
					<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
						Th
						<Icon iconName={"star"} />
						<div className={style.breakdown_goal_week_day_data}>
							<div>
								<p>Weight</p>
								<p>--</p>
							</div>
							<div>
								<p>Calories</p>
								<p>--</p>
							</div>
						</div>
					</button>
					<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
						F
						<div className={style.breakdown_goal_week_day_data}>
							<div>
								<p>Weight</p>
								<p>150 lbs</p>
							</div>
							<div>
								<p>Calories</p>
								<p>2500 Cal</p>
							</div>
						</div>
					</button>
					<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
						S
						<div className={style.breakdown_goal_week_day_data}>
							<div>
								<p>Weight</p>
								<p>150 lbs</p>
							</div>
							<div>
								<p>Calories</p>
								<p>2500 Cal</p>
							</div>
						</div>
					</button>
					<button className={`${style.breakdown_goal_week_day} concert_one_regular`}>
						Su
						<div className={style.breakdown_goal_week_day_data}>
							<div>
								<p>Weight</p>
								<p>150 lbs</p>
							</div>
							<div>
								<p>Calories</p>
								<p>2500 Cal</p>
							</div>
						</div>
					</button>
				</div>
				{
					changingLoc ? (<LocChangeInput />) : (<></>)
				}
			</div>
		</ChangingLocContext.Provider>
	)
}

function LocChangeInput() {
	const [changingLoc, setChangingLoc] = useContext(ChangingLocContext)
	const [locations, setLocations] = useState<KrogerLocation[] | null>(null)
	const [user, setUser] = useContext(UserContext)


	useEffect(() => {
		if (!changingLoc) {
			return;
		}
		if (typeof navigator !== undefined) {
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition(
					// Success callback function
					(position) => {
						const latitude = position.coords.latitude;
						const longitude = position.coords.longitude;

						console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
						KrogerLocationSearch(latitude, longitude)
							.then((res) => {
								setLocations(res)
							})
						// You can now use these coordinates, for example, to display them on a map
					},
					// Error callback function
					(error) => {
						// Handle potential errors
						switch (error.code) {
							case error.PERMISSION_DENIED:
								console.error("User denied the request for Geolocation.");
								break;
							case error.POSITION_UNAVAILABLE:
								console.error("Location information is unavailable.");
								break;
							case error.TIMEOUT:
								console.error("The request to get user location timed out.");
								break;
							default:
								console.error("An unknown error occurred.");
								break;
						}
					},
					// Optional options object
					{
						enableHighAccuracy: true, // Request more accurate location data
						timeout: 5000, // Maximum time in milliseconds to wait for a location
						maximumAge: 0, // Accept a cached position no older than this many milliseconds
					}
				);
			} else {
				alert("Geolocation is not supported by this browser")
			}
		}
	}, [changingLoc])

	if (changingLoc) {
		return (
			(
				<div className={`${style.item_select} concert_one_regular`}>
					<div className={style.item_select_card}>
						<div className={`${style.item_select_type_select} concert_one_regular`}>
							<button type="button" title="Close" className={style.item_select_type_select_close} onClick={() => setChangingLoc(false)}>
								<Icon iconName="close" />
							</button>
						</div>
						<h1>Locations Near You</h1>
						<div className={style.item_select_chooser}>
							{
								locations ? (<>
									{
										locations.map((val, i) => (
											<div className={style.loc_change_item_container} key={i}>
												<h2>{val.name}</h2>
												<div>
													<h3>{val.address.addressLine1}</h3>
													<h3>{val.address.addressLine2}</h3>
												</div>
												<div>
													<h3>{val.address.city}</h3>
													<h3>{val.address.state}</h3>
													<h3>{val.address.zipCode}</h3>
												</div>
												<button className={"concert_one_regular"} title="Choose this location" type="button" onClick={() => { setUser({ ...(user ?? { uid: "" }), prefferedLocation: val }); setChangingLoc(false) }}>
													Choose
												</button>
											</div>
										))
									}
								</>) : (<></>)
							}
						</div>
					</div>
				</div>
			)
		)
	}
}