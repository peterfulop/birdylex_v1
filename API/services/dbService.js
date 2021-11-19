const fs = require("fs");
const path = require("path");

class DbService {

  sanitizeHtml = require("sanitize-html");


  arrayValidator(array) {
    return array.map((e) => e === "undefined" || Number.isNaN(e)).filter((e) => e)
      .length
      ? false
      : true;
  }

  setUserFolders = (userId) => {

    const basePath = `./public/images/users/${userId}`;

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }
    if (!fs.existsSync(basePath + "/avatar")) {
      fs.mkdirSync(basePath + "/avatar");
    }
    if (!fs.existsSync(basePath + "/prev")) {
      fs.mkdirSync(basePath + "/prev");
    }
    if (!fs.existsSync(basePath + "/puffer")) {
      fs.mkdirSync(basePath + "/puffer");
    }

  }

  clearPufferFolder = async (pufferPath) => {

    fs.promises.readdir(pufferPath, (err, files) => {
      if (err) throw err;
      if (files.length > 0) {
        for (const file of files) {
          fs.unlink(path.join(pufferPath, file), err => {
            if (err) throw err;
          });
        }
      }
    }).then(proc => {
      console.log("then");
      return {
        stat: true,
        proc
      }

    }).catch(err => {
      return err;
    });


  }

  setPufferedImage = async (file, pufferPath, fileExt) => {
    file.mv(pufferPath + "/pufered" + fileExt, (err) => {
      if (err) {
        return console.log(err);
      }
    });
  }

  clearPreviewFolder = async (previewPath) => {
    fs.readdir(previewPath, async (err, files) => {
      if (err) throw err;
      if (files.length > 0) {
        for (const file of files) {
          fs.unlink(path.join(prevDir, file), err => {
            if (err) throw err;
          });
        }
      }
    });
  }



}





module.exports = DbService;


