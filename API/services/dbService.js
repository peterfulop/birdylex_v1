const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
class DbService {
  sanitizeHtml = require("sanitize-html");

  arrayValidator(array) {
    return array
      .map((e) => e === "undefined" || Number.isNaN(e))
      .filter((e) => e).length
      ? false
      : true;
  }

  setUserFolders = async (userId) => {
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

  clearPufferFolder = async (pufferPath) => {
    return new Promise(async (resolve, rejects) => {
      fs.readdir(pufferPath, async (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join(pufferPath, file), (err) => {
            if (err) rejects(err);
            else {
              resolve(true);
            }
          });
        }
      });
    });
  };

  getDirLength = async (folderPath) => {
    return new Promise((resolve, rejects) => {
      fs.readdir(folderPath, (err, files) => {
        if (err) rejects(err);
        else {
          return resolve(files.length);
        }
      });
    });
  };

  clearPreviewFolder = async (previewPath) => {
    return new Promise((resolve, rejects) => {
      fs.readdir(previewPath, async (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join(previewPath, file), (err) => {
            if (err) rejects(err);
            else {
              resolve(true);
            }
          });
        }
      });
    });
  };


  getFolderFiles = async (folderPath) => {
    return new Promise((resolve, reject) => {
      return fs.readdir(folderPath, (err, filenames) =>
        err != null ? reject(err) : resolve(filenames)
      );
    });
  };


  removeFolderContent = async (folderPath) => {

    let files = await this.getFolderFiles(folderPath);
    let i = files.length;

    new Promise(async (resolve, rejects) => {
      if (i > 0) {
        for (const file of files) {
          let curPath = path.join(folderPath, file);
          console.log(file);
          i--;
          fs.unlink(curPath, (err) => {
            if (err) rejects(err);
          });
          if (i === 0) {
            console.log(`${folderPath} >> vége!`);
            resolve(i);
          }
        }
      } else {
        console.log(`${folderPath} >> üres!`);
        resolve(i);
      }

    });
  };

  removeContent = async (folderPath) => {

    let files = await new Promise((resolve, reject) => {
      return fs.readdir(folderPath, (err, filenames) =>
        err != null ? reject(err) : resolve(filenames)
      );
    });


    let i = files.length;
    console.log("i értéke:", i);
    if (i > 0) {
      for (const file of files) {
        let curPath = path.join(folderPath, file);
        console.log(file);
        i--;

        //await fs.unlink(curPath);

        if (i === 0) {
          console.log(`${folderPath} >> vége!`);
          return (i);
        }
      }
    } else {
      console.log(`${folderPath} >> üres!`);
      return (i);
    }


  };


  setPufferImage = async (file, pufferPath, pufferedName) => {
    new Promise((resolve, rejects) => {
      file.mv(pufferPath + pufferedName, (err) => {
        if (err) {
          rejects(err)
        } else {
          console.log("Kép pufferelve!");
          resolve(pufferPath + pufferedName);
        }
      });
    })
  }

  setResizedImage = async (pufferPath, imageName, prevPath) => {

    new Promise((resolve, rejects) => {
      const pufferedImage = pufferPath + imageName;
      const finalImage = sharp(pufferedImage)
        .resize({ width: 300 })
        .toFile(prevPath + imageName)
        .then(x => {
          console.log("Kép átméretezve!");
          resolve(finalImage);
        })
        .catch((err) => {
          rejects(err);
        })
    })

  }
}

module.exports = DbService;
