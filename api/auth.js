import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// prisma
import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();

let app = express();
app.use(express.json());

// login
app.post("/login", async (req, res, next) => {
  let { identifier, password } = req.body;
  let token = null;
  let user = null;

  try {
    user = await prisma.user.findMany({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
        AND: [{ active: true }],
      },
      include: {
        Department: true,
        Position: true,
        Role: true,
      },
    });

    if (!user || !(await bcrypt.compare(password, user[0].password))) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    token = jwt.sign({ user: user }, process.env.AUTH_SECRET, {
      algorithm: "HS256",
      expiresIn: "30d",
    });
  } catch (err) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  res.status(200).json({ token, user: user[0] });
});

// register
app.post("/register", async (req, res) => {
  const item = req.body;

  const hashedPassword = await bcrypt.hash(item.password, 10);

  const user = await prisma.user.create({
    data: {
      email: item.email,
      username: item.username,
      password: hashedPassword,
      lname: item.lname,
      fname: item.fname,
      status: item.status,
      departmentId: item.departmentId,
      positionId: item.positionId,
      roleId: item.roleId,
    },
  }).then((res) => {
    // console.log('res', res);
    return res;
  }).catch((err) => {
    // console.log('err', err);
    res.status(401).json({ error: "Invalid credentials" });
    return;
  });

  res.status(200).json(user);
});


// [POST] /logout
app.post("/logout", (req, res, next) => {
  res.status(200).json({ status: "OK" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err); // eslint-disable-line no-console
  res.status(401).send(err + "");
});

export default {
  path: "/api/auth",
  handler: app,
};
