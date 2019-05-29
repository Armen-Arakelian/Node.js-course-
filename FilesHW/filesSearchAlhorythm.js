const fs = require('fs');
const path = require('path');

const sortFiles = (initialDirPath, resultDirPath, needOfInitialDirDeletion) => {
  console.log(needOfInitialDirDeletion);
  const files = fs.readdirSync(initialDirPath);
  files.forEach((item) => {
    const localFile = path.join(initialDirPath, item);
    const state = fs.statSync(localFile);
    if (state.isDirectory()) {
      sortFiles(localFile, resultDirPath, needOfInitialDirDeletion);
    } else {
      processSingleFile(item, resultDirPath);
      if (needOfInitialDirDeletion) {
        fs.unlinkSync(localFile);
      }
    }
  });
  if (needOfInitialDirDeletion) {
    fs.rmdirSync(initialDirPath);
    console.log('directory deleted');
  }
};

const processSingleFile = (file, resultDirPath) => {
  const firstSymbol = file.substring(0, 1);
  let localDirName;
  if (isLetter(firstSymbol)) {
    localDirName = firstSymbol.toUpperCase();
  } else {
    localDirName = 'others';
  }

  const localDirPath = path.join(resultDirPath, localDirName);
  safeCreateDir(localDirPath);
  fs.writeFile(path.join(localDirPath, file), '', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('File ' + file + ' created in result directory');
    }
  });
};

const safeCreateDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const isLetter = (char) => {
  return char.toLowerCase() != char.toUpperCase();
};

module.exports.sortFiles = sortFiles;
