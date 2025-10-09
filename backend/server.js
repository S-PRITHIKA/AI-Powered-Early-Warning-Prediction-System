// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// // Needed to get __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load .env from backend folder
// dotenv.config({ path: path.join(__dirname, ".env") });

// console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

// import express from "express";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import incidentRoutes from "./routes/incidentRoutes.js";
// import userRoutes from "./routes/userRoutes.js";

// // Middleware
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Database
// connectDB();

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/incidents", incidentRoutes);

// app.get("/", (req, res) => {
//   res.send("🌊 Ocean API is running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load .env from backend folder
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import incidentRoutes from "./routes/incidentRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// ------------------- Middleware -------------------
const app = express();
app.use(cors());
app.use(express.json());

// ------------------- Database ---------------------
connectDB();

// ------------------- Routes -----------------------
app.use("/api/users", userRoutes);
app.use("/api/incidents", incidentRoutes);

app.get("/", (req, res) => {
  res.send("🌊 Ocean API is running...");
});

// ------------------- Server -----------------------
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
