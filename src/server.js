const Airbrake = require("@airbrake/node");
const airbrakeExpress = require("@airbrake/node/dist/instrumentation/express");
const express = require("express");
const helmet = require("helmet");
const logger = require("./logger");
const port = process.env.SERVER_PORT || "8080";
const romannumeral = require("./romannumeral");

require("dotenv").config();


const airbrake = new Airbrake.Notifier({
    projectId: process.env.AIRBRAKE_PROJECT_ID,
    projectKey: process.env.AIRBRAKE_PROJECT_KEY,
    environment: process.env.AIRBRAKE_PROJECT_ENVIRONMENT,
  });

const app = express();
app.use(helmet());
app.use(airbrakeExpress.makeMiddleware(airbrake));

app.get("/romannumeral", (request, response) => {
  const num = request.query["query"];
  if (!num) {
    logger.warn("No query value provided");
    response.status(400).send("No query value provided");
    return;
  }
  if (!romannumeral.validate(num)) {
    logger.warn(
      `Provided value '${num}' could not be converted to roman numeral`
    );
    response
      .status(400)
      .send("Provided value could not be converted to roman numeral");
    return;
  } else {
    const converted = romannumeral.convert(num);
    logger.debug(`Successfully converted ${num} to ${converted}`);
    response.status(200).send(converted);
  }
});

app.use(airbrakeExpress.makeErrorHandler(airbrake));
const server = app.listen(port, () => {
  logger.info(`Example app listening at http://localhost:${port}/romannumeral`);
});

module.exports = server;
