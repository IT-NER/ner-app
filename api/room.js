import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get('/room', async (req, res) => {
  let room = await prisma.room.findMany({
    orderBy: [
      {
        id: 'desc',
      },
    ],
  });
  res.status(200).json(room);
});

//getById
app.get('/room/:id', async (req, res) => {
  const { id } = req.params
  const room = await prisma.room.findUnique({
    where: {
      id: parseInt(id),
    }
  })
  res.status(200).json(room)
})


//create
app.post('/room', async (req, res) => {
  // console.log('req', req.body);
  // return

  let item = req.body.data
  let room = await prisma.room.create({
    data: {
      name: item.name,
      color: item.color.hexa,
      quantity: parseInt(item.quantity),
    },
  })
  res.status(200).json(room)
})

//update
app.put('/room/:id', async (req, res) => {
  let id = req.params.id
  let item = req.body.data
  let room = await prisma.room.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name: item.name,
      color: item.color,
      quantity: parseInt(item.quantity)
    },
  })
  res.status(200).json(room)
})

//delete
app.delete('/room/:id', async (req, res) => {
  let id = req.params.id
  let room = await prisma.room.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(room)
})

export default {
  path: "/api",
  handler: app,
};
