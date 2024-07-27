import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get("/contentStatus", async (req, res) => {
  let contentStatus = await prisma.contentStatus.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  res.status(200).json(contentStatus);
});

//getById
app.get("/contentStatus/:id", async (req, res) => {
  const { id } = req.params;
  const contentStatus = await prisma.contentStatus.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(contentStatus);
});

//create
app.post("/contentStatus", async (req, res) => {
  let item = req.body.data;
  let contentStatus = await prisma.contentStatus.create({
    data: {
      name: item.name,
    },
  });
  res.status(200).json(contentStatus);
});

//update
app.put("/contentStatus/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let contentStatus = await prisma.contentStatus.update({
    where: {
      id: Number(id),
    },
    data: {
      name: item.name,
    },
  });
  res.status(200).json(contentStatus);
});

//delete
app.delete("/contentStatus/:id", async (req, res) => {
  let id = req.params.id;
  let contentStatus = await prisma.contentStatus.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(contentStatus);
});

export default {
  path: "/api",
  handler: app,
};
