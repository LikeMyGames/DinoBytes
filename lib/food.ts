'use server'

import { OpenFoodFactsApi } from 'openfoodfac-ts';
const FOOD_API_URL = "https://world.openfoodfacts.net/"

export async function queryFood(barcode: string) {
    const openFoodFactsApi = new OpenFoodFactsApi();
    try {
        const product = await openFoodFactsApi.findProductByBarcode(barcode);
        if (product) {
            console.log(`Product Name: ${product.product_name}`);
            console.log(`Brands: ${product.brands}`);
            console.log(`Categories: ${product.categories}`);
            console.log(`Nutriscore: ${product.nutrition_grades}`);
        } else {
            console.log(`Product with barcode ${barcode} not found.`);
        }
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

export async function initFoodAPI() {
    fetch(FOOD_API_URL + "cgi/session.pl", {
        method: 'GET',
        headers: { Authorization: 'Basic ' + btoa('off:off') },
    })
        .then(req => req.json())
        .then(json => console.log(json))
}