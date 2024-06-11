import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get('/department', async (req, res) => {
  let department = await prisma.department.findMany();
  res.status(200).json(department);
});

//getById
app.get('/department/:id', async (req, res) => {
  const { id } = req.params
  const department = await prisma.department.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(department)
})


//create
app.post('/department', async (req, res) => {
  let item = req.body.data
  let department = await prisma.department.create({
    data: {
      name: item.name
    },
  })
  res.status(200).json(department)
})

//update
app.put('/department/:id', async (req, res) => {
  let id = req.params.id
  let item = req.body.data
  let department = await prisma.department.update({
    where: {
      id: parseInt(id)
    },
    data: {
      name: item.name
    },
  })
  res.status(200).json(department)
})

//delete
app.delete('/department/:id', async (req, res) => {
  let id = req.params.id
  let department = await prisma.department.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.status(200).json(department)
})

export default {
  path: "/api",
  handler: app,
};
