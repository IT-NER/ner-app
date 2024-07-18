import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getAll
app.get("/meetingType", async (req, res) => {
  let meetingType = await prisma.meetingType.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  res.status(200).json(meetingType);
});

//getById
app.get("/meetingType/:id", async (req, res) => {
  const { id } = req.params;
  const meetingType = await prisma.meetingType.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(meetingType);
});

//create
app.post("/meetingType", async (req, res) => {
  let item = req.body.data;
  let meetingType = await prisma.meetingType.create({
    data: {
      name: item.name,
    },
  });
  res.status(200).json(meetingType);
});

//update
app.put("/meetingType/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let meetingType = await prisma.meetingType.update({
    where: {
      id: Number(id),
    },
    data: {
      name: item.name,
    },
  });
  res.status(200).json(meetingType);
});

//delete
app.delete("/meetingType/:id", async (req, res) => {
  let id = req.params.id;
  let meetingType = await prisma.meetingType.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(meetingType);
});

export default {
  path: "/api",
  handler: app,
};
