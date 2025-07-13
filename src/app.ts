import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import reviewerRoutes from "./routes/ReviewerRoutes";
import wineRoutes from "./routes/WineRoutes";
import reviewRoutes from "./routes/ReviewRoutes";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${req.method}] - ${res.statusCode}  ${req.originalUrl}`);
    next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/reviewers', reviewerRoutes);
app.use('/wines', wineRoutes);
app.use('/review', reviewRoutes);

export default app;