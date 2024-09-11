import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import dashboardRoutes from './routes/dashboardRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import expenseRoutes from './routes/expenseRoutes';

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
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/expenses', expenseRoutes);

// SERVER
const PORT = Number(process.env.PORT) ?? 3002;
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port - ' + PORT);
});
