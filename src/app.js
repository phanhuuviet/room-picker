import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import roomRouter from "./routes/room.js";
import orderRouter from "./routes/order.js";

import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { sendEmail } from "./service/sendMail.js";
import bodyParser from "body-parser";

dotenv.config();
// khởi tạo
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", roomRouter);
app.use("/api", orderRouter);

mongoose
    .connect(
        "mongodb+srv://vietphanhuu:xrNwcz8RQSv2GNxq@room-picker.jtvumqf.mongodb.net/?retryWrites=true&w=majority&appName=room-picker"
    )
    .then(() => {
        console.log("Connect db success");
    });
app.get("/", async (req, res) => {
    res.json("success");
});

server.listen(process.env.PORT, (req, res) => {
    try {
        console.log(`Server is running on port ${process.env.PORT} `);
    } catch (error) {
        console.log(error);
    }
});
