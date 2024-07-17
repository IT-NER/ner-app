import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get("/publishStatus", async (req, res) => {
  let publishStatus = await prisma.publishStatus.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  res.status(200).json(publishStatus);
});

//getById
app.get("/publishStatus/:id", async (req, res) => {
  const { id } = req.params;
  const publishStatus = await prisma.publishStatus.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200).json(publishStatus);
});

//create
app.post("/publishStatus", async (req, res) => {
  let item = req.body.data;
  let publishStatus = await prisma.publishStatus.create({
    data: {
      name: item.name,
    },
  });
  res.status(200).json(publishStatus);
});

//update
app.put("/publishStatus/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let publishStatus = await prisma.publishStatus.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: item.name,
    },
  });
  res.status(200).json(publishStatus);
});

//delete
app.delete("/publishStatus/:id", async (req, res) => {
  let id = req.params.id;
  let publishStatus = await prisma.publishStatus.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200).json(publishStatus);
});

export default {
  path: "/api",
  handler: app,
};
