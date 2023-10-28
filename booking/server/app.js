import express, { application, urlencoded } from "express";
import { config } from "dotenv";
import paymentRoute from "./routes/PaymentRoutes.js";
import cors from "cors";

config({ path: "config/config.env" });
export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", paymentRoute);
app.get("/api/getkey",(req,res) => {
    res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})

// const PORT = process.env.PORT || 4000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
