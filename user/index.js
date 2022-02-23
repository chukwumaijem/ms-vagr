require("dotenv").config({ silent: true });

const express = require("express");
const app = express();
const { faker } = require("@faker-js/faker");

const PORT = process.env.PORT;

app.get("/get-users", (req, res) => {
  let data;
  try {
    const limit = req.query.limit || 10;
    data = Array(limit)
      .fill(1)
      .map(() => ({
        name: faker.name.findName(),
        email: faker.internet.email(),
      }));
  } catch (error) {
    data = { success: false, error: error };
  }

  res.json(data);
});

app.get("/get-seller", (_req, res) => {
  const data = {
    name: faker.name.findName(),
    email: faker.internet.email(),
  };
  res.json(data);
});

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
