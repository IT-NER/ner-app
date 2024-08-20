import express from "express";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();
let app = express();
app.use(express.json());

// updateContentTimeOut
app.get("/content/update/timeout", async (req, res) => {
  let data = await updateContentTimeOut();
  res.status(200).json(data);
});
async function updateContentTimeOut() {
  let data = await prisma.content.updateMany({
    where: {
      AND: [
        {
          active: Boolean(true),
          end: {
            lte: new Date(),
          },
          timed: Boolean(true),
        },
      ],
    },
    data: {
      contentStatusId: Number(3),
      publish: Boolean(false),
    },
  });
  return data;
}

// findOne
app.get("/content/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findOne(id);
  res.status(200).json(data);
});
async function findOne(id) {
  let data = await prisma.content.findFirst({
    where: {
      id: Number(id),
      contentStatusId: Number(2),
    },
    include: {
      ContentStatus: true,
      ContentType: true,
      User: true,
      ContentCoverImg: true,
      ContentImg: true,
      PointReceived: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  return data;
}

// getBannerPublish
app.get("/content/publish/banner", async (req, res) => {
  let data = await getBannerPublish();
  res.status(200).json(data);
});
async function getBannerPublish() {
  let data = await prisma.content.findMany({
    where: {
      publish: Boolean(true),
      contentTypeId: Number(1),
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      User: true,
      ContentType: true,
      ContentStatus: true,
      ContentImg: true,
      ContentCoverImg: true,
      PointReceived: true,
    },
  });
  return data;
}

// getActivityPublish
app.get("/content/publish/activity", async (req, res) => {
  let data = await getActivityPublish();
  res.status(200).json(data);
});
async function getActivityPublish() {
  let data = await prisma.content.findMany({
    where: {
      publish: Boolean(true),
      contentTypeId: Number(2),
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      User: true,
      ContentType: true,
      ContentStatus: true,
      ContentImg: true,
      ContentCoverImg: true,
      PointReceived: true,
    },
  });
  return data;
}

// getNewsPublish
app.get("/content/publish/news", async (req, res) => {
  let data = await getNewsPublish();
  res.status(200).json(data);
});
async function getNewsPublish() {
  let data = await prisma.content.findMany({
    where: {
      publish: Boolean(true),
      contentTypeId: Number(3),
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      User: true,
      ContentType: true,
      ContentStatus: true,
      ContentImg: true,
      ContentCoverImg: true,
      PointReceived: true,
    },
  });
  return data;
}

export default {
  path: "/api",
  handler: app,
};
