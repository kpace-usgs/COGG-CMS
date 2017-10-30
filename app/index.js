(function(){
  "use strict";

  // include index.html for webpack to load
  require("./index.html");

  var Reveal = require("reveal.js");
  require("reveal.js/css/reveal.css");
  // uncomment theme you want to load below
  require("reveal.js/css/theme/moon.css");


  Reveal.initialize({
    history: true,
    keyboard: true,
    touch: true,
    transitionSpeed: 'fast',
    transition: 'convex',
    mouseWheel: true
    // More info https://github.com/hakimel/reveal.js#dependencies
   /* dependencies: [
      { src: 'plugin/markdown/marked.js' },
      { src: 'plugin/markdown/markdown.js' },
      { src: 'plugin/notes/notes.js', async: true },
      { src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } }
    ]*/
  });


  /* use elemeno api */

  var Elemeno = require('elemeno');

  var elemeno = new Elemeno(API);

  // define the element where content will be inserted
  var cmselement = document.getElementById('elemeno');

  function getElemeno() {
    console.log('get element')
    elemeno.getCollectionItem('publications', 'kylie-test-publication', function(err, response) {
        console.log(err, response);
        cmselement.removeChild(document.getElementById('elemenoP'))
        cmselement.insertAdjacentHTML('afterbegin', '<a href="' + response.data.links.self + '" target="_blank"><h3>'+response.data.title+'</h3></a>');

        cmselement.insertAdjacentHTML('beforeend', '<p>Updated at: '+response.data.dateUpdated+'</p>');
        cmselement.insertAdjacentHTML('beforeend', response.data.content.content.html)
    });
  };

// listen for when that element is loaded
  Reveal.addEventListener('slidechanged', function(event) {
    console.log(event.indexh);
    if(event.indexh === 4) {
      getElemeno();
    }
  });


})();
