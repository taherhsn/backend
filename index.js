import express from "express"; 

import router from "./Routes/UserRoute.js";
import { connection } from "./Postgres/Db.js";
import cors from "cors" ; 

const app = express();

app.use(express.json()); 
app.use(cors()); 
app.use("/api", router); 

const port= 8000; 

app.listen(port,()=>{
     console.log(`server is running on ${port}`) ;

});

connection() ;