import type { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';
import logger from '../logger';

const cache = new NodeCache({ stdTTL: 10 });


export const  cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const cacheKey = req.originalUrl; // Use the request URL as the cache key
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse) {
    logger.info("Fetching data from cache");
    res.status(200).json({message:"Successfully retrieved data",data:cachedResponse}); // Return cached response if available
  } else {
    logger.warn("Data not found in cache")
    // If response is not cached, proceed to the next middleware to make the API call
    next();
  }
};

// Function to store API response in the cache
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const storeInCache = (key: string, value: any, ttl = 600) => {
  cache.set(key, value, ttl);
};