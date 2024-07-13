import express from "express";
import moment, { utc } from "moment";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// generateTicket
async function generateTicket() {
  let str = "PB";
  let ticket = "";
  let dateNow = moment().format("YYMMDD");

  let item = await prisma.contentPublic.findMany({
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
app.post("/contentPublic", async (req, res) => {
  let item = req.body.data;
  let ticket = await generateTicket();

  // console.log("item", item);

  let contentPublic = await prisma.contentPublic.create({
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
          ContentStatus: true,
        },
      },
    },
  });
  res.status(200).json(contentPublic);
});

// update
app.put("/contentPublic/:id", async (req, res) => {
  let { id } = req.params;
  let item = req.body.data;
  let contentStatusId = 2;

  if (item.public) {
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

  // updateContentPublic
  let contentPublic = await prisma.contentPublic.update({
    where: {
      id: Number(id),
    },
    data: {
      start: new Date(item.start),
      end: new Date(item.end),
      timed: Boolean(item.timed),
      remark: String(item.remark),
      public: Boolean(item.public),
      contentId: Number(item.contentId),
    },
    include: {
      User: true,
      Content: {
        include: {
          ContentImg: true,
          ContentType: true,
          ContentStatus: true,
        },
      },
    },
  });
  res.status(200).json(contentPublic);
});

// getAll
app.get("/contentPublic", async (req, res) => {
  let contentPublic = await prisma.contentPublic.findMany({
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
          ContentStatus: true,
        },
      },
    },
  });
  res.status(200).json(contentPublic);
});

//getContentPublicByTicket
app.get("/contentPublic/ticket/:id", async (req, res) => {
  let { id } = req.params;
  let contentPublic = await prisma.contentPublic.findUnique({
    where: {
      ticket: String(id),
    },
    include: {
      User: true,
      Content: {
        include: {
          ContentImg: true,
          ContentType: true,
          ContentStatus: true,
        },
      },
    },
  });
  res.status(200).json(contentPublic);
});

// getContentPublicContentBanner
app.get("/contentPublic/content/banner", async (req, res) => {
  let contentPublic = await prisma.contentPublic.findMany({
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
              public: true,
            },
          ],
        },
        {
          AND: [
            {
              timed: false,
              public: true,
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
          ContentStatus: true,
        },
      },
    },
  });

  res.status(200).json(contentPublic);
});

// getContentPublicContentActivity
app.get("/contentPublic/content/activity", async (req, res) => {
  let contentPublic = await prisma.contentPublic.findMany({
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
              public: true,
            },
          ],
        },
        {
          AND: [
            {
              timed: false,
              public: true,
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
          ContentStatus: true,
        },
      },
    },
  });

  res.status(200).json(contentPublic);
});

export default {
  path: "/api",
  handler: app,
};
