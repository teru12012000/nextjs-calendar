import express from "express";
import cors from "cors";
import { schedule } from "./router/schedule";
const app=express();
const PORT=5050;
app.use(express.json());
app.use(cors())
app.use('/schedule',schedule);
app.listen(PORT);