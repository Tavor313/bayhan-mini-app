import express from "express";
import jwt from "jsonwebtoken";
import { verifyTelegramInitData } from "../auth/verifyInitData.js";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Логин через Telegram WebApp initData
router.post("/telegram", async (req, res, next) => {
  try {
    const { initData } = req.body || {};
    const { ok, payload, reason } = verifyTelegramInitData(initData || "");
    if (!ok) return res.status(401).json({ error: "Invalid initData", reason });

    const tgUser = payload && payload.user ? JSON.parse(payload.user) : null;
    if (!tgUser) return res.status(400).json({ error: "No Telegram user" });

    let user = await User.findOne({ telegramId: tgUser.id });
    if (!user) {
      user = await User.create({
        telegramId: tgUser.id,
        firstName: tgUser.first_name,
        lastName: tgUser.last_name,
      });
    }

    const token = jwt.sign(
      { telegramId: tgUser.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (e) {
    next(e);
  }
});

// 🔹 Dev-login для теста без Telegram
router.get("/dev-login", (req, res) => {
  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ error: "user required" });
  }

  const token = jwt.sign(
    { id: user, role: "owner" },
    process.env.JWT_SECRET || "replace_me_with_long_random_string",
    { expiresIn: "7d" }
  );

  res.json({ token });
});

export default router;
