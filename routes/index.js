import * as express from "express"
import APIrouter from "./Indivs/index.js"


const router = express.Router();

router.use('/api', APIrouter )
// router.use('/auth',authRouter)



export default router;