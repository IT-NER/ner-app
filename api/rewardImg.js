import express from "express";
import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

let app = express();
app.use(express.json());

//create
app.post("/rewardImg", async (req, res) => {
  let reward = req.body.reward;
  let itemsRewardIng = [];
  itemsRewardIng.push(req.body.rewardImg);

  let items = [];
  itemsRewardIng.forEach((e) => {
    // console.log("e", e);
    let item = {
      rewardId: reward.id,
      path: String(e.req.destination),
      name: String(e.req.filename),
    };

    items.push(item);
  });

  console.log("items", items);
  return;

  let rewardImg = await prisma.rewardImg.create({
    data: {
      name: item.name,
      color: item.color.hexa,
      quantity: parseInt(item.quantity),
    },
  });
  res.status(200).json(rewardImg);
});

// getAll
app.get("/rewardImg", async (req, res) => {
  let rewardImg = await prisma.rewardImg.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  res.status(200).json(rewardImg);
});

//getById
// app.get("/rewardImg/:id", async (req, res) => {
//   const { id } = req.params;
//   const rewardImg = await prisma.rewardImg.findUnique({
//     where: {
//       id: parseInt(id),
//     },
//   });
//   res.status(200).json(rewardImg);
// });

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
