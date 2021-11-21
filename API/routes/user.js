const express = require("express");
const { isLoggedIn } = require("../controllers/auth.js");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const UserController = require("../controllers/user.js");
const dbService = require("../services/dbService.js");

const dbs = new dbService();

router.get(
  "/active",
  isLoggedIn,
  (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {
      console.log(req.body);
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
      console.log(req.user);
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
  (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {
      req.body.userId = req.user.unique_id;

      if (req.files) {
        const file = req.files.image;
        const fileName = req.files.image.name;
        const ext = path.extname(fileName);

        const unique_id = req.user.unique_id;

        dbs.setUserFolders(unique_id);

        const basePath = `./public/images/users/${unique_id}/avatar/`;

        fs.readdir(basePath, (err, files) => {
          if (err) {
            console.log(err);
            return res.json({
              message: "Hiba történt!",
            });
          } else {
            if (files.length > 0) {
              for (const file of files) {
                console.log(file);
                fs.unlink(path.join(basePath, file), (err) => {
                  if (err) return console.log(err);
                });
              }
            } else {
              return res.json({
                message: "Nincs törölhető kép!",
              });
            }
          }
        });

        const rnd = uuid.v4();
        const randomId = rnd;
        const unique_name = `${randomId}${ext}`;

        file.mv(basePath + unique_name, (err) => {
          if (err) {
            res.send(err);
            return;
          } else {
            req.body.avatarId = unique_name;
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
  (req, res, next) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {
      req.body.userId = req.user.unique_id;
      const unique_id = req.user.unique_id;
      const basePath = `./public/images/users/${unique_id}/avatar/`;
      try {
        fs.readdir(basePath, (err, files) => {
          if (err) {
            console.log(err);
            return res.json({
              message: "Hiba történt!",
            });
          } else {
            if (files.length > 0) {
              for (const file of files) {
                fs.unlink(path.join(basePath, file), (err) => {
                  if (err) throw err;
                });
              }
              fs.copyFile(
                "./public/images/avatar.png",
                `${basePath}/avatar.png`,
                (err) => {
                  if (err) throw error;
                }
              );
              req.body.avatarId = "avatar.png";
              next();
            } else {
              return res.json({
                message: "Nincs törölhető kép!",
              });
            }
          }
        });
      } catch (error) {
        return error.message;
      }
    }
  },
  UserController.users_update_avatar
);

router.post("/avatar/prev", isLoggedIn, async (req, res) => {
  if (!req.user) {
    console.log("response message:", res.message);
    res.redirect("/");
  } else {
    if (req.files) {
      // 0. Elérési utak meghatározása
      const unique_id = req.user.unique_id;
      const prevPath = `./public/images/users/${unique_id}/prev/`;
      const pufferPath = `./public/images/users/${unique_id}/puffer/`;

      const file = req.files.image;
      const fileName = path.basename(file.name);
      const fileExt = path.extname(fileName);
      const pufferName = uuid.v4() + fileExt;

      await Promise.allSettled([
        await dbs.setUserFolders(unique_id),
        await dbs.removeFolderContent(pufferPath),
        await dbs.removeFolderContent(prevPath),
        await dbs.setPufferImage(file, pufferPath, pufferName, prevPath),
      ]).then(async () => {
        let count = await dbs.getFolderFiles(prevPath);
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
      await dbs.setUserFolders(unique_id),
      await dbs.removeFolderContent(pufferPath),
      await dbs.removeFolderContent(prevPath),
    ]).then(res.json({ ok: true, message: "Mappák törölve" }));
  }
});

module.exports = router;
