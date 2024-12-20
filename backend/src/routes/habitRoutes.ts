import { Router } from 'express';
import { getHabits, createHabit } from '../controllers/habitController';

const router = Router();

router.get('/', getHabits); // Ruta para obtener hábitos
router.post('/', createHabit); // Ruta para crear un hábito

export default router;
