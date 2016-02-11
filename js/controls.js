var _ = require('lodash');
var $ = require('jquery');
var remote = require('remote');
var dialog = remote.require('dialog');
var fs = require('fs');
var editor = document.getElementById('editor');
var wordsPerMinute = 100;
this.current = 0;
this.words = '';

module.exports.getWords = function (){
  var text = editor.innerText;
  return _.words(text);
}

module.exports.setWords = function (){
  var text = this.getWords();
  document.querySelector('.word').innerText = text[0];
  this.words = text;
}

module.exports.readWords = function (isPaused){

  var self = this,
      words = self.words,
      current = self.current,
      $reader = $('#reader'),
      total = words.length,
      lastWordRead = $reader.attr('data-index');


      if (current > 0) {
        current = (lastWordRead) ? lastWordRead : 0;
      }
    (function cycle() {
        console.log('current - paused: %s, %s, %s', isPaused, current, words[current]);

        $reader
        .attr('data-index', current)
        .animate({ opacity:1.0 }, 400)
        .text(words[current])
        .delay(wordsPerMinute * 10)
        .animate({ opacity:0 }, cycle);

        if (isPaused) {
          $reader.stop(true, true);
          console.log('%o', words);
        }
        current = ++current % total;

  })();
}

module.exports.openFile = function () {
 var self = this;

 dialog.showOpenDialog({ filters: [
   { name: 'text', extensions: ['txt'] }
  ]}, function (fileNames) {

  if (fileNames === undefined) return;

  var fileName = fileNames[0];

  fs.readFile(fileName, 'utf-8', function (err, data) {
    editor.innerHTML = data;
    // Stop all animation then restart
    self.current = 0;
    self.setWords();
  });
 });
}
