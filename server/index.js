const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const API_KEY = "a6da820299426cb6a613cac7f8c8f78e";

app.get("/api/observations", async (req, res) => {
  const { series_id } = req.query;

  try {
    const response = await axios.get("https://api.stlouisfed.org/fred/series/observations", {
      params: {
        api_key: API_KEY,
        file_type: "json",
        series_id
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error("Proxy Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => console.log("Proxy server running on http://localhost:4000"));
