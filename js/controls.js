var _ = require('lodash');
var remote = require('remote');
var dialog = remote.require('dialog');
var fs = require('fs');

module.exports.getWords = function (){
  var text = document.getElementById('editor').innerText;
  return _.words(text);
}

module.exports.openFile = function () {

 dialog.showOpenDialog({ filters: [
   { name: 'text', extensions: ['txt'] }
  ]}, function (fileNames) {

  if (fileNames === undefined) return;

  var fileName = fileNames[0];

  fs.readFile(fileName, 'utf-8', function (err, data) {
    document.getElementById('editor').innerText = data;
  });
 });
}

//module.exports.getWords = getWords();
