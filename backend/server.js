const express = require("express");
const cors = require("cors");
const pathwayRoutes = require("./routes/pathwayRoutes");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Enable CORS for all origins
app.use(cors()); // Allow all origins (for development purposes)

app.use(bodyParser.json()); // Middleware to parse JSON
app.use("/api/pathways", pathwayRoutes); // Ensure the path is correctly prefixed with /api/pathways

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
