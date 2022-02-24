require("dotenv").config({ silent: true });

const express = require("express");
const fetch = require("node-fetch");
const app = express();

const PORT = process.env.PORT;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

app.get("/get-products", async (_req, res) => {
  let data;
  try {
    const resp = await fetch(`${PRODUCT_SERVICE_URL}/get-products`);
    data = await resp.json();
  } catch (error) {
    data = { success: false, error: error };
  }

  res.json(data);
});

app.get("/run-automation", async (_req, res) => {
  let data;
  try {
    const resp = await fetch(`${PRODUCT_SERVICE_URL}/run-automation`);
    data = await resp.json();
  } catch (error) {
    data = { success: false, error: error };
  }

  res.json(data);
});

app.get("/get-users", async (_req, res) => {
  let data;

  try {
    const resp = await fetch(`${USER_SERVICE_URL}/get-users`);
    data = await resp.json();
  } catch (error) {
    data = { success: false, error: error };
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
