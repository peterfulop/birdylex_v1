const { rejects } = require("assert");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const mv = promisify(fs.rename);
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

  removeFoldersFile = async (folderPath, files) => {
    return new Promise(async (resolve, rejects) => {
      let status = false;
      for (const file of files) {
        let curPath = path.join(folderPath, file);
        fs.unlink(curPath, (err) => {
          if (err) rejects(err);
        });
        status = (await this.getFolderFiles(folderPath)) == null ? true : false;
      }
      if (status) {
        resolve(status);
      }
    });
  };
}

module.exports = DbService;
