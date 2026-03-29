


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"; 
import {rateLimiter} from "./middlerware/rateLimiter.js";

dotenv.config();



const app = express();

app.set("trust proxy", 1);

const PORT =process.env.PORT || 5001;
const __dirname = path.resolve()

if(process.env.NODE_ENV !== "production"){


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
}

app.options("*", cors()); 

app.use(express.json());

app.use("/api/notes",rateLimiter);


app.use("/api/notes", notesRoutes);


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../Frontend/dist")))

app.get("*", (_req,res) => {
  res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
});
}



connectDB().then(()=>{
    app.listen(PORT,() => {
    console.log("serever started on PORT:",PORT);
        });  
})



