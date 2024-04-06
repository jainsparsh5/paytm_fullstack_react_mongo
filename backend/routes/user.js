const express = require("express");

const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const router = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string().min(1),
  lastName: zod.string().min(1),
  password: zod.string().min(8).max(24),
});

const signinBody = zod.object({
  username: zod.string().email(),
  passsword: zod.string().min(8).max(24),
});

router.post("/signup", async (req, res) => {
  const success = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid input",
    });
  }

  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  });

  const userId = user._id;

  await Account.create({ userId, balance: 1 + Math.random() * 10000 });

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token,
  });
});

router.post("/signin", async (req, res) => {
  const success = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Invalid input",
    });
  }

  let UserDetails;
  UserDetails = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (UserDetails) {
    const token = jwt.sign(
      {
        userId: UserDetails._id,
      },
      JWT_SECRET
    );

    res.json({
      token,
    });
    return;
  }
  return res.status(411).json({
    message: "Invalid credentials/Error while logging in",
  });
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Invalid input/Error while updating user",
    });
  }

  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );

  res.json("User updated successfully");
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
