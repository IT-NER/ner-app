import express from "express";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
import bcrypt from "bcryptjs";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "static/uploads/profile/");
  },
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}.jpg`);
  },
});
const upload = multer({ storage: storage });
//
//
//
let prisma = new PrismaClient();
let app = express();
app.use(express.json());

//upload
app.post("/user/upload", upload.single("file"), async (req, res) => {
  // res.json(req.file);
  let img = await uploadProfile(req.body.id, req.file);
  let data = await findOne(Number(req.body.id));
  res.status(200).json(data);
});
async function uploadProfile(userId, file) {
  console.log("userId", userId);
  console.log("file", file);

  let data = await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      img: String("/uploads/profile/" + file.filename),
    },
  });
  return data;
}

//search
app.post("/user/search", async (req, res) => {
  let item = req.body.data;
  let items = [];

  items.push({ active: true });

  if (item.departmentId) {
    items.push({ departmentId: item.departmentId });
  }
  if (item.positionId) {
    items.push({ positionId: item.positionId });
  }

  let user = await prisma.user.findMany({
    where: {
      AND: items,
    },
    include: {
      Department: true,
      Position: true,
      Role: true,
      Booking: true,
    },
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  res.status(200).json(user);
});

// findAll
app.get("/user", async (req, res) => {
  let data = await findAll();
  res.status(200).json(data);
});
async function findAll() {
  let data = await prisma.user.findMany({
    where: {
      active: Boolean(true),
    },
    include: {
      ButtonLink: true,
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
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return data;
}
//findOne
app.get("/user/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findOne(id);
  res.status(200).json(data);
});
async function findOne(id) {
  let data = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ButtonLink: true,
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
  });

  return data;
}

//create
app.post("/user", async (req, res) => {
  let item = req.body.data;
  let hashedPassword = await bcrypt.hash(String(item.password), 10);
  let user = await prisma.user
    .create({
      data: {
        email: item.email,
        username: item.username,
        password: hashedPassword,
        lname: item.lname,
        fname: item.fname,
        departmentId: item.departmentId,
        positionId: item.positionId,
        roleId: item.roleId,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      // console.log('err', err);
      return res.status(401).json({ error: "Invalid credentials" });
    });

  res.status(200).json(user);
});

//update
app.put("/user/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      email: item.email,
      username: item.username,
      lname: item.lname,
      fname: item.fname,
      status: item.status,
      departmentId: item.departmentId,
      positionId: item.positionId,
      roleId: item.roleId,
      updatedAt: new Date(moment().format()),
    },
  });
  res.status(200).json(user);
});

//update password
app.put("/user/update-password/:id", async (req, res) => {
  let id = req.params.id;
  let item = req.body.data;
  let hashedPassword = await bcrypt.hash(item.newPassword, 10);

  let check = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  // console.log("check", check);

  let user = null;
  if (check.password == item.password) {
    user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        password: hashedPassword,
      },
    });

    if (user) {
      res.status(200).json(user);
    }
  }
});

//resetPassword
app.post("/user/reset-password", async (req, res) => {
  let item = req.body.data;

  let data = await resetPassword(item);
  return res.status(200).json(data);
});
async function resetPassword(item) {
  let newPassword = await bcrypt.hash(item.newPassword, 10);

  let data = await prisma.user.update({
    where: {
      id: Number(item.id),
    },
    data: {
      password: String(newPassword),
    },
  });

  return data;
}

//delete
app.delete("/user/:id", async (req, res) => {
  let id = req.params.id;
  let user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json(user);
});

//findByRewardId
app.get("/user/rewardId/:id", async (req, res) => {
  let { id } = req.params;
  let data = await findByRewardId(id);
  res.status(200).json(data);
});
async function findByRewardId(rewardId) {
  let reward = await prisma.reward.findFirst({
    where: {
      id: Number(rewardId),
    },
  });

  let point = reward.point;

  let data = await prisma.user.findMany({
    where: {
      point: {
        gte: Number(point),
      },
    },
    include: {
      ButtonLink: true,
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
  });

  return data;
}

export default {
  path: "/api",
  handler: app,
};
