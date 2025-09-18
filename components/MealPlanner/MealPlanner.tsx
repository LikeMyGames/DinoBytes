'use client'
import styles from "./MealPlanner.module.css"
// import { useState } from "react"
import { List, ListsContext } from "@/app/page"
import { PieChart, Pie, Cell } from "recharts"
import Icon from "@/components/Icon"
import { useContext } from "react"

export default function MealPlanner() {
	const [lists, setLists] = useContext(ListsContext)
	let protein = 0
	lists.breakfast?.map((item) => {
		protein += item.protein
	})
	lists.lunch?.map((item) => {
		protein += item.protein
	})
	lists.dinner?.map((item) => {
		protein += item.protein
	})
	lists.snacks?.map((item) => {
		protein += item.protein
	})
	let carbs = 0
	lists.breakfast?.map((item) => {
		carbs += item.carbs
	})
	lists.lunch?.map((item) => {
		carbs += item.carbs
	})
	lists.dinner?.map((item) => {
		carbs += item.carbs
	})
	lists.snacks?.map((item) => {
		carbs += item.carbs
	})
	let fat = 0
	lists.breakfast?.map((item) => {
		fat += item.fat
	})
	lists.lunch?.map((item) => {
		fat += item.fat
	})
	lists.dinner?.map((item) => {
		fat += item.fat
	})
	lists.snacks?.map((item) => {
		fat += item.fat
	})

	function renderCustomizedLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number }): React.ReactElement {
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

	return (
		<div className={styles.meal_container}>
			<div className={styles.meal_date_container}>

			</div>
			<div className={styles.meal_builder}>
				<div className={styles.meal_breakdown}>
					<h4>Breakdown</h4>
					<PieChart width={200} height={200} className={styles.meal_breakdown_pie_container}>
						<Pie data={data} legendType={"plainline"} labelLine={false} label={renderCustomizedLabel} dataKey={"value"} cx="50%" cy="50%" isAnimationActive={false}>
							{data.map((entry, index) => (
								<Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Pie>
					</PieChart>
				</div>
				<div className={styles.meal_list_container}>
					<div className={styles.meal_list}>
						<h2 className={styles.meal_list_title}>
							Breakfast
						</h2>
						<div className={styles.meal_list_item_container}>
							<div className={styles.meal_list_item}>

							</div>
							<div className={styles.meal_list_item}>

							</div>
						</div>
						<button className={styles.meal_list_add}>
							<Icon iconName="add" />
							<h4 className="concert_one_regular">Add Item</h4>
						</button>
					</div>
					<div className={styles.meal_list}>
						<h2 className={styles.meal_list_title}>
							Lunch
						</h2>
						<div className={styles.meal_list_item_container}>
							<div className={styles.meal_list_item}>

							</div>
							<div className={styles.meal_list_item}>

							</div>
						</div>
						<button className={styles.meal_list_add}>
							<Icon iconName="add" />
							<h4 className="concert_one_regular">Add Item</h4>
						</button>
					</div>
					<div className={styles.meal_list}>
						<h2 className={styles.meal_list_title}>
							Dinner
						</h2>
						<div className={styles.meal_list_item_container}>
							<div className={styles.meal_list_item}>

							</div>
							<div className={styles.meal_list_item}>

							</div>
						</div>
						<button className={styles.meal_list_add}>
							<Icon iconName="add" />
							<h4 className="concert_one_regular">Add Item</h4>
						</button>
					</div>
					<div className={styles.meal_list}>
						<h2 className={styles.meal_list_title}>
							Snack
						</h2>
						<div className={styles.meal_list_item_container}>

						</div>
						<button className={styles.meal_list_add}>
							<Icon iconName="add" />
							<h4 className="concert_one_regular">Add Item</h4>
						</button>
					</div>
				</div>
			</div>
		</div >
	)
}