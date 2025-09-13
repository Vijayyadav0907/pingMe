import express from "express";
import dotenv from "dotenv"
import authRoute from "../routes/auth.js";
import messageRoute from "../routes/message.route.js";

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;



app.use("/api/auth", authRoute)

app.use("/api/message",messageRoute)



app.listen(port, ()=>console.log("server started"));