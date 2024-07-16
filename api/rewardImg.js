import express from "express";
import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// getRewardByIds
app.post("/rewardImg/ids", async (req, res) => {
  let ids = req.body.data;

  let reward = await prisma.rewardImg.findMany({
    where: {
      id: { in: ids },
    },

    // include: {
    //   Reward: {
    //     include: {
    //       User: true,
    //       RewardType: true,
    //       rewardImg: true,
    //       RewardStatus: true,
    //     },
    //   },
    // },
  });
  res.status(200).json(reward);
});

//create
app.post("/rewardImg", async (req, res) => {
  let reward = req.body.data.reward;
  let itemsRewardIng = req.body.data.rewardImg;

  let items = [];
  itemsRewardIng.forEach((e) => {
    let url = e.destination + e.filename;
    let item = {
      rewardId: reward.id,
      url: url,
      path: String(e.destination),
      name: String(e.filename),
    };
    items.push(item);
  });

  let rewardImg = await prisma.rewardImg.createMany({
    data: items,
  });
  res.status(200).json(rewardImg);
});

//delete
app.delete("/rewardImg/:id", async (req, res) => {
  let id = req.params.id;
  let rewardImg = await prisma.rewardImg.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.status(200).json(rewardImg);
});

// setImgIndex
app.post("/rewardImg/setImgIndex", async (req, res) => {
  let item = req.body.data;

  let rewardImgClear = await prisma.rewardImg.updateMany({
    where: {
      rewardId: Number(item.rewardId),
    },
    data: {
      index: false,
    },
  });

  let rewardImgSetImgIndex = await prisma.rewardImg.update({
    where: {
      id: Number(item.id),
    },
    data: {
      index: true,
    },
  });

  let rewardImg = await prisma.rewardImg.findMany({
    where: {
      rewardId: Number(item.rewardId),
    },
  });

  res.status(200).json(rewardImg);
});

export default {
  path: "/api",
  handler: app,
};
