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
  if (type == 2) {
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
      author: true,
      ContentType: true,
      ContentImg: true,
      ContentStatus: true,
    },
  });
  res.status(200).json(content);
});

// getContentByContentByTicket
app.post("/content/ticket", async (req, res) => {
  let item = req.body.data;

  let content = await prisma.content
    .findMany({
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
        author: true,
        ContentType: true,
        ContentImg: true,
        ContentStatus: true,
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

// createContent
app.post("/content", async (req, res) => {
  console.log("req", req.body.data);

  let item = req.body.data;
  let ticket = await generateTicket(item.contentTypeId);
  let code = await generateOTP();

  let content = await prisma.content.create({
    data: {
      ticket: String(ticket),
      code: String(code),
      userId: Number(item.userId),
      contentTypeId: Number(item.contentTypeId),
      contentStatusId: Number(item.contentStatusId),
      active: Boolean(item.active),
    },
    include: {
      author: true,
      ContentType: true,
      ContentImg: true,
      ContentStatus: true,
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
    },
    include: {
      author: true,
      ContentType: true,
      ContentImg: true,
      ContentStatus: true,
    },
  });
  res.status(200).json(content);
});

export default {
  path: "/api",
  handler: app,
};
