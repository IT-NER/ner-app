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
      PublishStatus: true,
    },
  });
  res.status(200).json(content);
});

// getContentByContentByTypeId
app.get("/content/content-type/:id", async (req, res) => {
  let { id } = req.params;

  let content = await prisma.content.findMany({
    where: {
      AND: [{ contentTypeId: Number(id) }, { active: true }],
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
      PublishStatus: true,
    },
  });
  res.status(200).json(content);
});

// getContentBystatusId
app.get("/content/status/:id", async (req, res) => {
  let { id } = req.params;

  let content = await prisma.content.findMany({
    where: {
      AND: [{ publishStatusId: Number(id) }, { active: true }],
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
      PublishStatus: true,
    },
  });

  res.status(200).json(content);
});

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
        PublishStatus: true,
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

  let content = await prisma.content
    .findFirst({
      where: {
        ticket: String(id),
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
        PublishStatus: true,
        Publish: true,
      },
    })
    .then((res) => {
      // console.log("res", res);
      return res;
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
  res.status(200).json(content);
});

// getContentByContentByTicket
app.post("/content/ticket", async (req, res) => {
  let item = req.body.data;

  let content = await prisma.content.findMany({
    where: {
      AND: [
        { ticket: String(item.ticket) },
        { contentTypeId: Number(item.contentTypeId) },
        { active: true },
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
      ContentImg: true,
      PublishStatus: true,
    },
  });
  res.status(200).json(content[0]);
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
      code: String(code),
      userId: Number(item.userId),
      contentTypeId: Number(item.contentTypeId),
      publishStatusId: Number(item.publishStatusId),
      active: Boolean(item.active),
    },
    include: {
      User: true,
      ContentType: true,
      ContentImg: true,
      PublishStatus: true,
    },
  });
  res.status(200).json(content);
});

// updateContent
app.put("/content/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let content = await prisma.content.update({
    where: {
      id: parseInt(id),
    },
    data: {
      title: String(item.title),
      description: String(item.description),
      detail: String(item.detail),
      point: Number(item.point),
      publishStatusId: Number(item.publishStatusId),
    },
    include: {
      User: true,
      ContentType: true,
      ContentImg: true,
      PublishStatus: true,
    },
  });
  res.status(200).json(content);
});

// getContentByIds
app.post("/content/ids", async (req, res) => {
  let ids = req.body.data;

  let content = await prisma.content.findMany({
    where: {
      id: { in: ids },
    },

    include: {
      User: true,
      ContentType: true,
      ContentImg: true,
      PublishStatus: true,
      Publish: true,
    },
  });
  res.status(200).json(content);
});

export default {
  path: "/api",
  handler: app,
};
