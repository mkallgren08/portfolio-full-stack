
var helpers = {
  foo: function () { return 'FOO!'; },
  bar: function() {return 'BAR!';},
  breaklines: function(text){
    //console.log(text)
    text = text.toString();
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return text
  }
}

module.exports = helpers;