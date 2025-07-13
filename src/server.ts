// src/server.ts
import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server avviato sulla porta ${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
  });
}).catch((err) => {
  console.error("❌ Errore nella connessione al DB:", err);
});
