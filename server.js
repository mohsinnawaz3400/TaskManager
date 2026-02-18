import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.send("Api is working");
});

// app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });

export default app;
