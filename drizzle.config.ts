import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Cambia esta ruta a la ubicación exacta de tu .env
dotenv.config({ path: "C:/Users/crist/OneDrive/Escritorio/Repair-Shop/repairshop/.env" });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("❌ DATABASE_URL no encontrada. Verifica tu archivo .env en la raíz del proyecto");
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});



