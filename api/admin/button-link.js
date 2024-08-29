import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get("/button-link", async (req, res) => {
  let data = await prisma.buttonLink.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  res.status(200).json(data);
});

//getById
app.get("/button-link/:id", async (req, res) => {
  const { id } = req.params;
  const data = await prisma.buttonLink.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(data);
});

//create
app.post("/button-link", async (req, res) => {
  let item = req.body.data;
  let data = await prisma.buttonLink.create({
    data: {
      name: String(item.name),
      url: String(item.url),
      remark: String(item.remark),
      active: Boolean(item.active),
    },
  });
  res.status(200).json(data);
});

//update
app.put("/button-link/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let data = await prisma.buttonLink.update({
    where: {
      id: Number(id),
    },
    data: {
      name: String(item.name),
      url: String(item.url),
      remark: String(item.remark),
      active: Boolean(item.active),
    },
  });
  res.status(200).json(data);
});

//delete
app.delete("/button-link/:id", async (req, res) => {
  let id = req.params.id;
  let data = await prisma.buttonLink.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(data);
});

// getAllActive
app.get("/button-link-active", async (req, res) => {
  let data = await prisma.buttonLink.findMany({
    where: {
      active: Boolean(true),
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  res.status(200).json(data);
});

export default {
  path: "/api/admin",
  handler: app,
};
