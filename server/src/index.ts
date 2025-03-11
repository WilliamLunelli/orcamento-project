import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Configuração
dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "API funcionando!" });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// Tratamento de erros no Prisma
prisma.$on("query", (e: any) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

// Lidar com o encerramento do aplicativo
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});
