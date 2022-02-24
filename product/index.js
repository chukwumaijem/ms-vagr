require("dotenv").config({ silent: true });

const express = require("express");
const app = express();
const { faker } = require("@faker-js/faker");
const fetch = require("node-fetch");
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const automation = require("./automation");

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

app.get("/run-automation", async (_req, res) => {
  let driver;
  let output = {
    WorkerLogs: [],
  };

  try {
    const options = new chrome.Options();
    options.windowSize({
      width: 1024,
      height: 768,
    });
    options.addArguments("--no-sandbox");
    options.setUserPreferences({
      "Browser.setDownloadBehavior": "allow",
      "download.default_directory": "/home/selenium/Downloads",
      "download.prompt_for_download": false,
      "download.directory_upgrade": true,
      "plugins.always_open_pdf_externally": true,
    });
    driver = await new Builder()
      .usingServer("http://selenoid:4444/wd/hub")
      .setChromeOptions(options)
      .withCapabilities({
        browserName: "chrome",
        enableVNC: true,
      })
      .build();
    await automation(driver, output);
  } catch (error) {
    output = { output, success: false, error: error };
  } finally {
    if (driver) {
      driver.quit();
    }
  }

  res.json(output);
});

app.listen(PORT, () => {
  console.log("Server running on port ", PORT);
});
