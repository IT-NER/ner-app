import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get("/drink", async (req, res) => {
  let drink = await prisma.drink.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  res.status(200).json(drink);
});

//getById
app.get("/drink/:id", async (req, res) => {
  const { id } = req.params;
  const drink = await prisma.drink.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(drink);
});

//create
app.post("/drink", async (req, res) => {
  let item = req.body.data;
  let drink = await prisma.drink.create({
    data: {
      name: item.name,
    },
  });
  res.status(200).json(drink);
});

//update
app.put("/drink/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let drink = await prisma.drink.update({
    where: {
      id: Number(id),
    },
    data: {
      name: item.name,
    },
  });
  res.status(200).json(drink);
});

//delete
app.delete("/drink/:id", async (req, res) => {
  let id = req.params.id;
  let drink = await prisma.drink.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(drink);
});

// getDeviceByIds
app.post("/drink/ids", async (req, res) => {
  let item = req.body.data;
  let drink = await prisma.drink.findMany({
    where: {
      id: {
        in: item,
      },
    },
  });
  res.status(200).json(drink);
});

export default {
  path: "/api",
  handler: app,
};
