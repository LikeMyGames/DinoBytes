'use server'

const FOOD_API_URL = "https://world.openfoodfacts.net/"

export function queryFood(barcode: string) {
    fetch(FOOD_API_URL + `api/v2/products/${barcode}?fields=nutriscore_data,nutrition_grade`, {
        method: 'GET',
        headers: { Authorization: 'Basic ' + btoa('off:off') },
    })
        .then(req => {
            if (!req.ok) {
                return;
            }
            req.json();
        })
        .then(data => {
            console.log(data)
        })
}

export function initFoodAPI() {
    fetch(FOOD_API_URL + "cgi/session.pl", {
        method: 'GET',
        headers: { Authorization: 'Basic ' + btoa('off:off') },
    })
        .then(req => req.json())
        .then(json => console.log(json))
}