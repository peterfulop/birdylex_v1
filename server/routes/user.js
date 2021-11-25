const express = require("express");
const { isLoggedIn } = require("../controllers/auth.js");
const router = express.Router();
const path = require("path");
const uuid = require("uuid");
const UserController = require("../controllers/user.js");
const dotenv = require("dotenv");
const FileService = require("../services/fileService");
dotenv.config();
const fService = new FileService();

router.get(
  "/active",
  isLoggedIn,
  (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {
      req.body.user = req.user;
      next();
    }
  },
  UserController.users_get_userById
);

router.post(
  "/control",
  isLoggedIn,
  (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {
      req.body.userId = req.user.unique_id;
      next();
    }
  },
  UserController.users_control_user
);

router.patch(
  "/patch",
  isLoggedIn,
  (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {
      req.body.userId = req.user.unique_id;
      req.body.oldpassword = req.user.password;
      next();
    }
  },
  UserController.users_update_user
);

router.post(
  "/avatar",
  isLoggedIn,
  async (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {
      req.body.userId = req.user.unique_id;

      const mime = req.files.image.mimetype;
      const extension = mime.split('/').pop();
      const validImage = await fService.validateImageExtension(extension.toLowerCase());

      if (!validImage) {
        return res.status(200).json({
          ok: validImage,
          valid: validImage,
          message: "Nem megfelelő a kép formátuma!"
        })
      }

      if (req.files && validImage) {
        const unique_id = req.user.unique_id;
        const pufferPath = `./public/images/users/${unique_id}/puffer/`;
        const prevPath = `./public/images/users/${unique_id}/prev/`;
        const avatarPath = `./public/images/users/${unique_id}/avatar/`;

        const file = req.files.image;
        const fileName = path.basename(file.name);
        const fileExt = path.extname(fileName);
        const pufferName = uuid.v4() + fileExt;

        await Promise.allSettled([
          await fService.setUserFolders(unique_id),
          await fService.removeFolderContent(pufferPath),
          await fService.removeFolderContent(avatarPath),
          await fService.setPufferImage(file, pufferPath, pufferName, avatarPath),
          await fService.removeFolderContent(pufferPath),
          await fService.removeFolderContent(prevPath),

        ]).then(async () => {
          let count = await fService.getFolderFiles(avatarPath);
          if (count.length > 0) {
            req.body.avatarId = pufferName;
            next();
          }
        });

      } else {
        return res.json({
          message: "Nincs file csatolva!",
        });
      }
    }
  },
  UserController.users_update_avatar
);

router.delete(
  "/avatar",
  isLoggedIn,
  async (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {

      const unique_id = req.user.unique_id;
      req.body.userId = unique_id;

      const avatarPath = `./public/images/users/${unique_id}/avatar/`;
      const originalAvatar = `./public/images/${process.env.DEFAULT_AVATAR}`;
      const prevPath = `./public/images/users/${unique_id}/prev/`;
      const pufferPath = `./public/images/users/${unique_id}/puffer/`;


      Promise.allSettled([
        await fService.setUserFolders(unique_id),
        await fService.removeFolderContent(avatarPath),
        await fService.copyFileTo(originalAvatar, avatarPath + process.env.DEFAULT_AVATAR),
        await fService.removeFolderContent(pufferPath),
        await fService.removeFolderContent(prevPath),
      ])
        .then(() => {
          req.body.avatarId = process.env.DEFAULT_AVATAR;
          next();
        })
    }
  }, UserController.users_update_avatar
);

router.post("/avatar/prev", isLoggedIn, async (req, res) => {
  if (!req.user) {
    console.log("response message:", res.message);
    res.redirect("/");
  } else {
    const mime = req.files.image.mimetype;
    const extension = mime.split('/').pop();
    const validImage = await fService.validateImageExtension(extension.toLowerCase());

    if (!validImage) {
      return res.status(200).json({
        ok: validImage,
        valid: validImage,
        message: "Nem megfelelő a kép formátuma!"
      })
    }

    if (req.files && validImage) {
      const unique_id = req.user.unique_id;
      const prevPath = `./public/images/users/${unique_id}/prev/`;
      const pufferPath = `./public/images/users/${unique_id}/puffer/`;

      const file = req.files.image;
      const fileName = path.basename(file.name);
      const fileExt = path.extname(fileName);
      const pufferName = uuid.v4() + fileExt;

      await Promise.allSettled([
        await fService.setUserFolders(unique_id),
        await fService.removeFolderContent(pufferPath),
        await fService.removeFolderContent(prevPath),
        await fService.setPufferImage(file, pufferPath, pufferName, prevPath),
      ]).then(async () => {
        let count = await fService.getFolderFiles(prevPath);
        if (count.length > 0) {
          res.json({
            ok: true,
            img: pufferName,
            user: unique_id,
            message: "Kész",
          });
        }
      });
    } else {
      res.json({
        ok: false,
        message: "no files",
      });
    }
  }
});

router.delete("/avatar/prev", isLoggedIn, async (req, res) => {
  if (!req.user) {
    console.log("response message:", res.message);
    res.redirect("/");
  } else {
    const unique_id = req.user.unique_id;
    const pufferPath = `./public/images/users/${unique_id}/puffer/`;
    const prevPath = `./public/images/users/${unique_id}/prev/`;

    Promise.allSettled([
      await fService.setUserFolders(unique_id),
      await fService.removeFolderContent(pufferPath),
      await fService.removeFolderContent(prevPath),
    ]).then(res.json({ ok: true, message: "Mappák törölve" }));
  }
});


module.exports = router;
