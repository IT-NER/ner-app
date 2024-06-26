import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get('/food', async (req, res) => {
  let food = await prisma.food.findMany({
    orderBy: [
      {
        id: 'desc',
      },
    ],
  });
  res.status(200).json(food);
});

//getById
app.get('/food/:id', async (req, res) => {
  const { id } = req.params
  const food = await prisma.food.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(food)
})


//create
app.post('/food', async (req, res) => {
  let item = req.body.data
  let food = await prisma.food.create({
    data: {
      name: item.name
    },
  })
  res.status(200).json(food)
})

//update
app.put('/food/:id', async (req, res) => {
  let id = req.params.id
  let item = req.body.data
  let food = await prisma.food.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name: item.name
    },
  })
  res.status(200).json(food)
})

//delete
app.delete('/food/:id', async (req, res) => {
  let id = req.params.id
  let food = await prisma.food.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(food)
})

export default {
  path: "/api",
  handler: app,
};
