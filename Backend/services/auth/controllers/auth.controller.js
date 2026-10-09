import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.js";
import redis from "../../../shared/redis/redis.js";

export const login = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = await getAuth(app).verifyIdToken(token);

    console.log(decoded);

    let user = await User.findOne({
      firebaseUID: decoded.uid,
    });

    if (!user) {
      user = await User.create({
        firebaseUID: decoded.uid,
        email: decoded.email,
        name: decoded.name,
        avatar: decoded.picture,
      });
    }

    const sessionId = crypto.randomUUID();
    await redis.set(
      `session:${sessionId}`,
      JSON.stringify({
        user: user._id,
        email: user.email,
        name: user.name,
        avatar: user.picture,
      }),
      "EX",
      60 * 60 * 24 * 7,
    );

    res.cookie(
      "session",

      sessionId,

      {
        httpOnly: true,

        secure: false,

        sameSite: "strict",

        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    );

    return res.json({
      success: true,

      user,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
     const sessionId = req.cookies?.session;

     if (sessionId) {
       await redis.del(`session:${sessionId}`);
     }

     res.clearCookie("session", {
       httpOnly: true,
       secure: false,
       sameSite: "lax",
     });

     return res.status(200).json({
       success: true,

       message: "Logged out successfully",
     });

  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
