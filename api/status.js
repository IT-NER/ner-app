import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get('/status', async (req, res) => {
  let status = await prisma.status.findMany({
    orderBy: [
      {
        id: 'desc',
      },
    ],
  });
  res.status(200).json(status);
});

//getById
app.get('/status/:id', async (req, res) => {
  const { id } = req.params
  const status = await prisma.status.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(status)
})


//create
app.post('/status', async (req, res) => {
  let item = req.body.data
  let status = await prisma.status.create({
    data: {
      name: item.name
    },
  })
  res.status(200).json(status)
})

//update
app.put('/status/:id', async (req, res) => {
  let id = req.params.id
  let item = req.body.data
  let status = await prisma.status.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name: item.name
    },
  })
  res.status(200).json(status)
})

//delete
app.delete('/status/:id', async (req, res) => {
  let id = req.params.id
  let status = await prisma.status.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(status)
})

export default {
  path: "/api",
  handler: app,
};
