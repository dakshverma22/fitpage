import { Router } from "express";
import { getWeatherForcast } from "../controller/weather";
import { cacheMiddleware } from "../middleware/cacheResponse";


const weatherRouter = Router()

weatherRouter.get('/:locationId',cacheMiddleware ,getWeatherForcast)

export default weatherRouter