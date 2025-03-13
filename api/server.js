const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(express.json()).use(cors());

app.post("/api/send-to-zapier", async (req, res) => {
  try {
    const response = await axios.post(
      "https://hooks.zapier.com/hooks/catch/16327715/2sqvtiy/",
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

app.post("/api/send-offer", async (req, res) => {
  try {
    const response = await axios.post(
      "https://hooks.zapier.com/hooks/catch/16327715/2sqvtiy/",
      req.body
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
