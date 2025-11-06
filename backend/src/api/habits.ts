import axios from 'axios';

// URL base del backend
const API_URL = 'http://192.168.1.127:8000/api/habits'; // Cambia localhost por tu IP si usas un dispositivo físico

// Obtener todos los hábitos
export const fetchHabits = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los hábitos:', error);
      throw error;
    }
  };

// Crear un nuevo hábito
export const createHabit = async (habit) => {
  try {
    const response = await axios.post(API_URL, habit);
    return response.data; // Devuelve el hábito creado
  } catch (error) {
    console.error('Error al crear el hábito:', error);
    throw error;
  }
};

// Actualizar un hábito
export const updateHabit = async (id, updatedHabit) => {
  try {
    await axios.put(`${API_URL}/${id}`, updatedHabit);
  } catch (error) {
    console.error('Error al actualizar el hábito:', error);
    throw error;
  }
};

// Eliminar un hábito
export const deleteHabit = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar el hábito:', error);
    throw error;
  }
};