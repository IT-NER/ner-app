import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get('/drink', async (req, res) => {
  let drink = await prisma.drink.findMany();
  res.status(200).json(drink);
});

//getById
app.get('/drink/:id', async (req, res) => {
  const { id } = req.params
  const drink = await prisma.drink.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(drink)
})


//create
app.post('/drink', async (req, res) => {
  let item = req.body.data
  let drink = await prisma.drink.create({
    data: {
      name: item.name
    },
  })
  res.status(200).json(drink)
})

//update
app.put('/drink/:id', async (req, res) => {
  let id = req.params.id
  let item = req.body.data
  let drink = await prisma.drink.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name: item.name
    },
  })
  res.status(200).json(drink)
})

//delete
app.delete('/drink/:id', async (req, res) => {
  let id = req.params.id
  let drink = await prisma.drink.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(drink)
})

export default {
  path: "/api",
  handler: app,
};
