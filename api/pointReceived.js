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
app.post("/pointReceived/checkReceived", async (req, res) => {
  // console.log("req", req.body.data);
  // return;

  let items = req.body.data;
  // let data = items.forEach(async (item) => {
  let data = await checkUserReceived(items[0]);
  // });

  res.status(200).json(data);
});

// checkUserReceived
async function checkUserReceived(item) {
  let data = await prisma.pointReceived.findMany({
    where: {
      AND: [
        { userId: Number(item.userId) },
        { publishId: Number(item.publishId) },
      ],
    },
    include: {
      User: true,
      Publish: {
        include: {
          Content: {
            include: {
              ContentType: true,
              ContentImg: true,
              PublishStatus: true,
            },
          },
        },
      },
    },
  });

  return data;
}

// createPointReceived
app.post("/pointReceived", async (req, res) => {
  // console.log("req", req.body.data);
  // return;

  let items = req.body.data;
  let data = await items.forEach(async (item) => {
    // console.log("item", item);
    let pointReceived = await createPointReceived(item);
    // console.log("pointReceived", pointReceived);
    let pointReceivedPay = await createPointReceivedPay(pointReceived);
    // console.log("pointReceivedPay", pointReceivedPay);
    let sumReceived = await sumPointReceived(item.userId);
    // console.log("sumReceived", sumReceived);
    let sumPay = await sumPointPay(item.userId);
    // console.log("sumPay", sumPay);
    let total = Number(sumReceived) - Number(sumPay);
    // console.log("total", total);
    let updatePointToatal = await updatePointTotal(pointReceivedPay, total);
    // console.log("updatePointToatal", updatePointToatal);
    let pointUser = await updatePointUser(item.userId, total);
    // console.log("pointUser", pointUser);
  });

  res.status(200).json(data);
});

async function createPointReceived(item) {
  let data = await prisma.pointReceived.create({
    data: {
      point: Number(item.point),
      userId: Number(item.userId),
      publishId: Number(item.publishId),
    },
    include: {
      User: true,
      Publish: {
        include: {
          Content: {
            include: {
              ContentType: true,
              ContentImg: true,
              PublishStatus: true,
            },
          },
        },
      },
    },
  });

  return data;
}

async function createPointReceivedPay(item) {
  let data = await prisma.pointReceivedPay.create({
    data: {
      pointReceivedId: Number(item.id),
      received: Number(item.point),
      userId: Number(item.userId),
    },
  });
  return data;
}

async function sumPointReceived(userId) {
  let sum = 0;

  let sumReceived = await prisma.pointReceivedPay.findMany({
    where: {
      userId: Number(userId),
    },
  });

  sumReceived.forEach((e) => {
    sum += Number(e.received);
  });

  return sum;
}

async function sumPointPay(userId) {
  let sum = 0;

  let sumReceived = await prisma.pointReceivedPay.findMany({
    where: {
      userId: Number(userId),
    },
  });

  sumReceived.forEach((e) => {
    sum += Number(e.pay);
  });

  return sum;
}

async function updatePointTotal(pointReceivedPay, total) {
  let item = await prisma.pointReceivedPay.update({
    where: {
      id: Number(pointReceivedPay.id),
    },
    data: {
      total: Number(total),
    },
  });
  return item;
}

async function updatePointUser(userId, total) {
  let data = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      point: Number(total),
    },
  });

  return data;
}

export default {
  path: "/api",
  handler: app,
};
