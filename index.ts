import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import logger from "./logger";
import weatherRouter from "./routes/weatherRoutes";
import locationRouter from "./routes/locationRoutes";
import rateLimit from "express-rate-limit";
import historyRouter from "./routes/historyRoutes";

const app  = express()

const PORT = process.env.PORT

app.use(express.json())

mongoose.connect(process.env.MONGO_CONNECTION_URL as string)
    .then(() => logger.info("Database connect successfully"))
    .catch((error) => logger.error(`Error connecting to database due to ${error}`))


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
  });
  
  // Apply rate limiting middleware to all routes
app.use(limiter);

app.use('/weather', weatherRouter)

app.use('/locations', locationRouter)

app.use('/history', historyRouter)

app.use('*', (req, res) => {
    return res.status(400).json({message:"Invalid route", data: null})
})

app.listen(PORT || 3002, () => {
    logger.info(`Server is running on port ${PORT || 3002}`)
})