const searchAhorythm = require('./filesSearchAlhorythm.js');
const path = require('path');

const initialFolderPath = process.argv[2];
const resultFolderPath = process.argv[3];
const needOfInitialDirDeletion = (process.argv[4] === 'true');

// const initialFolderPath = './InitialFolder';
// const resultFolderPath = './ResultFolder';

if (path.resolve(initialFolderPath).match('FilesHW')) {
  searchAhorythm.sortFiles(initialFolderPath, resultFolderPath,
    needOfInitialDirDeletion);
} else {
  console.log('check your directory');
}
