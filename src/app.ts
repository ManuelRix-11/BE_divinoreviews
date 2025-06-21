import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import reviewRoutes from './routes/ReviewRoutes';

const app = express();

app.use(express.json());

app.use('/api/reviews', reviewRoutes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
