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

  let item = await prisma.content.findMany({
    orderBy: [
      {
        ticket: "desc",
      },
    ],
  });

  if (item.length > 0) {
    let lastCode = String(item[0].ticket).substring(2, 8);

    if (lastCode == dateNow) {
      let num = Number(item[0].ticket.substring(2)) + Number(1);
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
app.post("/content", async (req, res) => {
  let item = req.body.data;
  let ticket = await generateTicket();

  // console.log("item", item);

  let content = await prisma.content.create({
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
        },
      },
    },
  });
  res.status(200).json(content);
});

// update
app.put("/content/:id", async (req, res) => {
  let { id } = req.params;
  let item = req.body.data;
  let contentStatusId = 2;

  if (item.content) {
    contentStatusId = 3;
  }

  // updateContentStatus Old
  if (item.contentIdBefore) {
    let contentOld = await prisma.content.update({
      where: {
        id: Number(item.contentIdBefore),
      },
      data: {
        contentStatusId: 1,
      },
    });
  }

  // updateContentStatus
  let content = await prisma.content.update({
    where: {
      id: Number(item.contentId),
    },
    data: {
      contentStatusId: Number(contentStatusId),
    },
  });

  // updateContent
  let content = await prisma.content.update({
    where: {
      id: Number(id),
    },
    data: {
      start: new Date(item.start),
      end: new Date(item.end),
      timed: Boolean(item.timed),
      remark: String(item.remark),
      content: Boolean(item.content),
      contentId: Number(item.contentId),
    },
    include: {
      User: true,
      Content: {
        include: {
          ContentImg: true,
          ContentType: true,
        },
      },
    },
  });
  res.status(200).json(content);
});

// getAll
app.get("/content", async (req, res) => {
  let content = await prisma.content.findMany({
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
  res.status(200).json(content);
});

//getContentByTicket
app.get("/content/ticket/:id", async (req, res) => {
  let { id } = req.params;
  let content = await prisma.content.findUnique({
    where: {
      ticket: String(id),
    },
    include: {
      User: true,
      Content: {
        include: {
          ContentImg: true,
          ContentType: true,
        },
      },
    },
  });
  res.status(200).json(content);
});

// getContentContentBanner
app.get("/content/content/banner", async (req, res) => {
  let content = await prisma.content.findMany({
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
              content: true,
            },
          ],
        },
        {
          AND: [
            {
              timed: false,
              content: true,
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

  res.status(200).json(content);
});

// getContentContentActivity
app.get("/content/content/activity", async (req, res) => {
  let content = await prisma.content.findMany({
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
              content: true,
            },
          ],
        },
        {
          AND: [
            {
              timed: false,
              content: true,
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

  res.status(200).json(content);
});

// getContentContentNews
app.get("/content/content/news", async (req, res) => {
  let content = await prisma.content.findMany({
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
              content: true,
            },
          ],
        },
        {
          AND: [
            {
              timed: false,
              content: true,
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

  res.status(200).json(content);
});

export default {
  path: "/api",
  handler: app,
};
