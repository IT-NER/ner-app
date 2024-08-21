import express from "express";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

let prisma = new PrismaClient();
let app = express();

app.use(express.json());

// pay
app.post("/point-pay", async (req, res) => {
  let item = req.body.data;
  let data = await pay(item);
  res.status(200).json(item);
});

async function pay(item) {
  let pointPay = await prisma.pointPay.create({
    data: {
      point: Number(item.point),
      userId: Number(item.userId),
      rewardId: Number(item.rewardId),
      pointPayStatusId: Number(item.pointPayStatusId),
    },
  });

  let pointReceivedPay = await prisma.pointReceivedPay.create({
    data: {
      pointPayId: Number(pointPay.id),
      userId: Number(item.userId),
      pay: Number(item.point),
    },
  });

  let point = await prisma.pointReceivedPay.findMany({
    where: {
      userId: Number(item.userId),
    },
  });

  let sumReceived = 0;
  let sumPay = 0;
  point.forEach((e) => {
    sumReceived += e.received;
    sumPay += e.pay;
  });
  let pointTotal = sumReceived - sumPay;

  let updatePointReceivedPay = await prisma.pointReceivedPay.update({
    where: {
      id: Number(pointReceivedPay.id),
    },
    data: {
      total: Number(pointTotal),
    },
  });

  let updateUser = await prisma.user.update({
    where: {
      id: Number(item.userId),
    },
    data: {
      point: Number(pointTotal),
    },
  });

  let data = await prisma.reward.findFirst({
    where: {
      id: Number(item.rewardId),
    },
    include: {
      RewardImg: true,
      User: {
        include: {
          PointPay: true,
          Position: true,
          Department: true,
          Role: true,
        },
      },
    },
  });

  return data;
}

export default {
  path: "/api",
  handler: app,
};
