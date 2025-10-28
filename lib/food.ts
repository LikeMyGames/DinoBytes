'use client'

const FOOD_API_URL = "https://world.openfoodfacts.net/"

export type FoodData = {
    carbohydrates: number,
    carbohydrates_100g: number,
    carbohydrates_serving: number,
    carbohydrates_unit: string,
    carbohydrates_value: number,
    cholesterol: number,
    cholesterol_100g: number,
    cholesterol_serving: number,
    cholesterol_unit: string,
    cholesterol_value: number,
    energy: number,
    ["energy-kcal"]: number,
    ["energy-kcal_100g"]: number,
    ["energy-kcal_serving"]: number,
    ["energy-kcal_unit"]: string,
    ["energy-kcal_value"]: number,
    ["energy-kcal_value_computed"]: number,
    ["energy-kj"]: number,
    ["energy-kj_100g"]: number,
    ["energy-kj_serving"]: number,
    ["energy-kj_unit"]: string,
    ["energy-kj_value"]: number,
    ["energy-kj_value_computed"]: number,
    energy_100g: number,
    energy_serving: number,
    energy_unit: string,
    energy_value: number,
    fat: number,
    fat_100g: number,
    fat_serving: number,
    fat_unit: string,
    fat_value: number,
    iron: number,
    iron_100g: number,
    iron_serving: number,
    iron_unit: string,
    iron_value: number,
    proteins: number,
    proteins_100g: number,
    proteins_serving: number,
    proteins_unit: string,
    proteins_value: number,
    salt: number,
    salt_100g: number,
    salt_serving: number,
    salt_unit: string,
    salt_value: number,
    sodium: number,
    sodium_100g: number,
    sodium_serving: number,
    sodium_unit: string,
    sodium_value: number,
    sugars: number,
    sugars_100g: number,
    sugars_serving: number,
    sugars_unit: string,
    sugars_value: number
}

export async function queryFood(barcode: string): Promise<FoodData | null> {
    // const openFoodFactsApi = new OpenFoodFactsApi({

    // });
    try {
        // const product = await openFoodFactsApi.findProductByBarcode(barcode);
        const res = await fetch(`us.openfoodfacts.org/api/v0/products/${barcode}.json`)
        const product = await res.json()
        if ((product as { status_verbose: string }).status_verbose == "product not found") {
            return null
        }
        if (product) {
            console.log(`Product Name: ${product.product_name}`);
            console.log(`Brands: ${product.brands}`);
            console.log(`Categories: ${product.categories}`);
            console.log(`Nutriscore: ${product.nutrition_grades}`);
        } else {
            console.log(`Product with barcode ${barcode} not found.`);
        }
        return (product as { nutriments?: FoodData })?.nutriments as FoodData
    } catch (error) {
        console.error('Error fetching product:', error);
    }
    return null
}

export async function initFoodAPI() {
    fetch(FOOD_API_URL + "cgi/session.pl", {
        method: 'GET',
        headers: { Authorization: 'Basic ' + btoa('off:off') },
    })
        .then(req => req.json())
        .then(json => console.log(json))
}