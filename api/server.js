const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(express.json()).use(cors());

const hookMap = {
  SOFLETE: "https://hooks.zapier.com/hooks/catch/16327715/2sqvtiy/",
  BYGGPROFFS: "TEST",
};

app.post("/api/send-to-zapier", async (req, res) => {
  const formData = req.body.formData;
  const company = req.body.company.toUpperCase();
  const endpoint = hookMap[company];

  try {
    const response = await axios.post(endpoint, formData);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ message: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
