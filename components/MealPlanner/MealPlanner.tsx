'use client'
import styles from "@/app/page.module.css"
// import { useState } from "react"
import { List } from "@/app/page"
import { PieChart } from "react-minimal-pie-chart"

export default function MealPlanner({ lists }: { lists: List }) {
	console.log(lists)
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

	return (
		<div className={styles.meal_container}>
			<div className={styles.meal_date_container}>

			</div>
			<div className={styles.meal_builder}>
				<div className={styles.meal_breakdown}>
					<h4>Breakdown</h4>
					<PieChart data={[
						{ title: "Protein", value: protein, color: '#FF0000' },
						{ title: 'Carbs', value: carbs, color: '#00FF00' },
						{ title: 'Fat', value: fat, color: '#0000FF' }
					]}
						totalValue={protein + carbs + fat}
						label={(labelProps) => labelProps.dataEntry.value + "g"}
						labelStyle={{ fill: '#EDEDED' }}
						radius={50}
						viewBoxSize={[100, 100]}
						style={{ height: 'min-content', width: 'min-content' }} />
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
					</div>
					<div className={styles.meal_list}>
						<h2 className={styles.meal_list_title}>
							Snack
						</h2>
						<div className={styles.meal_list_item_container}>

						</div>
					</div>
				</div>
			</div>
		</div>
	)
}