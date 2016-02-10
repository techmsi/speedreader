var _ = require('lodash');
var $ = require('jquery');
var remote = require('remote');
var dialog = remote.require('dialog');
var fs = require('fs');
var editor = document.getElementById('editor');
var wordsPerMinute = 100;

module.exports.getWords = function (){
  var text = editor.innerText;
  return _.words(text);
}

module.exports.readWords = function (isPaused){
  var words = this.getWords(),
      $reader = $('#reader'),
      total = words.length,
      lastWordRead = $reader.attr('data-index'),
      current = (lastWordRead) ? lastWordRead : 0;

    (function cycle() {
        console.log('current - %s, %s', current, words[current]);

        $reader
        // .removeClass('paused')
        .attr('data-index', current)
        .animate({ opacity:1.0 }, 400)
        .text(words[current])
        .delay(wordsPerMinute * 10)
        .animate({ opacity:0 }, cycle);

        if (isPaused) {
          $reader.stop(true, true);
        }
        current = ++current % total;

  })();
}

module.exports.openFile = function () {

 dialog.showOpenDialog({ filters: [
   { name: 'text', extensions: ['txt'] }
  ]}, function (fileNames) {

  if (fileNames === undefined) return;

  var fileName = fileNames[0];

  fs.readFile(fileName, 'utf-8', function (err, data) {
    editor.innerText = data;
  });
 });
}

//module.exports.getWords = getWords();
