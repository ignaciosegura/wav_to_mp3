# WAV to MP3
This Node.JS script will watch an "input" folder for WAV files, it will encode them to MP3 and save them to an "output" folder.

This script was written to overcome Ableton Live 9 ridiculous lack of MP3 render support.

Requires install of LAME encoder. You can find installation instructions here:

https://www.npmjs.com/package/node-lame

# Installation

This tool requires Node.JS and Node NPM to be installed.

Once you install it, you need to go to the folder where you installed this script and run `npm install`.

# Usage

Once you have installed this script, you can:

`npm run wav2mp3` -> Processes input folder

`npm run watch-wav2mp3` -> Processes input folder, watches for changes and automatically processes changed files.
