import express from 'express';
import dotenv from 'dotenv';
import imageRoutes from './routes/image.routes'
import bodyParser from 'body-parser';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';
const swaggerDocument = YAML.load(path.resolve(__dirname, '..', 'openapi.yaml'));
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

  
// Routes
app.use('/api/images', imageRoutes);
// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// // Serve static images (optional, for testing locally)
// app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// app.use('/converted', express.static(path.join(__dirname, '..', 'converted')));

app.get('/test', (req, res) => {
    res.send('Welcome to the test api');
}
);
app.get('/', (req, res) => {
    res.send('Welcome to the Image Processing API');
}
);
export default app;
