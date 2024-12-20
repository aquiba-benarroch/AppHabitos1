let habits: any[] = []; // Por ahora usaremos un array, luego puedes conectar una base de datos.

export const getAllHabits = async () => {
  return habits;
};

export const addHabit = async (habit: any) => {
  const newHabit = { ...habit, id: Date.now() };
  habits.push(newHabit);
  return newHabit;
};
