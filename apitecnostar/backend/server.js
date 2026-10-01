import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/gerar-dieta", async (req, res) => {
  try {
    const dados = req.body;

    const prompt = `
    Crie uma dieta personalizada para:

    Nome: ${dados.nome}
    Idade: ${dados.idade}
    Sexo: ${dados.sexo}
    Peso: ${dados.peso}kg
    Altura: ${dados.altura}cm
    Objetivo: ${dados.objetivo}
    Atividade Física: ${dados.atividade}
    Restrições: ${dados.restricoes}

    Gere:
    - Calorias diárias
    - Macronutrientes
    - Café da manhã
    - Lanche
    - Almoço
    - Jantar
    - Lista de compras
    `;

    const resposta =
      await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Você é um nutricionista profissional."
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    res.json({
      dieta:
        resposta.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao gerar dieta",
    });
  }
});

app.listen(5000, () => {
  console.log("Servidor iniciado");
});