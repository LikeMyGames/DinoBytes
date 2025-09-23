import { Item } from "@/app/page";

  async function krogerAPI(): Promise<Item[]> {
      const externalApiKey = process.env.EXTERNAL_API_KEY;
      const res = await fetch('https://api.kroger.com/v1/products?filter.brand={{BRAND}}&filter.term={{TERM}}&filter.locationId={{LOCATION_ID}}');
      const data = await res.json();
      return [
        {},
        {}
    ] as Item[]
    }