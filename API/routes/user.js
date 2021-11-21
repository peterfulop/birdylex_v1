const express = require("express");
const { isLoggedIn } = require("../controllers/auth.js");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const multer = require("multer");
const storage = multer.memoryStorage();
const uploads = multer({ storage });
const sharp = require("sharp");

const UserController = require("../controllers/user.js");
const dbService = require("../services/dbService.js");
const { fail, rejects } = require("assert");
const { registerHelper } = require("hbs");
const { resolve } = require("path");
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

router.post("/avatar/preview", isLoggedIn, async (req, res) => {
  if (!req.user) {
    console.log("response message:", res.message);
    res.redirect("/");
  } else {
    req.body.userId = req.user.unique_id;

    if (req.files) {
      const file = req.files.image;
      const fileName = req.files.image.name;
      const fileExt = path.extname(fileName);

      // Elérési útvonalak beállítása, ha hiányozna
      const unique_id = req.user.unique_id;
      const basePath = `./public/images/users/${unique_id}/`;
      dbs.setUserFolders(unique_id);

      const pufferPath = basePath + "puffer/";
      const previewPath = basePath + "prev/";

      // PUFFER mappa ürítése
      //   try {
      //     fs.readdir(pufferPath, (err, files) => {
      //       if (err) throw err;
      //       if (files.length > 0) {
      //         for (const file of files) {
      //           fs.unlink(path.join(pufferPath, file), (err) => {
      //             if (err) throw err;
      //           });
      //         }
      //       }
      //     });
      //   } catch (err) {
      //     console.log(err);
      //   }

      // // Előnézeti kép betöltése pufferbe

      let randomName = uuid.v4();
      //   try {
      //     file.mv(pufferPath + randomName + fileExt, (err) => {
      //       if (err) throw err;
      //     });
      //   } catch (err) {
      //     console.log(err);
      //   }

      // }

      // // Előézeti mappa ürítése
      fs.readdir(previewPath, (err, files) => {
        if (err) throw err;
        if (files.length > 0) {
          console.log("A mappa nem üres!");
          for (const file of files) {
            fs.unlink(path.join(previewPath, file), (err) => {
              if (err) throw err;
            });
          }
        }
      });

      // Végleges kép paramétereinek meghatározása, majd másolás
      const unique_name = randomName + fileExt;

      file.mv(previewPath + unique_name, (err) => {
        if (err) {
          return console.log(err);
        } else {
          res.json({
            img: unique_name,
            user: unique_id,
          });
        }
      });

      //   let input = pufferPath + unique_name;
      //   console.log(input);
      //   await sharp(input)
      //     .resize({ width: 300 })
      //     .toFile(previewPath + unique_name)
      //     .catch((error) => {
      //       console.log(error);
      //     });
    } else {
      return {
        status: false,
      };
    }
  }
});

router.post(
  "/avatar/prev",
  isLoggedIn,
  async (req, res) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {
      if (req.files) {

        // 0. Elérési utak meghatározása
        const unique_id = req.user.unique_id;
        const prevPath = `./public/images/users/test/prev/`;
        const pufferPath = `./public/images/users/test/puffer/`;
        // const prevPath = `./public/images/users/${unique_id}/prev/`;
        // const pufferPath = `./public/images/users/${unique_id}/puffer/`;

        const file = req.files.image;
        const fileName = path.basename(file.name);
        const fileExt = path.extname(fileName);
        const pufferName = uuid.v4() + fileExt;

        let proc_01 = new Promise(async (resolve, rejects) => {
          // const res = await dbs.removeFolderContent(pufferPath);
          const i = await dbs.removeContent(pufferPath);
          console.log("proc_01", i);
          resolve(i);
          // return resolve(res);

        })

        let proc_02 = new Promise(async (resolve, rejects) => {
          // const res = await dbs.removeContent(prevPath);
          const i = await dbs.removeContent(prevPath);
          console.log("proc_02", i);
          resolve(i);
          // return resolve(res);

        })

        Promise.race(
          [
            proc_01,
            proc_02
            //dbs.removeFolderContent(pufferPath),
            //dbs.removeFolderContent(prevPath),
            // dbs.setPufferImage(file, pufferPath, pufferName),
            // dbs.setResizedImage(pufferPath, pufferName, prevPath)
          ]
        ).then(x => {
          res.status(200).json({
            ok: true,
            message: "Preview kép betöltve!"
          })
        })

      } else {
        res.json({
          ok: false,
          message: "no files",
        });
      }
    }
  }
);

router.delete(
  "/avatar/prev",
  isLoggedIn,
  async (req, res) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {

      const unique_id = req.user.unique_id;
      const pufferPath = `./public/images/users/${unique_id}/puffer/`;
      const prevPath = `./public/images/users/${unique_id}/prev/`;

      await Promise.race(
        [
          dbs.setUserFolders(unique_id),
          dbs.removeFolderContent(pufferPath),
          dbs.removeFolderContent(prevPath)
        ]
      )
        .then(
          res.json({ ok: true, message: "Mappák törölve" })
        )
    }
  }
);


router.delete(
  "/test",
  isLoggedIn,
  async (req, res) => {
    if (!req.user) {
      console.log("response message:", res.message);
      res.redirect("/");
    } else {


      //const unique_id = req.user.unique_id;
      //const ufp = await dbs.setUserFolders(unique_id);

      const URL_1 = "./public/images/users/test/puffer/";
      const URL_2 = "./public/images/users/test/prev/";

      Promise.race(dbs.removeFolderContent(URL_1), dbs.removeFolderContent(URL_2)).then((value) => {
        console.log(value);
      })



    }
  }
);

module.exports = router;
