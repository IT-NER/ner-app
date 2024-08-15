import express from "express";
import moment from "moment";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();
let app = express();
app.use(express.json());

// getItemsUserNotPointReceived
app.get("/user/notPointReceived/:id", async (req, res) => {
  let { id } = req.params;
  let data = await getItemsUserNotPointReceived(id);
  res.status(200).json(data);
});
// getItemsUserNotPointReceived
async function getItemsUserNotPointReceived(id) {
  let userReceived = await prisma.pointReceived.findMany({
    where: {
      contentId: Number(id),
    },
  });

  let userIds = [];
  userReceived.forEach((e) => {
    userIds.push(e.userId);
  });

  let userNotReceived = await prisma.user.findMany({
    where: {
      id: {
        notIn: userIds,
      },
    },

    include: {
      Department: true,
      Position: true,
      Role: true,
    },
  });
  return userNotReceived;
}

export default {
  path: "/api/admin",
  handler: app,
};
