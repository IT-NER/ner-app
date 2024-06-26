import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get('/position', async (req, res) => {
  let position = await prisma.position.findMany({
    orderBy: [
      {
        id: 'desc',
      },
    ],
  });
  res.status(200).json(position);
});

//getById
app.get('/position/:id', async (req, res) => {
  const { id } = req.params
  const position = await prisma.position.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(position)
})


//create
app.post('/position', async (req, res) => {
  let item = req.body.data
  let position = await prisma.position.create({
    data: {
      name: item.name
    },
  })
  res.status(200).json(position)
})

//update
app.put('/position/:id', async (req, res) => {
  let id = req.params.id
  let item = req.body.data
  let position = await prisma.position.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name: item.name
    },
  })
  res.status(200).json(position)
})

//delete
app.delete('/position/:id', async (req, res) => {
  let id = req.params.id
  let position = await prisma.position.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(position)
})

export default {
  path: "/api",
  handler: app,
};
