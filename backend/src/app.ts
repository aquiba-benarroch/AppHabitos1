import express from 'express';
import cors from 'cors';
import habitRoutes from './routes/habitRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/habits', habitRoutes);

export default app;
