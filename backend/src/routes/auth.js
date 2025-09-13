import express from "express"
import { signup,login,logout } from "../controllers/auth.controller.js";
import arcjetProtection from "../middlewares/arcjet.middleware.js";

const router = express.Router();


router.use(arcjetProtection)

router.get("/test",(req,res)=>{
    res.send("hello from test")
})

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)


export default router;