import * as express from "express"
import subsRouter from "./subs.js"
import domiRouter from "./Domi.js"
import itemRouter from "./item.js"


const router = express.Router()


router.use("/subs",subsRouter) // this was just a test type
router.use("/domi",domiRouter)
router.use("/item",itemRouter)


export default router