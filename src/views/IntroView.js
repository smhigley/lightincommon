define(function(require, exports, module) {
  // Import additional modules to be used in this view 
  var View = require('famous/core/View'),
      Surface = require('famous/core/Surface'),
      Transform = require('famous/core/Transform'),
      StateModifier = require('famous/modifiers/StateModifier'),
      Easing = require('famous/transitions/Easing'),
      Transitionable = require("famous/transitions/Transitionable"),
      SpringTransition = require('famous/transitions/SpringTransition');

  function IntroView() {
    View.apply(this, arguments);

    this.rootMod = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0]
    });
    this.mainNode = this.add(this.rootMod);

    _createPrompt.call(this);
    _createCTA.call(this);
    _scrollLink.call(this);
  }

  // inherit from famo.us view
  IntroView.prototype = Object.create(View.prototype);
  IntroView.prototype.constructor = IntroView;

  IntroView.DEFAULT_OPTIONS = {
    size: [undefined, 300],
    prompt: ""
  };

  function _createPrompt() {
    this.promptMod = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0]
    });

    this.prompt = new Surface({
      size: [this.options.size[0], this.options.size[1]* 0.3],
      content: this.options.prompt,
      classes: ['prompt'],
      properties: {
        zIndex: 1
      }
    });

    this.mainNode.add(this.promptMod).add(this.prompt);
  }

  function _createCTA() {
    this.ctaMod = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0.3]
    });

    this.cta = new Surface({
      size: [this.options.size[0], this.options.size[1]*0.2],
      content: '<a href="#" class="submit-link">Submit a photo</a><nav class="main-menu" role="navigation"><a href="#" class="info">Help</a><a href="#" class="menu">Menu</a></nav>',
      classes: ['main-cta']
    });

    this.mainNode.add(this.ctaMod).add(this.cta);
  }

  function _scrollLink() {
    this.scrollMod = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0.5]
    });

    this.scrollLink = new Surface({
      size: [this.options.size[0], 50],
      content: '<a href="#" class="scroll">scroll to see photos</a>',
      classes: ['scroll-link']
    });

    this.mainNode.add(this.scrollMod).add(this.scrollLink);

    // click event
    this.scrollLink.on('click', function() {
      this.scrollUp();
      this._eventOutput.emit('scrollUp');
    }.bind(this));
  }

  IntroView.prototype.scrollUp = function() {
    console.log("scrolling up");

    this.rootMod.setTransform(
      Transform.translate(0, -400, 0),
      { duration : 1500, curve: Easing.inOutExpo }
    );
  }

  module.exports = IntroView;

});
