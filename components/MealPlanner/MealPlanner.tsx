/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import style from "./MealPlanner.module.css"
// import { useState } from "react"
import { Item, List, ListsContext, UserContext } from "@/app/page"
import { PieChart, Pie, Cell } from "recharts"
import Icon from "@/components/Icon"
import { createContext, useContext, useEffect, useState } from "react"
import { KrogerAuth, SearchKrogerAPI } from "@/lib/kroger"
import { queryFood } from "@/lib/food"

const AddingItemContext = createContext<[boolean, (value: boolean) => void]>([false, () => { }])

export default function MealPlanner() {
	const [lists, setLists] = useContext(ListsContext)
	const [user, setUser] = useContext(UserContext)
	const [addingItem, setAddingItem] = useState<boolean>(false)

	let protein = 0
	lists.breakfast?.map((item) => {
		protein += item.protein ?? 0
	})
	lists.lunch?.map((item) => {
		protein += item.protein ?? 0
	})
	lists.dinner?.map((item) => {
		protein += item.protein ?? 0
	})
	lists.snacks?.map((item) => {
		protein += item.protein ?? 0
	})
	let carbs = 0
	lists.breakfast?.map((item) => {
		carbs += item.carbs ?? 0
	})
	lists.lunch?.map((item) => {
		carbs += item.carbs ?? 0
	})
	lists.dinner?.map((item) => {
		carbs += item.carbs ?? 0
	})
	lists.snacks?.map((item) => {
		carbs += item.carbs ?? 0
	})
	let fat = 0
	lists.breakfast?.map((item) => {
		fat += item.fat ?? 0
	})
	lists.lunch?.map((item) => {
		fat += item.fat ?? 0
	})
	lists.dinner?.map((item) => {
		fat += item.fat ?? 0
	})
	lists.snacks?.map((item) => {
		fat += item.fat ?? 0
	})

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

	const data = [
		{ name: "Protein", value: protein, color: '#FF0000' },
		{ name: 'Carbs', value: carbs, color: '#00FF00' },
		{ name: 'Fat', value: fat, color: '#0000FF' }
	]

	const COLORS = ['#FF0000', '#00FF00', '#0000FF']
	const RADIAN = Math.PI / 180

	const todayHistory = (user?.history as Record<string, List>)?.[(new Date()).toDateString()]
	console.log(todayHistory.breakfast)

	return (
		<div className={`${style.meal_container} concert_one_regular`}>
			<div className={style.meal_date_container}>

			</div>
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
								todayHistory.breakfast ? (
									<>{todayHistory.breakfast?.map((item, index) => (
										<div className={style.meal_list_item} key={index}>
											{item.name}
										</div>
									))}</>
								) : (<></>)
							}
						</div>
						<button className={style.meal_list_add} onClick={() => setAddingItem(true)}>
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
								todayHistory.lunch ? (
									<>{todayHistory.lunch?.map((item, index) => (
										<div className={style.meal_list_item} key={index}>
											{item.name}
										</div>
									))}</>
								) : (<></>)
							}
						</div>
						<button className={style.meal_list_add} onClick={() => setAddingItem(true)}>
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
								todayHistory.dinner ? (
									<>{todayHistory.dinner?.map((item, index) => (
										<div className={style.meal_list_item} key={index}>
											{item.name}
										</div>
									))}</>
								) : (<></>)
							}
						</div>
						<button className={style.meal_list_add} onClick={() => setAddingItem(true)}>
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
								todayHistory.snacks ? (
									<>{todayHistory.snacks?.map((item, index) => (
										<div className={style.meal_list_item} key={index}>
											{item.name}
										</div>
									))}</>
								) : (<></>)
							}
						</div>
						<button className={style.meal_list_add} onClick={() => setAddingItem(true)}>
							<Icon iconName="add" />
							<h4 className="concert_one_regular">Add Item</h4>
						</button>
					</div>
				</div>
			</div>
			<AddingItemContext.Provider value={[addingItem, setAddingItem]}>
				<ItemSelect />
			</AddingItemContext.Provider>
		</div >
	)
}

export function ItemSelect() {
	const [usePlanned, setUsePlanned] = useState<boolean>(false);
	const [addingItem, setAddingItem] = useContext(AddingItemContext);
	const [user, setUser] = useContext(UserContext);
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
		SearchKrogerAPI(searchState)
			.then(data => {
				const items = [] as Item[]
				data.forEach(async (val, i) => {
					items[i] = {
						name: data[i].productName,
						foodData: await queryFood(val.upc ?? ""),
						KrogerItem: data[i]
					} as Item
					console.log(items[i])
					setItems(items)
				})
			})
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
	return (
		<div className={style.item_container}>
			<>
				<h1>{item.name ?? item.KrogerItem?.productName}</h1>
				<img alt={"item image"} src={item.KrogerItem?.image ?? ""} />
			</>
			<button>
				<Icon iconName={"add"} />
				Add
			</button>
		</div>
	)
}