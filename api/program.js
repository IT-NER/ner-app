import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get('/program', async (req, res) => {
  let program = await prisma.program.findMany();
  res.status(200).json(program);
});

//getById
app.get('/program/:id', async (req, res) => {
  const { id } = req.params
  const program = await prisma.program.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(program)
})


//create
app.post('/program', async (req, res) => {
  let item = req.body.data
  let program = await prisma.program.create({
    data: {
      name: item.name
    },
  })
  res.status(200).json(program)
})

//update
app.put('/program/:id', async (req, res) => {
  let id = req.params.id
  let item = req.body.data
  let program = await prisma.program.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name: item.name
    },
  })
  res.status(200).json(program)
})

//delete
app.delete('/program/:id', async (req, res) => {
  let id = req.params.id
  let program = await prisma.program.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(program)
})

export default {
  path: "/api",
  handler: app,
};
