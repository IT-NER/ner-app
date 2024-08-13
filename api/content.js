import express from "express";
import moment from "moment";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// generate ticket content REYYMMDD001
async function generateTicket(type) {
  let str = "";
  if (type == 1) {
    str = "BN";
  }
  if (type == 2) {
    str = "AC";
  }
  if (type == 3) {
    str = "NE";
  }

  let ticket = "";
  let dateNow = moment().format("YYMMDD");

  let item = await prisma.content.findMany({
    where: {
      contentTypeId: type,
    },
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

// Function to generate OTP
async function generateOTP() {
  // Declare a digits variable
  // which stores all digits
  let digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  let OTP = "";
  let len = digits.length;
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * len)];
  }
  return OTP;
}

async function updateContent(id, item) {
  item.contentStatusId = 1;
  if (item.publish) {
    item.contentStatusId = 2;
  }

  let dateStart = new Date(item.start);
  let dateEnd = new Date(item.end);
  if (!item.timed) {
    dateStart = null;
    dateEnd = null;
  }

  let data = await prisma.content.update({
    where: {
      id: Number(id),
    },
    data: {
      start: dateStart,
      end: dateEnd,
      timed: Boolean(item.timed),
      publish: Boolean(item.publish),
      title: String(item.title),
      description: String(item.description),
      detail: String(item.detail),
      point: Number(item.point),
      contentStatusId: Number(item.contentStatusId),
    },
    include: {
      User: true,
      ContentType: true,
      ContentStatus: true,
      ContentImg: true,
    },
  });

  return data;
}

async function getContentPublish() {
  let data = await prisma.content.findMany({
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
    },
  });

  return data;
}

async function getContentByIds(ids) {
  let data = await prisma.content.findMany({
    where: {
      id: { in: ids },
    },
    include: {
      User: true,
      ContentType: true,
      ContentStatus: true,
      ContentImg: true,
      ContentCoverImg: true,
    },
  });

  return data;
}

// getContent
app.get("/content", async (req, res) => {
  let content = await prisma.content.findMany({
    where: {
      active: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      User: true,
      ContentType: true,
      ContentImg: true,
      ContentCoverImg: true,
    },
  });
  res.status(200).json(content);
});

// getContentPublish
app.get("/content/publish", async (req, res) => {
  let content = await getContentPublish();
  res.status(200).json(content);
});

// getContentByContentByTypeId
app.get("/content/contentType/:id", async (req, res) => {
  let { id } = req.params;

  let contentTimeOut = await updateContentTimeOut(id);
  let content = await getContentByContentByTypeId(id);
  res.status(200).json(content);
});

async function updateContentTimeOut(id) {
  let data = await prisma.content.updateMany({
    where: {
      AND: [
        {
          contentTypeId: Number(id),
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
async function getContentByContentByTypeId(id) {
  let data = await prisma.content.findMany({
    where: {
      AND: [{ contentTypeId: Number(id) }, { active: Boolean(true) }],
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
    },
  });

  return data;
}

// getContentById
app.get("/content/:id", async (req, res) => {
  let { id } = req.params;

  let content = await prisma.content
    .findMany({
      where: {
        AND: [{ id: Number(id) }, { active: true }],
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
      include: {
        User: true,
        ContentType: true,
        ContentImg: true,
        ContentCoverImg: true,
      },
    })
    .then((res) => {
      // console.log("res", res);
      return res[0];
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
  res.status(200).json(content);
});

//getContentByTicket
app.get("/content/ticket/:id", async (req, res) => {
  let { id } = req.params;
  // console.log("id", id);
  // return;

  let data = await prisma.content.findFirst({
    where: {
      ticket: {
        equals: String(id),
      },
    },
    include: {
      User: true,
      ContentType: true,
      ContentStatus: true,
      ContentImg: true,
      ContentCoverImg: true,
    },
  });

  res.status(200).json(data);
});

// getContentByIds
app.post("/content/ids", async (req, res) => {
  let ids = req.body.data;

  let content = await getContentByIds(ids);
  res.status(200).json(content);
});

// createContent
app.post("/content", async (req, res) => {
  // console.log("req", req.body.data);

  let item = req.body.data;
  let ticket = await generateTicket(item.contentTypeId);
  let code = await generateOTP();

  let content = await prisma.content.create({
    data: {
      ticket: String(ticket),
      start: new Date(item.start),
      end: new Date(item.end),
      code: String(code),
      userId: Number(item.userId),
      contentTypeId: Number(item.contentTypeId),
      contentStatusId: Number(item.contentStatusId),
    },
    include: {
      User: true,
      ContentType: true,
      ContentImg: true,
    },
  });
  res.status(200).json(content);
});

// updateContent
app.put("/content/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;

  let content = await updateContent(id, item);
  res.status(200).json(content);
});

// getConyentPublishBanners
app.get("/content/banner/publish", async (req, res) => {
  let data = await getConyentPublishBanners();
  res.status(200).json(data);
});

async function getConyentPublishBanners() {
  let data = await prisma.content.findMany({
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
              timed: Boolean(true),
              publish: Boolean(true),
              contentTypeId: Number(1),
            },
          ],
        },
        {
          AND: [
            {
              timed: Boolean(false),
              publish: Boolean(true),
              contentTypeId: Number(1),
            },
          ],
        },
      ],
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
    },
  });

  return data;
}

export default {
  path: "/api",
  handler: app,
};
