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

// createPointReceived
app.post("/pointReceived/check", async (req, res) => {
  // console.log("req", req.body.data);

  let item = req.body.data;

  let pointReceived = await prisma.pointReceived.findMany({
    where: {
      userId: Number(item.userId),
      contentPublicId: Number(item.contentPublicId),
    },
    include: {
      User: true,
      ContentPublic: {
        include: {
          Content: {
            include: {
              ContentType: true,
              ContentImg: true,
              ContentStatus: true,
            },
          },
        },
      },
    },
  });
  res.status(200).json(pointReceived);
});

// createPointReceived
app.post("/pointReceived", async (req, res) => {
  // console.log("req", req.body.data);

  let item = req.body.data;

  let pointReceived = await prisma.pointReceived.create({
    data: {
      point: Number(item.point),
      userId: Number(item.userId),
      contentPublicId: Number(item.contentPublicId),
    },
    include: {
      User: true,
      ContentPublic: {
        include: {
          Content: {
            include: {
              ContentType: true,
              ContentImg: true,
              ContentStatus: true,
            },
          },
        },
      },
    },
  });
  res.status(200).json(pointReceived);
});

export default {
  path: "/api",
  handler: app,
};
