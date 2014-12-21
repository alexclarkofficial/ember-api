/* jshint node: true */

var marked = require('marked');
var highlight = require('highlight.js');

var renderer = new marked.Renderer();
renderer.code = function(code, meta){
  meta = meta || 'javascript';
  var lines = code.split("\n"),
   lineNumbers = '',
   result;

   lines.forEach(function(item, index){
     var humanIndex = index + 1;

     lineNumbers = lineNumbers + humanIndex + "\n";
   });

   result = '<div class="highlight ' + meta + '">' +
     '  <div class="ribbon"></div>' +
     '  <div class="scroller">' +
     '    <table class="CodeRay">' +
     '      <tr>' +
     '        <td class="line-numbers">' +
     '          <pre>' + lineNumbers + '</pre>' +
     '        </td>' +
     '        <td class="code"><pre class="' + meta + '">' + highlight.highlight(meta, code).value + '</pre></td>' +
     '      </tr>' +
     '    </table>' +
     '  </div>' +
     '</div>';

   return result;
};

marked.setOptions({
  renderer: renderer
});

module.exports = marked;
