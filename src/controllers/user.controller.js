import prisma from "../config/db.js";

export const updateProfile =
  async (req, res) => {
    try {
      const { name, email } =
        req.body;

      const updatedUser =
        await prisma.user.update({
          where: {
            id: req.user.userId,
          },
          data: {
            name,
            email,
          },
        });

      res.status(200).json({
        message:
          "Profile updated",
        user: updatedUser,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  };