import { Request, Response } from 'express';
import { getAllHabits, addHabit } from '../services/habitServices';

export const getHabits = async (req: Request, res: Response) => {
  const habits = await getAllHabits();
  res.json(habits);
};

export const createHabit = async (req: Request, res: Response) => {
  const habit = req.body;
  const newHabit = await addHabit(habit);
  res.status(201).json(newHabit);
};
