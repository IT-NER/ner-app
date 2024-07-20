import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

//getRoomByDateBetween
app.post("/room/date-between", async (req, res) => {
  // console.log("req", req.body);
  // return;

  let item = req.body.data;
  let room = await getRoomByDateBetween(item);

  res.status(200).json(room);
});

async function getRoomByDateBetween(item) {
  let booking = await prisma.booking.findMany({
    where: {
      start: {
        lte: new Date(item.start),
      },
      end: {
        gte: new Date(item.end),
      },
    },
  });

  return booking;
}
// getAll
app.get("/room", async (req, res) => {
  let room = await prisma.room.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  res.status(200).json(room);
});

//getById
app.get("/room/:id", async (req, res) => {
  const { id } = req.params;
  const room = await prisma.room.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(room);
});

//create
app.post("/room", async (req, res) => {
  // console.log('req', req.body);
  // return

  let item = req.body.data;
  let room = await prisma.room.create({
    data: {
      name: item.name,
      color: item.color,
      quantity: Number(item.quantity),
    },
  });
  res.status(200).json(room);
});

//update
app.put("/room/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let room = await prisma.room.update({
    where: {
      id: Number(id),
    },
    data: {
      name: item.name,
      color: item.color,
      quantity: Number(item.quantity),
    },
  });
  res.status(200).json(room);
});

//delete
app.delete("/room/:id", async (req, res) => {
  let id = req.params.id;
  let room = await prisma.room.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(room);
});

export default {
  path: "/api",
  handler: app,
};
