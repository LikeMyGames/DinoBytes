'use server'

const FOOD_API_URL = "https://world.openfoodfacts.net/"

export async function queryFood(barcode: string) {
    fetch(FOOD_API_URL + `api/v2/products/${barcode}?fields=nutriscore_data,nutrition_grade`, {
        method: 'GET',
        headers: { Authorization: 'Basic ' + btoa('off:off') },
    })
        .then(res => {
            console.log(res)
            if (!res.ok) {
                return;
            }
            res.json();
        })
        .then(data => {
            console.log(data)
        })
}

export async function initFoodAPI() {
    fetch(FOOD_API_URL + "cgi/session.pl", {
        method: 'GET',
        headers: { Authorization: 'Basic ' + btoa('off:off') },
    })
        .then(req => req.json())
        .then(json => console.log(json))
}