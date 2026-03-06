import express from "express";
import "dotenv/config";
import { prisma } from "../../../lib/prisma"


const kategoriaRouter = express.Router();

kategoriaRouter.use(express.json());
kategoriaRouter.use(express.urlencoded({ extended: true }));

kategoriaRouter.get('/get', async (req, res) => {
  const allKategoria = await prisma.kategoria.findMany()
  res.status(200).json(allKategoria);
})

kategoriaRouter.get("/:id", async (req, res) => {

})

export { kategoriaRouter}