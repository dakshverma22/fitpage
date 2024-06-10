import type { Request, Response } from "express"
import { Location } from "../models/location"
import logger from "../logger"

export const addLocation = async (req: Request, res: Response) => {
    try {
        const {name, latitude, longitude} = req.body

        const location = await Location.create({name, latitude, longitude})
        let message: string;
        if(!location){
            message = "Error creating location"
            logger.error(message)
            throw new Error(message)
        }
        message = "Successfully created location"
        logger.info(message)
        return res.status(201).json({message, data:location})
    } catch (error) {
        logger.error(error)
        return res.status(500).json({message:error, data:null})
    }
}

export const getLocations = async (req: Request, res: Response) => {
    try {
        const locations = await Location.find({})
        let message: string;
        if(locations.length <= 0){
            message = "No locations found"
            logger.error(message)
            throw new Error(message)
        }
        message = "Successfully retrieved locations"
        logger.info(message)
        return res.status(200).json({message, data: locations})
    } catch (error) {
        logger.error(error)
        return res.status(500).json({message:error, data:null})
    }
}

export const getLocation = async (req: Request, res: Response) => {
    try {
        const {locationId} = req.params
        const location = await Location.findById(locationId)
        let message: string;
        if(!location){
            message = `No location found with the given ID ${locationId}`
            logger.error(message)
            throw new Error(message)
        }
        message = "Successfully retrieved location"
        logger.info(message)
        return res.status(200).json({message, data: location})
    } catch (error) {
        logger.error(error)
        return res.status(500).json({message:error, data:null})
    }
}

export const updateLocation = async (req: Request, res: Response) => {
    try {
        const {locationId} = req.params
        const updatedData = req.body
        const updatedLocation = await Location.findByIdAndUpdate(locationId,{$set:updatedData}, {new:true, runValidators:true})
        let message: string;
        if(!updatedLocation){
            message = "No location found to update"
            logger.error(message)
            throw new Error(message)
        }
        message = "Successfully updated location"
        logger.info(message)
        return res.status(200).json({message, data:updateLocation})
    } catch (error) {
        logger.error(error)
        return res.status(500).json({message:error, data:null})
    }
}

export const deleteLocation = async (req: Request, res: Response) => {
    try {
        const {locationId} = req.params
        const deletedLocation = await Location.findByIdAndDelete(locationId)
        let message:string
        if(!deletedLocation){
            message = `No location found to delete for given ID ${locationId}`
            logger.error(message)
            throw new Error(message)
        }
        message = "Successfully deleted location"
        logger.info(message)
        return res.status(200).json({message, data:deleteLocation})
    } catch (error) {
        logger.error(error)
        return res.status(500).json({message:error, data:null})
    }
}