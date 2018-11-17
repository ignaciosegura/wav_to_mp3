// Node objects
let path = require('path');
let fs = require('fs');

const Lame = require("node-lame").Lame;

class wav2mp3 {
  constructor() {
    this.config = {
      inputFolder: './input',
      outputFolder: './output',
      bitrate: 192
    }
    let files = this.getInputDirectoryContents(this.config.inputFolder);
    console.log(files);

    for (let file of files) {
      if (!this.fileIsWAV(file))
        continue;

      this.encodeFile(file);
    }
  }

  getInputDirectoryContents(inputPath) {
    return fs.readdirSync(inputPath);
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
    }).setFile(this.config.inputFolder + '/' + file);

    encoder
      .encode()
      .then(() => {
        console.log('Success: ' + file);
      })
      .catch(error => {
        console.log(error);
      });
  }

}

console.log(new wav2mp3());
