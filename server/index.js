import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(cors());
app.use(cors({
    origin: 'http://localhost:3001', // Frontend origin
    credentials: true // Allow cookies
  }));
dotenv.config();



const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(()=>{

    console.log("DB connected successfully");

    

}).catch(error => console.log(error));

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})


app.use("/api", route);