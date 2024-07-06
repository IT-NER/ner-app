import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

//create
app.post("/public", async (req, res) => {
  // console.log("req", req.body);

  let start = null;
  let end = null;

  let item = req.body.data;
  if (!item.timed) {
    start = null;
    end = null;
  }

  start = new Date(item.start);
  end = new Date(item.end);

  let itemPublic = await prisma.public.create({
    data: {
      start: start,
      end: end,
      timed: Boolean(item.timed),
      name: String(item.name),
      active: Boolean(item.active),
      publish: Boolean(item.publish),
      contentId: Number(item.contentId),
    },
  });
  res.status(200).json(itemPublic);
});

//update
app.put("/public/:id", async (req, res) => {
  let { id } = req.params;

  let start = null;
  let end = null;

  let item = req.body.data;
  if (!item.timed) {
    start = null;
    end = null;
  }

  start = new Date(item.start);
  end = new Date(item.end);

  let itemPublic = await prisma.public.update({
    where: {
      id: Number(id),
    },
    data: {
      start: start,
      end: end,
      timed: Boolean(item.timed),
      name: String(item.name),
      active: Boolean(item.active),
      publish: Boolean(item.publish),
      contentId: Number(item.contentId),
    },
  });
  res.status(200).json(itemPublic);
});

// getAll
app.get("/public", async (req, res) => {
  let itemPublic = await prisma.public.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  res.status(200).json(itemPublic);
});

//getPublicByContentTypeId
app.get("/public/content-type/:id", async (req, res) => {
  const { id } = req.params;
  const itemPublic = await prisma.public.findMany({
    where: {
      AND: [
        {
          Content: {
            ContentType: {
              id: Number(id),
            },
          },
        },
        { active: true },
      ],
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      Content: {
        include: {
          ContentType: true,
        },
      },
    },
  });
  res.status(200).json(itemPublic);
});

//update
app.put("/public/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let itemPublic = await prisma.public.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: item.name,
      color: item.color,
      quantity: parseInt(item.quantity),
    },
  });
  res.status(200).json(itemPublic);
});

export default {
  path: "/api",
  handler: app,
};
