const express = require("express");
const { isLoggedIn } = require("../controllers/auth.js");
const router = express.Router();
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");
const sharp = require("sharp");
const UserController = require("../controllers/user.js");
const dotenv = require("dotenv");
dotenv.config();

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
      const validImage = await validateImageExtension(extension.toLowerCase());

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
        const avatarPath = `./public/images/users/${unique_id}/avatar/`;

        const file = req.files.image;
        const fileName = path.basename(file.name);
        const fileExt = path.extname(fileName);
        const pufferName = uuid.v4() + fileExt;

        await Promise.allSettled([
          await setUserFolders(unique_id),
          await removeFolderContent(pufferPath),
          await removeFolderContent(avatarPath),
          await setPufferImage(file, pufferPath, pufferName, avatarPath),
        ]).then(async () => {
          let count = await getFolderFiles(avatarPath);
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

      Promise.allSettled([
        await setUserFolders(unique_id),
        await removeFolderContent(avatarPath),
        await copyFileTo(originalAvatar, avatarPath + process.env.DEFAULT_AVATAR)
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
    const validImage = await validateImageExtension(extension.toLowerCase());

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
        await setUserFolders(unique_id),
        await removeFolderContent(pufferPath),
        await removeFolderContent(prevPath),
        await setPufferImage(file, pufferPath, pufferName, prevPath),
      ]).then(async () => {
        let count = await getFolderFiles(prevPath);
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
      await setUserFolders(unique_id),
      await removeFolderContent(pufferPath),
      await removeFolderContent(prevPath),
    ]).then(res.json({ ok: true, message: "Mappák törölve" }));
  }
});


/// ROUT METHODS
const setUserFolders = async (userId) => {
  const basePath = `./public/images/users/${userId}/`;
  const avatarPath = `./public/images/users/${userId}/avatar/`;
  const prevPath = `./public/images/users/${userId}/prev/`;
  const pufferPath = `./public/images/users/${userId}/puffer/`;

  fs.access(basePath, (err) => {
    if (err) {
      fs.mkdirSync(basePath);
    }
  });

  fs.access(avatarPath, (err) => {
    if (err) {
      fs.mkdirSync(avatarPath);
    }
  });

  fs.access(prevPath, (err) => {
    if (err) {
      fs.mkdirSync(prevPath);
    }
  });

  fs.access(pufferPath, (err) => {
    if (err) {
      fs.mkdirSync(pufferPath);
    }
  });

  return {
    basePath,
    prevPath,
    avatarPath,
    pufferPath,
  };
};

const getFolderFiles = async (folderPath) => {
  return await new Promise((resolve, reject) => {
    return fs.readdir(folderPath, (err, filenames) =>
      err != null ? reject(err) : resolve(filenames)
    );
  });
};

const removeFolderContent = async (folderPath) => {
  let files = await getFolderFiles(folderPath);
  let i = files.length;
  await new Promise(async (resolve, reject) => {
    if (i > 0) {
      for (const file of files) {
        let curPath = path.join(folderPath, file);
        i--;
        fs.unlink(curPath, (err) => {
          if (err) reject(err);
        });
      }
      if (i === 0) {
        resolve();
      }
    } else {
      resolve();
    }
  });
};

const setPufferImage = async (file, pufferPath, pufferedName, prevPath) => {
  await new Promise(async (resolve, reject) => {
    await file.mv(pufferPath + pufferedName, async (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          await setResizedImage(pufferPath, pufferedName, prevPath)
        );
      }
    });
  });
};

const copyFileTo = async (copyFrom, pasteTo) => {
  await new Promise(async (resolve, reject) => {
    fs.copyFile(copyFrom, pasteTo, (err) => {
      if (err) reject(err);
      else resolve();
    })
  })
}

const setResizedImage = async (pufferPath, imageName, prevPath) => {
  await new Promise(async (resolve, reject) => {
    const pufferedImage = pufferPath + imageName;
    await sharp(pufferedImage)
      .resize({ width: 300 })
      .rotate()
      .toFile(prevPath + imageName)
      .finally(() => {
        resolve(sharp.cache({ files: 0 })); /// VERY IMPORTANT TO CLEAR THE CACHE!!!!
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const validateImageExtension = (fileExt) => {

  const validExtensions = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'svg', 'tiff', 'avif'];
  return validExtensions.includes(fileExt.toLowerCase());

}


module.exports = router;
