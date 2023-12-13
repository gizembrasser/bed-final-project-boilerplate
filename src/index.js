import express from "express";
import * as Sentry from "@sentry/node";

import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

Sentry.init({
  dsn: 'https://b5733d0526d680a96880b0806c7dd41d@o4506263121821696.ingest.sentry.io/4506387601293312',
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0,
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// Global middleware
app.use(express.json());
app.use(log);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Error handling
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
