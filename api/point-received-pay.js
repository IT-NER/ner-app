import express from "express";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

let prisma = new PrismaClient();
let app = express();

app.use(express.json());

// findByUserId
app.get("/point-received-pay/userId/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findByUserId(id);
  res.status(200).json(data);
});
async function findByUserId(userId) {
  let data = await prisma.pointReceivedPay.findMany({
    where: {
      userId: Number(userId),
    },
    include: {
      User: {
        include: {
          Department: true,
          Position: true,
          Role: true,
        },
      },
      PointPay: {
        include: {
          PointPayStatus: true,
          Reward: {
            include: {
              RewardImg: true,
            },
          },
        },
      },
      PointReceived: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return data;
}

export default {
  path: "/api",
  handler: app,
};
