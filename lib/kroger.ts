<<<<<<< HEAD
'use client'
=======
'use server'

import { cookies } from "next/headers"
>>>>>>> d56753b (started and got user object saving to a decent point)

export type KrogerItem = {
	productName?: string,
	productPageURI?: string,
	brand?: string,
	price?: KrogerPrice
	image?: string,
	stock?: "HIGH" | "LOW" | "TEMPORARILY_OUT_OF_STOCK",
	upc?: string
}

export type KrogerLocation = {
	address: Address,
	chain: string,
	phone: string,
	departments: KrogerLocationDepartment[],
	geolocation: Geolocation
	hours: KrogerLocationHours
	locationId?: string
	storeNumber: string,
	divisionNumber: string,
	name: string
}

export type KrogerPrice = {
	regular: number,
	promo: number,
	regularPerUnitEstimate: number,
	promoPerUnitEstimate: number,
}

type Address = {
	addressLine1: string,
	addressLine2: string,
	city: string,
	county: string,
	state: string,
	zipCode: string
}

type KrogerLocationDepartment = {
	departmentId: string,
	name: string,
	phone: string,
	hours: KrogerLocationHours
}

type KrogerLocationHours = {
	Open24: boolean,
	gmtOffset?: string,
	timezone?: string
	monday: KrogerLocationDepartmentHoursDay,
	tuesday: KrogerLocationDepartmentHoursDay,
	wednesday: KrogerLocationDepartmentHoursDay,
	thursday: KrogerLocationDepartmentHoursDay,
	friday: KrogerLocationDepartmentHoursDay,
	saturday: KrogerLocationDepartmentHoursDay,
	sunday: KrogerLocationDepartmentHoursDay
}

type KrogerLocationDepartmentHoursDay = {
	open: number,
	close: number,
	open24: boolean
}

type Geolocation = {
	latLng: string,
	latitude: number,
	longitude: number
}

export async function KrogerAuth(): Promise<string> {
	// const res = await fetch(`https://api-ce.kroger.com/v1/connect/oauth2/token`, {
	// 	method: 'POST',
	// 	headers: {
	// 		"Content-Type": "application/x-www-form-urlencoded",
	// 		"Access-Control-Allow-Origin": "*",
	// 		"Authorization": `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_KROGER_CLIENT_ID}:${process.env.NEXT_PUBLIC_KROGER_CLIENT_SECRET}`).toString("base64")}`
	// 	},
	// 	body: new URLSearchParams({
	// 		grant_type: "client_credentials",
	// 		scope: "product.compact"
	// 	}).toString()
	// })
	// if (res) {
	// 	const data = await res.json()
	// 	if (data && data.access_token) {
	// 		TOKEN = data.access_token
	// 		return data.access_token;
	// 	}
	// }

	console.log()

	const res = await fetch(`${window.location.origin}/kroger`, {
		method: 'POST',
		body: JSON.stringify({ action: 'auth' })
	})
	console.log(res)
	return "";
}

export async function SearchKrogerAPI(query: string, locationId: string): Promise<KrogerItem[]> {
<<<<<<< HEAD
	// const accToken = TOKEN ? TOKEN : ''
	const products: KrogerItem[] = []
	// const res = await fetch(`https://api-ce.kroger.com/v1/products?filter.term=${query}&filter.location=${locationId}`, {
	// 	method: 'GET',
	// 	headers: {
	// 		"Accept": "application/json",
	// 		"Authorization": `Bearer ${accToken}`
	// 	}
	// })

	const res = await fetch(`${window.location.origin}/kroger`, {
		method: 'POST',
		body: JSON.stringify({ action: "search", query: query, locationId: locationId })
=======
	const accToken = await KrogerAuth()
	const products: KrogerItem[] = []
	const res = await fetch(`https://api-ce.kroger.com/v1/products?filter.term=${query}&filter.location=${locationId}`, {
		method: 'GET',
		headers: {
			"Accept": "application/json",
			"Authorization": `Bearer ${accToken}`
		}
>>>>>>> d56753b (started and got user object saving to a decent point)
	})
	console.log(res)

	const data = await res.json()
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
				if (img.sizes[0] == undefined) {
					image = (img as unknown as { sizes: { url: string } }).sizes.url
				} else {
					image = img.sizes[0].url
				}
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

	return products
}
export async function KrogerLocationSearch(lat: number, long: number): Promise<KrogerLocation[] | null> {
<<<<<<< HEAD
	// const accToken = TOKEN ? TOKEN : ''
	const location: KrogerLocation[] = []
	// const res = await fetch(`https://api-ce.kroger.com/v1/locations?filter.latLong.near=${lat},${long}&filter.radiusInMiles=5`, {
	// 	method: 'GET',
	// 	headers: {
	// 		"Accept": "application/json",
	// 		"Authorization": `Bearer ${accToken}`
	// 	},
	// 	body: JSON.stringify({ action: "location" })
	// })
	const res = await fetch(`${window.location.origin}/kroger`, {
		method: 'POST',
		body: JSON.stringify({ action: "location", lat: lat, long: long })
	})

	console.log(res)

=======
	const accToken = await KrogerAuth()
	const location: KrogerLocation[] = []
	const res = await fetch(`https://api-ce.kroger.com/v1/locations?filter.latLong.near=${lat},${long}&filter.radiusInMiles=5`, {
		method: 'GET',
		headers: {
			"Accept": "application/json",
			"Authorization": `Bearer ${accToken}`
		}
	})
	console.log(res)
>>>>>>> d56753b (started and got user object saving to a decent point)
	const data = await res.json()
	if (!data.data) {
		return Promise.resolve(null)
	}
<<<<<<< HEAD
=======
	console.log(data)
>>>>>>> d56753b (started and got user object saving to a decent point)
	data.data.forEach((val: KrogerLocation) => {
		location[location.length] = val
	})
	return location
}