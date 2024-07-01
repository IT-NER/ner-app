import express from "express";
import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

let app = express();
app.use(express.json());

//create
app.post("/rewardImg", async (req, res) => {
  // console.log("reward", req.body.reward);
  // console.log("rewardImg", req.body.rewardImg);
  // return;

  let reward = req.body.reward;
  let itemsRewardIng = req.body.rewardImg;

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

// getAll
// app.get("/rewardImg", async (req, res) => {
//   let rewardImg = await prisma.rewardImg.findMany({
//     orderBy: [
//       {
//         id: "desc",
//       },
//     ],
//   });
//   res.status(200).json(rewardImg);
// });

//getById
app.get("/rewardImg/:id", async (req, res) => {
  let id = req.params;
  let rewardImg = await prisma.rewardImg.findMany({
    where: {
      rewardId: Number(id),
    },
  });

  console.log("rewardImg", rewardImg);
  res.status(200).json(rewardImg);
});

//update
// app.put("/rewardImg/:id", async (req, res) => {
//   let id = req.params.id;
//   let item = req.body.data;
//   let rewardImg = await prisma.rewardImg.update({
//     where: {
//       id: parseInt(id),
//     },
//     data: {
//       name: item.name,
//       color: item.color,
//       quantity: parseInt(item.quantity),
//     },
//   });
//   res.status(200).json(rewardImg);
// });

export default {
  path: "/api",
  handler: app,
};
