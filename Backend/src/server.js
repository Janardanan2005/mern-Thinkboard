


import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"; 
import {rateLimiter} from "./middlerware/rateLimiter.js";

dotenv.config();



const app = express();
const PORT =process.env.PORT || 5001;

// app.use(cors({
//     origin:"http://localhost:5173",
// }
    
// ));
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.options("*", cors()); 

app.use(express.json());

app.use("/api/notes",rateLimiter);


app.use("/api/notes", notesRoutes);


connectDB().then(()=>{
    app.listen(PORT,() => {
    console.log("serever started on PORT:",PORT);
        });  
})



