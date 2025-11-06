import express from 'express';
import habitsRoutes from './routes/habitsRoutes';
import cors from 'cors';

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.send('¡Bienvenido al backend de tu aplicación!');
});

// Permitir todas las solicitudes (ajusta según sea necesario)
app.use(cors());

// Usa las rutas de hábitos
app.use('/api', habitsRoutes);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});