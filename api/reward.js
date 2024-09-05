import express from "express";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// findAll
app.get("/rewards", async (req, res) => {
  let data = await findAll();
  res.status(200).json(data);
});
async function findAll() {
  let data = await prisma.reward.findMany({
    where: {
      active: Boolean(true),
    },
    include: {
      User: {
        include: {
          Department: true,
          Position: true,
          Role: true,
          Booking: true,
          Content: true,
          Reward: true,
          PointReceived: true,
          PointPay: true,

          PointReceivedPay: true,
        },
      },
      RewardImg: true,
      PointPay: true,
    },
  });
  return data;
}
// findAllNotActive
app.get("/rewards-not-active", async (req, res) => {
  let data = await findAllNotActive();
  res.status(200).json(data);
});
async function findAllNotActive() {
  let data = await prisma.reward.findMany({
    where: {
      active: Boolean(false),
    },
    include: {
      User: {
        include: {
          Department: true,
          Position: true,
          Role: true,
          Booking: true,
          Content: true,
          Reward: true,
          PointReceived: true,
          PointPay: true,

          PointReceivedPay: true,
        },
      },
      RewardImg: true,
      PointPay: true,
    },
  });
  return data;
}
// findOne
app.get("/reward/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findOne(id);
  res.status(200).json(data);
});
async function findOne(id) {
  let data = await prisma.reward.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      RewardImg: true,
      User: {
        include: {
          PointPay: {
            include: {
              User: true,
              Reward: true,
              PointPayStatus: true,
              PointReceivedPay: true,
            },
          },

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
