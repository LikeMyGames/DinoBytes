export async function onRequest(context) {
    const body = JSON.parse(context.request.body)
    console.log(body)
    switch (body.action) {
        case "auth":
            return new Response(await KrogerAuth())
        case "search":
            return new Response(await SearchKrogerAPI(body.query, body.locationId))
        case "location":
            return new Response(await KrogerLocationSearch(body.lat, body.long))
    }
    
}

async function KrogerAuth() {
    const res = await fetch(`https://api-ce.kroger.com/v1/connect/oauth2/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Basic ${Buffer.from(`${process.env.NEXT_PUBLIC_KROGER_CLIENT_ID}:${process.env.NEXT_PUBLIC_KROGER_CLIENT_SECRET}`).toString("base64")}`
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            scope: "product.compact"
        }).toString()
    })
    console.log(res)
    if (res) {
        const data = await res.json()
        if (data && data.access_token) {
            console.log(data.access_token)
            return data.access_token;
        }
    }
    return "";
}

async function SearchKrogerAPI(query, locationId) {
    const accToken = await KrogerAuth()
    const products = []
    const res = await fetch(`https://api-ce.kroger.com/v1/products?filter.term=${query}&filter.location=${locationId}`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${accToken}`
        }
    })
    const data = await res.json()
    if (!data.data) {
        return products
    }

    data.data.forEach((val) => {
        let price = {}
        if (val.items[0].price) {
            price = {
                regular: val.items[0].price.regular,
                promo: val.items[0].price.promo,
                regularPerUnitEstimate: val.items[0].price.regularPerUnitEstimate,
                promoPerUnitEstimate: val.items[0].price.promoPerUnitEstimate
            }
        }
        let stock = "unknown"
        if (val.items[0].inventory) {
            stock = val.items[0].inventory.stockLevel
        }
        let image = "";
        val.images.forEach((img) => {
            if (img.featured) {
                if (img.sizes[0] == undefined) {
                    image = img.sizes.url
                } else {
                    image = img.sizes[0].url
                }
            }
        })

        const item = {
            productName: val.description,
            productPageURI: val.productPageURI,
            brand: val.brand,
            price: price,
            image: image,
            stock: stock,
            upc: val.upc,
        }
        products[products.length] = item
    })

    return products
}
async function KrogerLocationSearch(lat, long) {
    const accToken = await KrogerAuth()
    const location = []
    const res = await fetch(`https://api-ce.kroger.com/v1/locations?filter.latLong.near=${lat},${long}&filter.radiusInMiles=5`, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${accToken}`
        }
    })
    const data = await res.json()
    if (!data.data) {
        return Promise.resolve(null)
    }
    data.data.forEach((val) => {
        location[location.length] = val
    })
    return location
}