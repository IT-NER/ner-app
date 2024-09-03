import express from "express";
import moment from "moment";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// received
app.post("/point/received", async (req, res) => {
  let item = req.body.data;
  let content = await prisma.content.findFirst({
    where: {
      id: Number(item.contentId),
    },
  });

  item.userIds.forEach(async (e) => {
    await received(item.contentId, e, content.point);
  });

  let data = await prisma.content.findFirst({
    where: {
      id: Number(item.contentId),
    },
  });

  res.status(200).json(data);
});
async function received(contentId, userId, point) {
  // // console.log("contentId", contentId);
  // // console.log("userId", userId);
  // // console.log("point", point);

  let count = await checkReceived(contentId, userId);
  if (count > 0) {
    return;
  }

  let pointReceived = await createPointReceived(contentId, userId, point);
  let pointReceivedPay = await createPointReceivedPay(pointReceived);
  return pointReceived;
}
async function getContentById(contentId) {
  let data = await prisma.content.findFirst({
    where: {
      id: Number(contentId),
    },
  });
  return data;
}
async function createPointReceivedPay(pointReceived) {
  let pointReceivedPay = await prisma.pointReceivedPay.create({
    data: {
      pointReceivedId: Number(pointReceived.id),
      userId: Number(pointReceived.userId),
      received: Number(pointReceived.point),
    },
  });

  let pointReceivedPayByUserId = await prisma.pointReceivedPay.findMany({
    where: {
      userId: Number(pointReceivedPay.userId),
    },
  });

  let sumReceived = 0;
  let sumPay = 0;
  pointReceivedPayByUserId.forEach((e) => {
    sumReceived += e.received;
    sumPay += e.pay;
  });
  let total = sumReceived - sumPay;

  let updatePointTotal = await prisma.pointReceivedPay.update({
    where: {
      id: Number(pointReceivedPay.id),
    },
    data: {
      total: Number(total),
    },
  });

  let updatePointUser = await prisma.user.update({
    where: {
      id: Number(pointReceivedPay.userId),
    },
    data: {
      point: Number(total),
    },
  });

  let data = await prisma.pointReceivedPay.findFirst({
    where: {
      id: Number(pointReceivedPay.id),
    },
  });
  return data;
}
async function createPointReceived(contentId, userId, point) {
  let data = await prisma.pointReceived.create({
    data: {
      contentId: Number(contentId),
      userId: Number(userId),
      point: Number(point),
    },
  });
  return data;
}
async function checkReceived(contentId, userId) {
  let data = await prisma.pointReceived.count({
    where: {
      AND: [
        {
          contentId: Number(contentId),
          userId: Number(userId),
        },
      ],
    },
  });
  return data;
}

export default {
  path: "/api/admin",
  handler: app,
};
