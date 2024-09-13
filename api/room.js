import express, { response } from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

//getItemsRoomDisable
app.post("/room/disable", async (req, res) => {
  let item = req.body.data;
  let room = await getItemsRoomDisable(item);
  res.status(200).json(room);
});
async function getItemsRoomDisable(item) {
  let booking = await prisma.booking.findMany({
    where: {
      // AND: [
      //   {
      OR: [
        {
          start: {
            gte: new Date(item.start),
          },
          end: {
            gte: new Date(item.start),
            lte: new Date(item.end),
          },
        },
        {
          end: {
            gte: new Date(item.start),
          },
          start: {
            lte: new Date(item.end),
          },
        },
        {
          start: {
            lte: new Date(item.start),
          },
          end: {
            gte: new Date(item.end),
          },
        },
      ],

      statusId: {
        in: [2],
      },
      //   },
      // ],
    },
    // where: {
    //   OR: [
    //     {
    //       AND: [
    //         {
    //           start: {
    //             gte: new Date(item.start),
    //             lte: new Date(item.end),
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       AND: [
    //         {
    //           end: {
    //             lte: new Date(item.start),
    //             gte: new Date(item.end),
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       AND: [
    //         {
    //           start: {
    //             gt: new Date(item.start),
    //           },
    //           end: {
    //             lt: new Date(item.end),
    //           },
    //         },
    //       ],
    //     },
    //   ],

    //   // orderBy: [
    //   //   {
    //   //     roomId: "asc",
    //   //   },
    //   // ],
    // },

    include: {
      MeetingType: true,
      Program: true,
      Room: true,
      Status: true,
      User: true,
      BookingDevice: true,
      BookingDrink: true,
      BookingFood: true,
    },
  });

  let ids = [];
  booking.forEach((e) => {
    ids.push(e.roomId);
  });

  let roomIds = [...new Set(ids)];

  let room = await prisma.room.findMany({
    where: {
      id: {
        in: roomIds,
      },
    },

    include: {
      Booking: {
        where: {
          AND: [
            {
              start: {
                gte: new Date(item.start),
              },
              end: {
                lte: new Date(item.end),
              },
              statusId: {
                lt: 3,
              },
            },
          ],
        },
        orderBy: [
          {
            start: "asc",
          },
        ],
        include: {
          User: true,
        },
      },
    },
  });

  return room;
}

//getItemsRoomEnable
app.post("/room/enable", async (req, res) => {
  let item = req.body.data;
  let room = await getItemsRoomEnable(item);
  res.status(200).json(room);
});
async function getItemsRoomEnable(item) {
  let booking = await prisma.booking.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              start: {
                gte: new Date(item.start),
              },
              end: {
                gte: new Date(item.start),
                lte: new Date(item.end),
              },
            },
            {
              end: {
                gte: new Date(item.start),
              },
              start: {
                lte: new Date(item.end),
              },
            },
            {
              start: {
                lte: new Date(item.start),
              },
              end: {
                gte: new Date(item.end),
              },
            },
          ],

          statusId: {
            in: [1, 2],
          },
        },
      ],
    },

    orderBy: [
      {
        roomId: "asc",
      },
    ],

    include: {
      Room: true,
      Status: true,
    },
  });

  let roomDisableIds = [];
  booking.forEach((e) => {
    roomDisableIds.push(e.Room.id);
  });
  let roomIds = [...new Set(roomDisableIds)];
  console.log("roomIds", roomIds);

  let room = await prisma.room.findMany({
    where: {
      id: {
        notIn: roomIds,
      },
    },
  });

  if (item.id > 0) {
    let items = await formatItemsRoom(room, item);
    return items;
  }

  return room;
}
async function formatItemsRoom(room, item) {
  room.push(item.Room);
  room.sort((a, b) => {
    return a.id - b.id;
  });
  return room;
}

// find
app.get("/room", async (req, res) => {
  let data = await find();
  res.status(200).json(data);
});
async function find() {
  let data = await prisma.room.findMany({
    orderBy: [
      {
        id: "asc",
      },
    ],
  });
  return data;
}

//findOne
app.get("/room/:id", async (req, res) => {
  const { id } = req.params;
  let room = await findOnd(id);
  res.status(200).json(room);
});
async function findOnd(id) {
  const data = await prisma.room.findUnique({
    where: {
      id: Number(id),
    },
  });
  return data;
}

//create
app.post("/room", async (req, res) => {
  // // console.log('req', req.body);
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
