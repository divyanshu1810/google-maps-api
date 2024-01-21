// Install the 'axios' library using npm install axios
import axios from "axios";
import fs from "fs";
import { config } from "dotenv";
config();

interface HardwareStore {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
}

async function getNearbyHardwareStores(
    latitude: number,
    longitude: number
): Promise<unknown> {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;

        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=hardware_store&key=${apiKey}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching nearby hardware stores:", error);
        throw error;
    }
}

const latitude = 37.7749;
const longitude = -122.4194;

getNearbyHardwareStores(latitude, longitude)
    .then((hardwareStores) => {
        const jsonData = JSON.stringify(hardwareStores, null, 2);
        const fileName = "nearbyHardwareStores.json";
        fs.writeFileSync(fileName, jsonData);
        console.log(`Nearby Hardware Stores data written to ${fileName}`);
    })
    .catch((error) => {
        console.error("Error:", error.message);
    });
