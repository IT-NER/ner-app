import express from "express";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

let prisma = new PrismaClient();
let app = express();

app.use(express.json());

// findByRewardIdUserId
app.post("/point-pay-reward-user", async (req, res) => {
  let item = req.body.data;
  let data = await findByRewardIdUserId(item);
  res.status(200).json(data);
});
async function findByRewardIdUserId(item) {
  let data = await prisma.pointPay.findMany({
    where: {
      AND: [
        {
          rewardId: Number(item.rewardId),
          userId: Number(item.userId),
        },
      ],
    },
    include: {
      Reward: {
        include: {
          RewardImg: true,
        },
      },
      PointPayStatus: true,
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

// pay
app.post("/point-pay", async (req, res) => {
  let item = req.body.data;
  let data = await pay(item);
  res.status(200).json(data);
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

// findByUserId
app.get("/point-pay/user/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findByUserId(id);
  res.status(200).json(data);
});
async function findByUserId(id) {
  let data = await prisma.pointPay.findMany({
    where: {
      userId: Number(id),
    },
    include: {
      User: {
        include: {
          Department: true,
          Position: true,
          Role: true,
        },
      },
      Reward: true,
      PointPayStatus: true,
      PointReceivedPay: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return data;
}

// cancelById
app.get("/point-pay/cancel/:id", async (req, res) => {
  let { id } = req.params;
  let data = await cancelById(id);
  res.status(200).json(data);
});
async function cancelById(id) {
  let pointPay = await prisma.pointPay.findFirst({
    where: {
      id: Number(id),
    },
  });

  let updatePointdPay = await prisma.pointPay.update({
    where: {
      id: Number(id),
    },
    data: {
      pointPayStatusId: Number(4),
      approveDate: new Date(),
    },
  });

  let pointReceivedPay = await prisma.pointReceivedPay.findFirst({
    where: {
      pointPayId: Number(updatePointdPay.id),
    },
  });

  let pay = 0;
  let updatePointReceivedPay = await prisma.pointReceivedPay.update({
    where: {
      id: Number(pointReceivedPay.id),
    },
    data: {
      pay: Number(pay),
    },
  });

  let pointReceivedPayByUser = await prisma.pointReceivedPay.findMany({
    where: {
      userId: Number(updatePointReceivedPay.userId),
    },
  });

  let sumReceived = 0;
  let sumPay = 0;

  pointReceivedPayByUser.forEach((e) => {
    sumReceived += e.received;
    sumPay += e.pay;
  });

  let total = sumReceived - sumPay;

  let updateTotal = await prisma.pointReceivedPay.update({
    where: {
      id: Number(pointReceivedPay.id),
    },
    data: {
      total: Number(total),
    },
  });

  let updateUser = await prisma.user.update({
    where: {
      id: Number(updateTotal.userId),
    },
    data: {
      point: Number(total),
    },
  });

  let data = await prisma.pointPay.findFirst({
    where: {
      id: Number(pointPay.id),
    },
  });

  return data;
}

export default {
  path: "/api",
  handler: app,
};
