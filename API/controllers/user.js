const DbServiceUsers = require("../services/DbServiceUsers");
const db = new DbServiceUsers();

const multer = require("multer");
const storage = multer.memoryStorage();
const uploads = multer({ storage });
const sharp = require("sharp");

exports.users_get_userById = (req, res) => {
  res.status(200).json({
    user: req.body.user,
  });
};

exports.users_control_user = async (req, res) => {
  const { email, password } = req.body;
  const result = db.authUser(email, password);
  result.then((data) => {
    res.status(200).json({
      status: data.status,
      message: data.message,
    });
  });
};

exports.users_update_user = async (req, res) => {
  const { userId, name, email, isNew, password, oldpassword, passwordconfirm } =
    req.body;
  const result = db.updateUser(
    userId,
    name,
    email,
    isNew,
    password,
    passwordconfirm,
    oldpassword
  );
  result.then((data) => {
    res.status(200).json({
      status: data.status,
      message: data.message,
    });
  });
};

exports.users_update_avatar = async (req, res) => {
  const { userId, avatarId } = req.body;
  const result = db.updateAvatar(userId, avatarId);
  result.then((data) => {
    res.status(200).json({
      status: data.status,
      message: data.message,
      img: data.avatarId,
    });
  });
};
