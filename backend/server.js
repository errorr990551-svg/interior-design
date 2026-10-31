require("dotenv").config();
const express = require("express");
const cors = require("cors");

const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());

app.get("/health", (req, res) => res.send("OK"));

app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
