/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import style from "./MealPlanner.module.css"
// import { useState } from "react"
import { Item, List, User } from "@/app/page"
import { PieChart, Pie, Cell } from "recharts"
import Icon from "@/components/Icon"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { SearchKrogerAPI } from "@/lib/kroger"
import { queryFood } from "@/lib/food"
import { UserContext } from "@/app/contexts"

const AddingItemContext = createContext<[boolean, (value: boolean) => void]>([false, () => { }])
const ActiveListContext = createContext<string>("")
const AddItemContext = createContext<(val: Item) => void>(() => { })

export default function MealPlanner() {
	const [user, setUser] = useContext(UserContext)
	const todayKey = (new Date()).toDateString()
	if (!user?.history?.[todayKey]) {
		if (user) {
			if (!user.history) user.history = {} as Record<string, List>
			user.history[todayKey] = {} as List
		}
	}

	const [addingItem, setAddingItem] = useState<boolean>(false)
	const [activeList, setActiveList] = useState<string>("")
	const breakfast = useRef<Item[] | undefined>(user?.history?.[todayKey].breakfast)
	const lunch = useRef<Item[] | undefined>(user?.history?.[todayKey].lunch)
	const dinner = useRef<Item[] | undefined>(user?.history?.[todayKey].dinner)
	const snacks = useRef<Item[] | undefined>(user?.history?.[todayKey].snacks)

	function AddingItem(val: boolean) {
		if (val) {
			setAddingItem(val)
		} else {
			setActiveList("")
			setAddingItem(val)
		}
	}

	function AddItem(val: Item) {
		console.log(user)
		console.log(activeList)
		if (!user || !activeList) return;

		switch (activeList) {
			case "breakfast":
				console.log(breakfast.current)
				breakfast.current = [
					...breakfast.current ?? [],
					val
				]
				console.log(breakfast.current)
				break;
			case "lunch":
				lunch.current = [
					...lunch.current ?? [],
					val
				]
				break;
			case "dinner":
				dinner.current = [
					...dinner.current ?? [],
					val
				]
				break;
			case "snacks":
				snacks.current = [
					...snacks.current ?? [],
					val
				]
				break;
		}

		setUser({
			...user,
			history: {
				...(user?.history ?? {} as Record<string, List>),
				[todayKey]: {
					breakfast: breakfast.current,
					lunch: lunch.current,
					dinner: dinner.current,
					snacks: snacks.current
				} as List
			}
		} as User)

		setAddingItem(false)
	}

	function RemoveItem(list: string, index: number) {
		switch (list) {
			case "breakfast":
				setActiveList("breakfast");
				console.log(breakfast.current)
				breakfast.current?.splice(index, 1)
				console.log(breakfast.current)
				break;
			case "lunch":
				setActiveList("lunch");
				console.log(lunch.current)
				lunch.current?.splice(index, 1)
				console.log(lunch.current)
				break;
			case "dinner":
				setActiveList("dinner");
				console.log(dinner.current)
				dinner.current?.splice(index, 1)
				console.log(dinner.current)
				break;
			case "snacks":
				setActiveList("snacks");
				console.log(snacks.current)
				snacks.current?.splice(index, 1)
				console.log(snacks.current)
				break;
		}

		setUser({
			...user,
			history: {
				...(user?.history ?? {} as Record<string, List>),
				[todayKey]: {
					breakfast: breakfast.current,
					lunch: lunch.current,
					dinner: dinner.current,
					snacks: snacks.current
				} as List
			}
		} as User)
		setActiveList("");
	}

	// setTodayList(user?.history?.[todayKey])

	let protein = 0
	let carbs = 0
	let fat = 0
	let breakfastCal = 0
	let lunchCal = 0
	let dinnerCal = 0
	let snacksCal = 0

	if (user?.history?.[todayKey].breakfast) {
		user?.history?.[todayKey].breakfast?.map((item) => {
			console.log(item.foodData)
			protein += item.foodData?.proteins_value ?? 0
			carbs += item.foodData?.carbohydrates_value ?? 0
			fat += item.foodData?.fat_value ?? 0
			breakfastCal += item.foodData?.["energy-kcal"] ?? 0
		})
	} else {
		setUser({
			...user,
			history: {
				...((user?.history as Record<string, List>) ?? []),
				[todayKey]: {
					...((user?.history?.[todayKey] as any) ?? []),
					breakfast: []
				}
			}
		} as User)
	}

	if (user?.history?.[todayKey].lunch) {
		user?.history?.[todayKey].lunch?.map((item) => {
			console.log(item.foodData)
			protein += item.foodData?.proteins_value ?? 0
			carbs += item.foodData?.carbohydrates_value ?? 0
			fat += item.foodData?.fat_value ?? 0
			lunchCal += item.foodData?.["energy-kcal"] ?? 0
		})
	} else {
		setUser({
			...user,
			history: {
				...((user?.history as Record<string, List>) ?? []),
				[todayKey]: {
					...((user?.history?.[todayKey] as any) ?? []),
					lunch: []
				}
			}
		} as User)
	}

	if (user?.history?.[todayKey].dinner) {
		user?.history?.[todayKey].dinner?.map((item) => {
			console.log(item.foodData)
			protein += item.foodData?.proteins_value ?? 0
			carbs += item.foodData?.carbohydrates_value ?? 0
			fat += item.foodData?.fat_value ?? 0
			dinnerCal += item.foodData?.["energy-kcal"] ?? 0
		})
	} else {
		setUser({
			...user,
			history: {
				...((user?.history as Record<string, List>) ?? []),
				[todayKey]: {
					...((user?.history?.[todayKey] as any) ?? []),
					dinner: []
				}
			}
		} as User)
	}

	if (user?.history?.[todayKey].snacks) {
		user?.history?.[todayKey].snacks?.map((item) => {
			console.log(item.foodData)
			protein += item.foodData?.proteins_value ?? 0
			carbs += item.foodData?.carbohydrates_value ?? 0
			fat += item.foodData?.fat_value ?? 0
			snacksCal += item.foodData?.["energy-kcal"] ?? 0
		})
	} else {
		setUser({
			...user,
			history: {
				...((user?.history as Record<string, List>) ?? []),
				[todayKey]: {
					...((user?.history?.[todayKey] as any) ?? []),
					snacks: []
				}
			}
		} as User)
	}

	const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
		const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{`${((percent ?? 1) * 100).toFixed(0)}%`}
			</text>
		);
	};

	const [remainingCalories, setRemainCalories] = useState<number>((user?.goals?.targetCalories ?? 0) - breakfastCal - lunchCal - dinnerCal - snacksCal)

	useEffect(() => {
		setRemainCalories((user?.goals?.targetCalories ?? 0) - breakfastCal - lunchCal - dinnerCal - snacksCal)
	}, [breakfastCal, dinnerCal, lunchCal, snacksCal, user])

	const data = [
		{ name: "Breakfast", value: breakfastCal, color: '#ff0000' },
		{ name: 'Lunch', value: lunchCal, color: '#00ff00' },
		{ name: 'Dinner', value: dinnerCal, color: '#0000ff' },
		{ name: 'Snacks', value: snacksCal, color: '#ff00cc' },
		{ name: '', value: (remainingCalories > 0 ? remainingCalories : 0), color: '#00000000' }
	]

	const COLORS = ['#FF0000', '#00FF00', '#0000FF']
	const RADIAN = Math.PI / 180

	return (
		<div className={`${style.meal_container} concert_one_regular`}>
			{/* <div className={style.meal_date_container}>

			</div> */}
			<div className={style.meal_builder}>
				<div className={style.meal_breakdown}>
					<h4>Breakdown</h4>
					<PieChart width={200} height={200} className={style.meal_breakdown_pie_container}>
						<Pie data={data} legendType={"plainline"} labelLine={false} label={renderCustomizedLabel} dataKey={"value"} cx="50%" cy="50%" isAnimationActive={false}>
							{data.map((entry, index) => (
								<Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
					</PieChart>
				</div>
				<div className={style.meal_list_container}>
					<div className={style.meal_list}>
						<h2 className={style.meal_list_title}>
							Breakfast
						</h2>
						<div className={style.meal_list_item_container}>
							{
								breakfast.current ? (
									<>{breakfast.current.map((item, index) => (
										<div className={style.meal_list_item} key={index} >
											{item.name}
											<button type="button" title="Delete Item" onClick={() => { RemoveItem("breakfast", index); }}>
												<Icon iconName={"close"} />
											</button>
										</div>
									))}</>
								) : (<></>)
							}
						</div>
						<button className={style.meal_list_add} onClick={() => { setActiveList("breakfast"); setAddingItem(true); }}>
							<Icon iconName="add" />
							<h4 className="concert_one_regular">Add Item</h4>
						</button>
					</div>
					<div className={style.meal_list}>
						<h2 className={style.meal_list_title}>
							Lunch
						</h2>
						<div className={style.meal_list_item_container}>
							{
								lunch.current ? (
									<>{lunch.current.map((item, index) => (
										<div className={style.meal_list_item} key={index} >
											{item.name}
											<button type="button" title="Delete Item" onClick={() => { RemoveItem("lunch", index); }}>
												<Icon iconName={"close"} />
											</button>
										</div>
									))}</>
								) : (<></>)
							}
						</div>
						<button className={style.meal_list_add} onClick={() => { setActiveList("lunch"); setAddingItem(true); }}>
							<Icon iconName="add" />
							<h4 className="concert_one_regular">Add Item</h4>
						</button>
					</div>
					<div className={style.meal_list}>
						<h2 className={style.meal_list_title}>
							Dinner
						</h2>
						<div className={style.meal_list_item_container}>
							{
								dinner.current ? (
									<>{dinner.current.map((item, index) => (
										<div className={style.meal_list_item} key={index} >
											{item.name}
											<button type="button" title="Delete Item" onClick={() => { RemoveItem("dinner", index); }}>
												<Icon iconName={"close"} />
											</button>
										</div>
									))}</>
								) : (<></>)
							}
						</div>
						<button className={style.meal_list_add} onClick={() => { setActiveList("dinner"); setAddingItem(true); }}>
							<Icon iconName="add" />
							<h4 className="concert_one_regular">Add Item</h4>
						</button>
					</div>
					<div className={style.meal_list}>
						<h2 className={style.meal_list_title}>
							Snack
						</h2>
						<div className={style.meal_list_item_container}>
							{
								snacks.current ? (
									<>{snacks.current.map((item, index) => (
										<div className={style.meal_list_item} key={index} >
											{item.name}
											<button type="button" title="Delete Item" onClick={() => { RemoveItem("snacks", index); }}>
												<Icon iconName={"close"} />
											</button>
										</div>
									))}</>
								) : (<></>)
							}
						</div>
						<button className={style.meal_list_add} onClick={() => { setActiveList("snacks"); setAddingItem(true); }}>
							<Icon iconName="add" />
							<h4 className="concert_one_regular">Add Item</h4>
						</button>
					</div>
				</div>
			</div >
			<ActiveListContext.Provider value={activeList}>
				<AddingItemContext.Provider value={[addingItem, AddingItem]}>
					<AddItemContext value={AddItem}>
						{
							addingItem ? (<ItemSelect />) : (<></>)
						}
					</AddItemContext>
				</AddingItemContext.Provider>
			</ActiveListContext.Provider>
		</div >
	)
}


export function ItemSelect() {
	const [usePlanned, setUsePlanned] = useState<boolean>(false);
	const [addingItem, setAddingItem] = useContext(AddingItemContext);
	const [user,] = useContext(UserContext);
	let searchQuery = ""
	const [searchState, setSearchState] = useState<string>("")
	const [items, setItems] = useState<Item[]>([])

	function checkQuery() {
		const oldQuery = searchQuery
		setTimeout(() => {
			if (oldQuery != searchQuery || oldQuery == "") {
				return
			}
			console.log("querying kroger api")
			setSearchState(searchQuery)
		}, 1000)
	}

	useEffect(() => {
		SearchKrogerAPI(searchState, user?.prefferedLocation?.locationId ?? "")
			.then(data => {
				const items = [] as Item[]
				data.forEach(async (val, i) => {
					items[i] = {
						name: data[i].productName,
						foodData: (await queryFood(val.upc ?? "")) ?? null,
						KrogerItem: data[i]
					} as Item
					console.log(items[i])
					setItems(items)
				})
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchState])

	if (addingItem) {
		return (
			<div className={`${style.item_select} concert_one_regular`}>
				<div className={style.item_select_card}>
					<div className={`${style.item_select_type_select} concert_one_regular`}>
						<button className="concert_one_regular" type="button" onClick={() => setUsePlanned(true)}>
							Planned Meals
						</button>
						<button className="concert_one_regular" type="button" onClick={() => setUsePlanned(false)}>
							Kroger Items
						</button>
						<button type="button" title="Close" className={style.item_select_type_select_close} onClick={() => setAddingItem(false)}>
							<Icon iconName="close" />
						</button>
					</div>
					<div className={style.item_select_chooser}>
						{
							usePlanned ? (
								<>{user?.savedItems == null ? (<>
									You have no saved items
								</>) : (<>{
									user?.savedItems?.map((val, i) => {
										<ItemWidget key={i} item={val} />
									})
								}</>)}</>
							) : (
								<>
									<div className={style.item_select_chooser_search}>
										<input className="concert_one_regular" title="Item Search" type="text"
											onChange={(event) => {
												event.preventDefault();
												searchQuery = event.target.value;
												console.log(searchQuery)
												checkQuery();
											}} />
									</div>
									<div className={style.item_select_chooser_container}>
										{
											items.map((val, i) => (
												<ItemWidget key={i} item={val} />
											))
										}
									</div>
								</>
							)
						}
					</div>
				</div>
			</div>
		)
	}
}

export function MealBuilder() {

}

export function ItemWidget({ item }: { item: Item }) {
	console.log(item)
	const AddItem = useContext(AddItemContext)
	return (
		<div className={style.item_container}>
			<>
				<h1>{item.name ?? item.KrogerItem?.productName}</h1>
				<img alt={"item image"} src={item.KrogerItem?.image ?? ""} />
			</>
			<button className={"concert_one_regular"} onClick={() => AddItem(item)}>
				<Icon iconName={"add"} />
				Add
			</button>
		</div>
	)
}