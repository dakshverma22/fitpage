import { Router } from "express";
import { getHistory } from "../controller/history";

const historyRouter = Router()

historyRouter.get('/:locationId/:days', getHistory)

export default historyRouter