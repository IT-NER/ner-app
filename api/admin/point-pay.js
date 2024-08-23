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

// filter
app.post("/point-pay/filter", async (req, res) => {
  let item = req.body.data;
  let data = await filter(item);
  res.status(200).json(data);
});
async function filter(item) {
  let dateStart = moment(item.start).format("YYYY-MM-DD 00:00");
  let dateEnd = moment(item.end).add(1, "day").format("YYYY-MM-DD 00:00");

  let items = {
    pointPayStatusId: {
      notIn: [4],
    },
  };

  if (item.pointPayStatusId.length > 0) {
    items.pointPayStatusId = {
      in: item.pointPayStatusId,
    };
  }
  if (item.rewardId.length > 0) {
    items.rewardId = {
      in: item.rewardId,
    };
  }
  if (item.start) {
    items.createdAt = {
      gte: new Date(dateStart),
    };
  }
  if (item.end) {
    items.createdAt = {
      lte: new Date(dateEnd),
    };
  }

  let data = await prisma.pointPay.findMany({
    where: items,
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

// approve
app.post("/point-pay/approve", async (req, res) => {
  let items = req.body.data.items;
  let approveBy = req.body.data.approveBy;
  let data = await approve(items, approveBy);
  res.status(200).json(data);
});
async function approve(items, approveBy) {
  let ids = [];
  items.forEach((item) => {
    ids.push(item.id);
  });

  let data = await prisma.pointPay.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      approveDate: new Date(),
      approveBy: Number(approveBy),
      pointPayStatusId: Number(2),
    },
  });
  return data;
}

// notApprove
app.post("/point-pay/notApprove", async (req, res) => {
  let items = req.body.data.items;
  let approveBy = req.body.data.approveBy;
  let data = await notApprove(items, approveBy);
  res.status(200).json(data);
});
async function notApprove(items, approveBy) {
  items.forEach(async (item) => {
    let updatePointdPay = await prisma.pointPay.update({
      where: {
        id: Number(item.id),
      },
      data: {
        pointPayStatusId: Number(3),
        approveBy: Number(approveBy),
        approveDate: new Date(),
      },
    });

    let pointReceivedPay = await prisma.pointReceivedPay.findFirst({
      where: {
        pointPayId: Number(item.id),
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
        userId: Number(pointReceivedPay.userId),
      },
    });

    let sumReceived = 0;
    let sumPay = 0;
    pointReceivedPayByUser.forEach((e) => {
      sumReceived += e.received;
      sumPay += e.pay;
    });
    let total = sumReceived - sumPay;

    let updateTotalPointReceivedPay = await prisma.pointReceivedPay.update({
      where: {
        id: Number(pointReceivedPay.id),
      },
      data: {
        total: Number(total),
      },
    });

    let updateTotalUser = await prisma.user.update({
      where: {
        id: Number(pointReceivedPay.userId),
      },
      data: {
        point: Number(total),
      },
    });
  });

  return true;
}

export default {
  path: "/api/admin",
  handler: app,
};
