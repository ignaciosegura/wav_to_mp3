// Node objects
let path = require('path');

console.log(process.argv);

class wav2mp3 {
  constructor() {
    this.config = {
      inputFolder: './input',
      outputFolder: './output',
      bitrate: 192
    }
    this.watchFolder(this.checkIsWatch());
  }

  checkIsWatch() {
    return (process.argv[2] === '--watch')
      ? true
      : false;
  }

  encodeIfNeeded(file) {
    if (!this.fileIsWAV(file))
      return;

    this.encodeFile(file);
  }

  fileIsWAV(filename) {
    let extension = path.extname(filename);
    return (extension.toLowerCase() === '.wav')
      ? true
      : false;
  }

  encodeFile(file) {
    const Lame = require("node-lame").Lame;
    const encoder = new Lame({
      output: this.config.outputFolder + '/' + path.parse(file).name + '.mp3',
      bitrate: this.config.bitrate,
    }).setFile('./' + file);

    encoder
      .encode()
      .then(() => {
        console.log('Success: ' + file);
      })
      .catch(error => {
        console.log(error);
      });
  }

  watchFolder(isWatch) {
    let chokidar = require('chokidar');
    let options = {
      ignored: /^\./,
      persistent: isWatch,
      interval: 2000
    };
    let that = this;

    let watcher = chokidar.watch(this.config.inputFolder, options);

    watcher
      .on('add', function (path) {
        that.encodeIfNeeded(path)
      })
      .on('change', function (path) {
        that.encodeIfNeeded(path)
      })
      .on('unlink', function (path) { console.log('File', path, 'has been removed'); })
      .on('error', function (error) { console.error('Error happened', error); })
  }
}


new wav2mp3();
