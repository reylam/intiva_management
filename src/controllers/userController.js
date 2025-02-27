const prisma = require("../config/database");
const createError = require("http-errors");

const getMembersInSameDivision = async (req, res, next) => {
  try {
    const { id: adminId, division_id: divisionId, role } = req.user;

    if (role !== "ADMIN") {
      throw createError.Forbidden("Access denied. Only admins can view members.");
    }

    if (!divisionId) {
      throw createError.BadRequest("Admin tidak memiliki divisi.");
    }

    const members = await prisma.user.findMany({
      where: {
        division_id: divisionId,
        role: "MEMBER"
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo_profile: true,
        role: true,
        createdAt: true,
      },
    });

    res.json({
      success: true,
      message: "Berhasil mendapatkan data member",
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMembersInSameDivision };
