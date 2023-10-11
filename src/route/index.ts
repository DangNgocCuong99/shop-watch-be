import { register ,login} from "../controller/user"
import express from "express"
const routerUser = express.Router()
routerUser.get('/register', register )
routerUser.get('/login', login )

export default routerUser