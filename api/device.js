import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get('/device', async (req, res) => {
  let device = await prisma.device.findMany({
    orderBy: [
      {
        id: 'desc',
      },
    ],
  });
  res.status(200).json(device);
});

//getById
app.get('/device/:id', async (req, res) => {
  const { id } = req.params
  const device = await prisma.device.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(device)
})


//create
app.post('/device', async (req, res) => {
  let item = req.body.data
  let device = await prisma.device.create({
    data: {
      name: item.name
    },
  })
  res.status(200).json(device)
})

//update
app.put('/device/:id', async (req, res) => {
  let id = req.params.id
  let item = req.body.data
  let device = await prisma.device.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name: item.name
    },
  })
  res.status(200).json(device)
})

//delete
app.delete('/device/:id', async (req, res) => {
  let id = req.params.id
  let device = await prisma.device.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(device)
})

export default {
  path: "/api",
  handler: app,
};
