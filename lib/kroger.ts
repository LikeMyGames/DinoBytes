'use server'

import { cookies } from "next/headers"

const baseURL = 'https://api.kroger.com/v2/products'

type KrogerItem = {
	productID: string,
	productsPageURI: string,
	brand?: string,
	price: KrogerPrice
	image?: string,
	stock?: "HIGH" | "LOW" | "TEMPORARILY_OUT_OF_STOCK",
	upc: string
}

type KrogerPrice = {
	regular: number,
	promo: number,
	regularPerUnitEstimate: number,
	promoPerUnitEstimate: number,
}

let TOKEN = ""

export async function GetToken() {
	return TOKEN
}

export async function KrogerAuth(): Promise<string> {
	console.log(process.env.KROGER_CLIENT_ID)
	console.log(process.env.KROGER_CLIENT_SECRET)
	console.log(`${process.env.KROGER_CLIENT_ID}:${process.env.KROGER_CLIENT_SECRET}`)
	console.log(`Basic ${btoa(`${process.env.KROGER_CLIENT_ID}:${process.env.KROGER_CLIENT_SECRET}`)}`)
	const res = await fetch(`https://api.kroger.com/v1/connect/oauth2/token`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": `${btoa(`${process.env.KROGER_CLIENT_ID}:${process.env.KROGER_CLIENT_SECRET}`)}`
		},
		body: new URLSearchParams({
			grant_type: "client_credentials",
			scope: "product.compact"
		}).toString()
	})
	console.log(res)
	let data = null
	if (res) {
		data = await res.json()
		if (data && data.access_token) {
			TOKEN = data.access_token
			const cookieStore = await cookies()
			cookieStore.set("accToken", TOKEN)
		}
	}
	return TOKEN
}

export async function SearchKrogerAPI(query: string): Promise<KrogerItem[]> {
	// const products: KrogerItem[] = []
	fetch(`${baseURL}?filter.term=${query}`, {
		method: 'GET',
		headers: {
			"Accept": "application/json",
			"Authorization": `Bearer ${TOKEN}`
		}
	})
		.then(req => {
			if (!req.ok) {
				return
			}
			req.json()
		})
		.then(data => {

		})

	return []
}