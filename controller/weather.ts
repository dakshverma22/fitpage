import type { Request, Response } from "express"
import { Location } from "../models/location"
import logger from "../logger"
import { storeInCache } from "../middleware/cacheResponse"


export const getWeatherForcast = async (req: Request, res: Response) => {
    try {
        const {locationId} = req.params
        const location = await Location.findById(locationId)
        let message: string;
        if(!location){
            message = "Can not find location with the specified ID"
            logger.error(message)
            throw new Error(message)
        }
        const {latitude, longitude} = location
        logger.info("Fetching weather data from external API")
        const response = await fetch(`${process.env.WEATHER_BASE_URL as string}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.WEATHER_API_KEY}`)
        const result = await response.json()
        const locationData = {
            description: result.weather[0].location,
            temperature: result.main.temp,
            humidity:result.main.humidity,
            windSpeed: result.wind.speed
        }
        logger.info("Storing data in cache")
        storeInCache(req.originalUrl, locationData);
        message = "Successfully retrieved location data"
        logger.info(message)
        return res.status(200).json({message, data: locationData})
    } catch (error) {
        logger.error(error)
        return res.status(500).json({message:error, data:null})
    }
}