import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get("/contentType", async (req, res) => {
  let contentType = await prisma.contentType.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  res.status(200).json(contentType);
});

//getById
app.get("/contentType/:id", async (req, res) => {
  const { id } = req.params;
  const contentType = await prisma.contentType.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(contentType);
});

//create
app.post("/contentType", async (req, res) => {
  let item = req.body.data;
  let contentType = await prisma.contentType.create({
    data: {
      name: item.name,
    },
  });
  res.status(200).json(contentType);
});

//update
app.put("/contentType/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let contentType = await prisma.contentType.update({
    where: {
      id: Number(id),
    },
    data: {
      name: item.name,
    },
  });
  res.status(200).json(contentType);
});

//delete
app.delete("/contentType/:id", async (req, res) => {
  let id = req.params.id;
  let contentType = await prisma.contentType.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(contentType);
});

export default {
  path: "/api",
  handler: app,
};
