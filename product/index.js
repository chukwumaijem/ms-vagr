require("dotenv").config({ silent: true });

const express = require("express");
const app = express();
const { faker } = require("@faker-js/faker");
const fetch = require("node-fetch");

const PORT = process.env.PORT;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

app.get("/get-products", async (req, res) => {
  let data;
  try {
    const limit = req.query.limit || 10;

    data = Array(limit)
      .fill(1)
      .map(() => ({
        name: faker.vehicle.vehicle(),
        model: faker.vehicle.model(),
        color: faker.vehicle.color(),
        manufacturer: faker.vehicle.manufacturer(),
      }));

    for (let i = 0; i < data.length; i++) {
      try {
        const resp = await fetch(`${USER_SERVICE_URL}/get-seller`);
        const seller = await resp.json();
        data[i].seller = seller;
      } catch (error) {
        data[i].seller = null;
      }
    }
  } catch (error) {
    data = { success: false, error: error };
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
