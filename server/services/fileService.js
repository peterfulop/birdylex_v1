const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const dotenv = require("dotenv");
dotenv.config();

class FileService {

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

    getFolderFiles = async (folderPath) => {
        return await new Promise((resolve, reject) => {
            return fs.readdir(folderPath, (err, filenames) =>
                err != null ? reject(err) : resolve(filenames)
            );
        });
    };

    removeFolderContent = async (folderPath) => {
        let files = await this.getFolderFiles(folderPath);
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

    setPufferImage = async (file, pufferPath, pufferedName, prevPath) => {
        await new Promise(async (resolve, reject) => {
            await file.mv(pufferPath + pufferedName, async (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(
                        await this.setResizedImage(pufferPath, pufferedName, prevPath)
                    );
                }
            });
        });
    };

    copyFileTo = async (copyFrom, pasteTo) => {
        await new Promise(async (resolve, reject) => {
            fs.copyFile(copyFrom, pasteTo, (err) => {
                if (err) reject(err);
                else resolve();
            })
        })
    }

    setResizedImage = async (pufferPath, imageName, prevPath) => {
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

    validateImageExtension = async (fileExt) => {

        const validExtensions = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'svg', 'tiff', 'avif'];
        return validExtensions.includes(fileExt.toLowerCase());

    }
}

module.exports = FileService;
