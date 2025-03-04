import jwt from "jsonwebtoken";

export const generateToken = (res, user, msg) => {
  const token = jwt.sign({ userId: user._id }, process.env.MY_SECRET_KEY, {
    expiresIn: "1d",
  });
  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      msg,
      user,
    });
};
