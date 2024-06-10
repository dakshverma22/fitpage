import { Router } from "express";
import { getLocation, getLocations, addLocation, updateLocation, deleteLocation,  } from "../controller/location";
import validate from "../middleware/requestValidator";
import {locationSchema, updatedLocationSchema} from "../requestSchema/location";

const locationRouter = Router()

locationRouter.get('/', getLocations)
locationRouter.post('/',validate(locationSchema) ,addLocation)
locationRouter.get('/:locationId', getLocation)
locationRouter.put('/:locationId', validate(updatedLocationSchema),updateLocation)
locationRouter.delete('/:locationId', deleteLocation)


export default locationRouter

