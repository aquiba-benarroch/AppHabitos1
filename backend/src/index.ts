import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000; // Cambiar aquí el puerto
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

