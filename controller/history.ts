import type { Request, Response } from "express"
import { Location } from "../models/location"

export const getHistory = async (req: Request, res: Response) => {
    try {
        const {locationId, days} = req.params
        const location  = await Location.findByIdAndUpdate(locationId)
        if(!location){
            throw new Error("No location extsts with the given location ID")
        }

        const currentDate = new Date(); 
        const agoDays = new Date(currentDate); 
        agoDays.setDate(currentDate.getDate() - Number(days)); 

        const agoDate = `${agoDays.getFullYear()}-${agoDays.getMonth() + 1}-${agoDays.getDate()}`;
        const currentDateFormatted = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        const url = `${process.env.WEATHER_HISTORY_BASE_URL as string}?&aggregateHours=24&startDateTime=${agoDate}T00:00:00&endDateTime=${currentDateFormatted}T00:00:00&location=${location.latitude}, ${location.longitude}&contentType=json&key=${process.env.WEATHER_HISTORY_API_KEY}`
        const response = await fetch(url)
        const result = await response.json()
        return res.status(200).json(result)
        // console.log(result)
    } catch (error) {
        
    }
}