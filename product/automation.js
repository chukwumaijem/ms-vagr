const { By, until } = require("selenium-webdriver");

const configuration = {
  timeout: 15000,
};
const sirvEmail = process.env.SIRV_EMAIL;
const sirvPassword = process.env.SIRV_PASSWORD;

module.exports = async function (driver, vars) {
  vars["WorkerLogs"] = await driver.executeScript(`return [];`);
  await driver.get("https://my.sirv.com");
  vars["WorkerLogs"] = await driver.executeScript(
    `return [...arguments[0], {'event':'open','success':true,'next':'type'}];`,
    vars["WorkerLogs"]
  );
  await driver.wait(
    until.elementLocated(By.name(`Email address`)),
    configuration.timeout
  );
  await driver.findElement(By.name(`Email address`)).then((element) => {
    return element.clear().then(() => {
      return element.sendKeys(sirvEmail);
    });
  });
  vars["WorkerLogs"] = await driver.executeScript(
    `return [...arguments[0], {'event':'type','success':true,'next':'type'}];`,
    vars["WorkerLogs"]
  );
  await driver.wait(
    until.elementLocated(By.name(`Password`)),
    configuration.timeout
  );
  await driver.findElement(By.name(`Password`)).then((element) => {
    return element.clear().then(() => {
      return element.sendKeys(sirvPassword);
    });
  });
  vars["WorkerLogs"] = await driver.executeScript(
    `return [...arguments[0], {'event':'type','success':true,'next':'click'}];`,
    vars["WorkerLogs"]
  );
  await driver.wait(
    until.elementLocated(By.css(`.btn-primary`)),
    configuration.timeout
  );
  await driver.findElement(By.css(`.btn-primary`)).then((element) => {
    return element.click();
  });
  vars["WorkerLogs"] = await driver.executeScript(
    `return [...arguments[0], {'event':'click','success':true,'next':'click'}];`,
    vars["WorkerLogs"]
  );
  await driver.wait(
    until.elementLocated(By.css(`.file-icon--file:nth-child(1)`)),
    configuration.timeout
  );
  await driver
    .findElement(By.css(`.file-icon--file:nth-child(1)`))
    .then((element) => {
      return element.click();
    });
  vars["WorkerLogs"] = await driver.executeScript(
    `return [...arguments[0], {'event':'click','success':true,'next':'click'}];`,
    vars["WorkerLogs"]
  );
  await driver.wait(
    until.elementLocated(By.css(`.fa-download`)),
    configuration.timeout
  );
  await driver.findElement(By.css(`.fa-download`)).then((element) => {
    return element.click();
  });
  vars["WorkerLogs"] = await driver.executeScript(
    `return [...arguments[0], {'event':'click','success':true,'next':'click'}];`,
    vars["WorkerLogs"]
  );
  await driver.wait(
    until.elementLocated(By.css(`.fa-arrow-left`)),
    configuration.timeout
  );
  await driver.findElement(By.css(`.fa-arrow-left`)).then((element) => {
    return element.click();
  });
  vars["WorkerLogs"] = await driver.executeScript(
    `return [...arguments[0], {'event':'click','success':true,'next':'click'}];`,
    vars["WorkerLogs"]
  );
  await driver.wait(
    until.elementLocated(By.css(`.grid-item:nth-child(2) .file-thumbnail`)),
    configuration.timeout
  );
  await driver
    .findElement(By.css(`.grid-item:nth-child(2) .file-thumbnail`))
    .then((element) => {
      return element.click();
    });
  vars["WorkerLogs"] = await driver.executeScript(
    `return [...arguments[0], {'event':'click','success':true,'next':'click'}];`,
    vars["WorkerLogs"]
  );
  await driver.wait(
    until.elementLocated(
      By.css(`.nav-item:nth-child(2) > #action\\.id > .nav-link`)
    ),
    configuration.timeout
  );
  await driver
    .findElement(By.css(`.nav-item:nth-child(2) > #action\\.id > .nav-link`))
    .then((element) => {
      return element.click();
    });
  vars["WorkerLogs"] = await driver.executeScript(
    `return [...arguments[0], {'event':'click','success':true,'next':'click'}];`,
    vars["WorkerLogs"]
  );
  await driver.wait(
    until.elementLocated(By.css(`.fa-arrow-left`)),
    configuration.timeout
  );
  await driver.findElement(By.css(`.fa-arrow-left`)).then((element) => {
    return element.click();
  });
  vars["WorkerLogs"] = await driver.executeScript(
    `return [...arguments[0], {'event':'click','success':true,'next':'Done'}];`,
    vars["WorkerLogs"]
  );
};
