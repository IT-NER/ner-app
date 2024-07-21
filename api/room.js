import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

//getItemsRoomNotReserved
app.post("/room/notReserved", async (req, res) => {
  let item = req.body.data;
  let roomNotReserved = await getItemsRoomNotReserved(item);

  res.status(200).json(roomNotReserved);
});

async function getItemsRoomNotReserved(item) {
  let data = await prisma.room.findMany({
    where: {
      id: {
        notIn: item,
      },
    },
    include: {
      Booking: true,
    },
  });
  return data;
}

//getRoomByDateBetween
app.post("/room/date-between", async (req, res) => {
  // console.log("req", req.body);
  // console.log("start", new Date(req.body.data.start));
  // return;

  let item = req.body.data;
  let room = await getRoomByDateBetween(item);

  res.status(200).json(room);
});

async function getRoomByDateBetween(item) {
  let notReservedIds = [];

  let booking = await prisma.booking.findMany({
    where: {
      AND: [
        {
          start: {
            gte: new Date(item.start),
          },
          end: {
            lte: new Date(item.end),
          },
        },
      ],
    },
  });

  booking.forEach((e) => {
    notReservedIds.push(e.roomId);
  });

  let result = [...new Set(notReservedIds)];

  let room = await prisma.room.findMany({
    where: {
      id: {
        notIn: result,
      },
    },
  });

  return room;
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
