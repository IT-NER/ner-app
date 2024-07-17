import express from "express";
import moment from "moment";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// generateTicket
async function generateTicket() {
  let str = "PB";
  let ticket = "";
  let dateNow = moment().format("YYMMDD");

  let item = await prisma.publish.findMany({
    orderBy: [
      {
        ticket: "desc",
      },
    ],
  });

  if (item.length > 0) {
    let lastCode = String(item[0].ticket).substring(2, 8);

    if (lastCode == dateNow) {
      let num = parseInt(item[0].ticket.substring(2)) + parseInt(1);
      ticket = String(str + num);
    } else {
      ticket = String(str + dateNow + "001");
    }
  } else {
    ticket = String(str + dateNow + "001");
  }

  return ticket;
}

// create
app.post("/publish", async (req, res) => {
  let item = req.body.data;
  let ticket = await generateTicket();

  // console.log("item", item);

  let publish = await prisma.publish.create({
    data: {
      ticket: String(ticket),
      userId: Number(item.userId),
    },
    include: {
      User: true,
      Content: {
        include: {
          ContentImg: true,
          ContentType: true,
          PublishStatus: true,
        },
      },
    },
  });
  res.status(200).json(publish);
});

// update
app.put("/publish/:id", async (req, res) => {
  let { id } = req.params;
  let item = req.body.data;
  let publishStatusId = 2;

  if (item.publish) {
    publishStatusId = 3;
  }

  // updatePublishStatus Old
  if (item.contentIdBefore) {
    let contentOld = await prisma.content.update({
      where: {
        id: Number(item.contentIdBefore),
      },
      data: {
        publishStatusId: 1,
      },
    });
  }

  // updatePublishStatus
  let content = await prisma.content.update({
    where: {
      id: Number(item.contentId),
    },
    data: {
      publishStatusId: Number(publishStatusId),
    },
  });

  // updatePublish
  let publish = await prisma.publish.update({
    where: {
      id: Number(id),
    },
    data: {
      start: new Date(item.start),
      end: new Date(item.end),
      timed: Boolean(item.timed),
      remark: String(item.remark),
      publish: Boolean(item.publish),
      contentId: Number(item.contentId),
    },
    include: {
      User: true,
      Content: {
        include: {
          ContentImg: true,
          ContentType: true,
          PublishStatus: true,
        },
      },
    },
  });
  res.status(200).json(publish);
});

// getAll
app.get("/publish", async (req, res) => {
  let publish = await prisma.publish.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      User: true,
      Content: {
        include: {
          User: true,
          ContentImg: true,
          ContentType: true,
        },
      },
    },
  });
  res.status(200).json(publish);
});

//getPublishByTicket
app.get("/publish/ticket/:id", async (req, res) => {
  let { id } = req.params;
  let publish = await prisma.publish.findUnique({
    where: {
      ticket: String(id),
    },
    include: {
      User: true,
      Content: {
        include: {
          ContentImg: true,
          ContentType: true,
          PublishStatus: true,
        },
      },
    },
  });
  res.status(200).json(publish);
});

// getPublishContentBanner
app.get("/publish/content/banner", async (req, res) => {
  let publish = await prisma.publish.findMany({
    where: {
      OR: [
        {
          AND: [
            {
              start: {
                lte: new Date(),
              },
              end: {
                gte: new Date(),
              },
              timed: true,
              publish: true,
            },
          ],
        },
        {
          AND: [
            {
              timed: false,
              publish: true,
            },
          ],
        },
      ],

      Content: {
        ContentType: {
          id: 1,
        },
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      User: true,
      Content: {
        include: {
          User: true,
          ContentImg: true,
          ContentType: true,
        },
      },
    },
  });

  res.status(200).json(publish);
});

// getPublishContentActivity
app.get("/publish/content/activity", async (req, res) => {
  let publish = await prisma.publish.findMany({
    where: {
      OR: [
        {
          AND: [
            {
              start: {
                lte: new Date(),
              },
              end: {
                gte: new Date(),
              },
              timed: true,
              publish: true,
            },
          ],
        },
        {
          AND: [
            {
              timed: false,
              publish: true,
            },
          ],
        },
      ],

      Content: {
        ContentType: {
          id: 2,
        },
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      User: true,
      Content: {
        include: {
          User: true,
          ContentImg: true,
          ContentType: true,
        },
      },
    },
  });

  res.status(200).json(publish);
});

// getPublishContentNews
app.get("/publish/content/news", async (req, res) => {
  let publish = await prisma.publish.findMany({
    where: {
      OR: [
        {
          AND: [
            {
              start: {
                lte: new Date(),
              },
              end: {
                gte: new Date(),
              },
              timed: true,
              publish: true,
            },
          ],
        },
        {
          AND: [
            {
              timed: false,
              publish: true,
            },
          ],
        },
      ],

      Content: {
        ContentType: {
          id: 3,
        },
      },
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      User: true,
      Content: {
        include: {
          User: true,
          ContentImg: true,
          ContentType: true,
        },
      },
    },
  });

  res.status(200).json(publish);
});

export default {
  path: "/api",
  handler: app,
};
