import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get('/role', async (req, res) => {
  let role = await prisma.role.findMany();
  res.status(200).json(role);
});

//getById
app.get('/role/:id', async (req, res) => {
  const { id } = req.params
  const role = await prisma.role.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(role)
})


//create
app.post('/role', async (req, res) => {
  let item = req.body.data
  let role = await prisma.role.create({
    data: {
      name: item.name
    },
  })
  res.status(200).json(role)
})

//update
app.put('/role/:id', async (req, res) => {
  let id = req.params.id
  let item = req.body.data
  let role = await prisma.role.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name: item.name
    },
  })
  res.status(200).json(role)
})

//delete
app.delete('/role/:id', async (req, res) => {
  let id = req.params.id
  let role = await prisma.role.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(role)
})

export default {
  path: "/api",
  handler: app,
};
