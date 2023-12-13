import winston from "winston";

// Creates a new logger, settings are defined in the object passed to createLogger().
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "events-api" },
});

// Checks if the app is running in a production environment.
// If not (e.g. it's running in dev or testing environment) it adds a new 'Console' transport to the logger.
// In that case the logs will be output to the Console.
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        }),
    )
};

export default logger;