/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { cookies } from "next/headers"

export type KrogerItem = {
	productName?: string,
	productPageURI?: string,
	brand?: string,
	price?: KrogerPrice
	image?: string,
	stock?: "HIGH" | "LOW" | "TEMPORARILY_OUT_OF_STOCK",
	upc?: string
}

export type KrogerPrice = {
	regular: number,
	promo: number,
	regularPerUnitEstimate: number,
	promoPerUnitEstimate: number,
}

export async function KrogerAuth(): Promise<string> {
	const res = await fetch(`https://api-ce.kroger.com/v1/connect/oauth2/token`, {
		method: 'POST',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Authorization": `Basic ${Buffer.from(`${process.env.KROGER_CLIENT_ID}:${process.env.KROGER_CLIENT_SECRET}`).toString("base64")}`
		},
		body: new URLSearchParams({
			grant_type: "client_credentials",
			scope: "product.compact"
		}).toString()
	})
	if (res) {
		const data = await res.json()
		if (data && data.access_token) {
			const cookieStore = await cookies()
			cookieStore.set("KrogerAccessToken", data.access_token)
			return data.access_token;
		}
	}
	return "";
}

export async function SearchKrogerAPI(query: string): Promise<KrogerItem[]> {
	const accToken = await KrogerAuth()
	const products: KrogerItem[] = []
	const res = await fetch(`https://api-ce.kroger.com/v1/products?filter.term=${query}&filter.location=01400376`, {
		method: 'GET',
		headers: {
			"Accept": "application/json",
			"Authorization": `Bearer ${accToken}`
		}
	})
	const data = await res.json()
	console.log(res)
	console.log(data)
	if (!data.data) {
		return products
	}

	data.data.forEach((val: unknown) => {
		let price = {} as KrogerPrice
		if ((val as { items: { price: { regular: number } }[] }).items[0].price) {
			price = {
				regular: (val as { items: { price: { regular: number } }[] }).items[0].price.regular,
				promo: (val as { items: { price: { promo: number } }[] }).items[0].price.promo,
				regularPerUnitEstimate: (val as { items: { price: { regularPerUnitEstimate: number } }[] }).items[0].price.regularPerUnitEstimate,
				promoPerUnitEstimate: (val as { items: { price: { promoPerUnitEstimate: number } }[] }).items[0].price.promoPerUnitEstimate
			} as KrogerPrice
		}
		let stock = "unknown"
		if ((val as { items: { inventory: { stockLevel: string } }[] }).items[0].inventory) {
			stock = (val as { items: { inventory: { stockLevel: string } }[] }).items[0].inventory.stockLevel
		}
		let image = "";
		(val as { images: { id: string, perspective: string, featured: boolean, sizes: { id: string, size: string, url: string }[] }[] }).images.forEach((img) => {
			if (img.featured) {
				image = img.sizes[0].url
			}
		})

		const item = {
			productName: (val as { description: string }).description,
			productPageURI: (val as { productPageURI: string }).productPageURI,
			brand: (val as { brand: string }).brand,
			price: price,
			image: image,
			stock: stock,
			upc: (val as { upc: string }).upc,
		} as KrogerItem
		products[products.length] = item
	})

	console.log(products)

	return products
}