import logger from "../utils/log.js";

// Middleware that calculates the duration it takes to process a request, shows the HTTP method, URL and status code. 
// Uses the Winston logger to log the information in the console whenever a request gets sent.
const log = (req, res, next) => {
    const start = new Date();

    next();

    const ms = new Date() - start;
    logger.info(
        `${req.method} ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${ms} ms`,
    )
};

export default log;