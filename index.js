import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./server/routes/auth.routes.js";
import connectDB from "./server/DB/databaseConfigs.js";
import { uploder } from "./server/middleware/uploder.js";
import { v2 as cloudinary } from "cloudinary";
import { uploadSingle } from "./server/middleware/uploadSingle.js";
import blogRoutes from "./server/routes/blog.routes.js";
import projectRoutes from "./server/routes/project.routes.js";
import donateRoutes from "./server/routes/donate.routes.js"
import paymentRoutes from "./server/routes/payments.routes.js"
import subscriptionRoutes from "./server/routes/subscription.routes.js"


const app = express();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();
app.use(cors());
app.use(express.json()); 
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/donate', donateRoutes);
app.use('/api/pay', paymentRoutes);
app.use('/api/subscription', subscriptionRoutes);


app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.post("/upload", uploder.single("file"), uploadSingle, async (req, res) => {
  res.send(req.body);
});
app.get("/", (req, res) => {
  res.send("Hello to online API");
});
app.listen(PORT, () => {
  connectDB();
  console.log(`Server Running on port ${PORT}`);
});
