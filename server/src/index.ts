import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import dashboardRoutes from './routes/dashboardRoutes';

// CONFIGURATION
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use('/dashboard', dashboardRoutes);

// SERVER
const PORT = process.env.PORT ?? 3002;
app.listen(PORT, () => {
  console.log('Server running on port - ' + PORT);
});
