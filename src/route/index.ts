import { getUser } from "../controller/user"
import express from "express"
const routerUser = express.Router()
routerUser.get('/', getUser )

export default routerUser