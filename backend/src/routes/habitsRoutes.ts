import express from 'express';
const router = express.Router();
import db from '../config/db'; // Asegúrate de que la conexión está configurada correctamente

// Ruta para obtener todos los hábitos
router.get('/habits', (req, res) => {
    db.query('SELECT * FROM habits', (err, results) => {
        if (err) {
            console.error('Error obteniendo hábitos:', err.message);
            return res.status(500).send('Error en el servidor');
        }
        res.json(results);
    });
});

// Nueva ruta para crear un hábito
router.post('/habits', (req, res) => {
    const { name, description, days, start_date, end_date, completion_history } = req.body;

    const query = `
        INSERT INTO habits (name, description, days, start_date, end_date, completion_history)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [name, description, days, start_date, end_date, completion_history], (err, results) => {
        if (err) {
            console.error('Error insertando hábito:', err.message);
            return res.status(500).send('Error en el servidor');
        }
        res.status(201).json({ message: 'Hábito creado', id: results.insertId });
    });
});

export default router;