import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";

import type { ErrorRequestHandler } from "express";

const app = express();

app.use(cors());
app.use(express.json());

// Use morgan to log requests
morgan.token('timestamp', () => new Date().toISOString());
app.use(morgan('[:timestamp] :remote-addr :method :url :status :response-time ms'));

// Load routes
app.use( '/api', routes );

// Manage errors
const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    res.status(400).json({
        success: false,
        message: err.message
    });
};

app.use(errorHandler);

export default app;