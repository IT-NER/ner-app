import express from "express";
import moment from "moment";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// checkReceivePoint
app.post("/point/checkReceivePoint", async (req, res) => {
  // console.log("req", req.body.data);
  // return;

  let item = req.body.data;
  let data = await checkReceivePoint(item);

  res.status(200).json(data);
});
async function checkReceivePoint(item) {
  let data = await prisma.pointReceived.count({
    where: {
      AND: [
        {
          contentId: Number(item.contentId),
          userId: Number(item.userId),
        },
      ],
    },
  });
  return data;
}

// addPointUser
app.post("/point/addPointUser", async (req, res) => {
  let item = req.body.data;

  let timed = await checkTimedContent(item.contentId);
  if (timed == 0) {
    res.status(401).json({ massage: "Time's up." });
  }

  let checkUser = await checkUserReceived(item);
  if (checkUser > 0) {
    res.status(401).json({ massage: "I've received it before." });
  }

  let data = await addPointUser(item);
  res.status(200).json(data);
});

async function addPointUser(item) {
  let pointReceived = await createPointReceived(item);
  let pointReceivedPay = await createPointReceivedPay(pointReceived);
  let pointTotal = await updatePointTotal(pointReceivedPay);
  let pointUser = await updatePointUser(item, pointTotal);
  return true;
}

async function updatePointUser(item, pointTotal) {
  let data = await prisma.user.update({
    where: {
      id: Number(item.userId),
    },
    data: {
      point: Number(pointTotal),
    },
  });
  return data;
}
async function updatePointTotal(item) {
  let data = await prisma.pointReceivedPay.findMany({
    where: {
      userId: item.userId,
    },
  });

  let sumReceived = 0;
  let sumPay = 0;

  data.forEach((e) => {
    sumReceived += Number(e.received);
    sumPay += Number(e.pay);
  });

  let total = sumReceived - sumPay;

  let updateTotal = await prisma.pointReceivedPay.update({
    where: {
      id: Number(item.id),
    },
    data: {
      total: Number(total),
    },
  });

  return total;
}
async function createPointReceivedPay(item) {
  let data = await prisma.pointReceivedPay.create({
    data: {
      pointReceivedId: Number(item.id),
      userId: Number(item.userId),
      received: Number(item.point),
      pay: Number(0),
    },
  });
  return data;
}
async function createPointReceived(item) {
  let data = await prisma.pointReceived.create({
    data: {
      point: item.point,
      contentId: item.contentId,
      userId: item.userId,
    },
  });
  return data;
}
async function checkUserReceived(item) {
  let data = await prisma.pointReceived.count({
    where: {
      contentId: item.contentId,
      userId: item.userId,
    },
  });
  return data;
}
async function checkTimedContent(id) {
  let data = await prisma.content.count({
    where: {
      AND: [
        {
          id: Number(id),
          contentStatusId: Number(2),
        },
      ],
    },
  });
  // console.log("data", data);
  return data;
}

export default {
  path: "/api",
  handler: app,
};
