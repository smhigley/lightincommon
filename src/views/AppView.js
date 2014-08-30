define(function(require, exports, module) {
  // Import additional modules to be used in this view 
  var View = require('famous/core/View'),
      Surface = require('famous/core/Surface'),
      Transform = require('famous/core/Transform'),
      StateModifier = require('famous/modifiers/StateModifier'),
      Easing = require('famous/transitions/Easing'),
      IntroView = require('views/IntroView'),
      GridView = require('views/GridView');

  function AppView() {
    View.apply(this, arguments);

    _createIntro.call(this);
    _createPhotoGrid.call(this);

    // scroll event
    this.introScreen.on('scrollUp', _scrollPhotoGrid.bind(this));
  }

  // inherit from famo.us view
  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;

  AppView.DEFAULT_OPTIONS = {
    data: undefined,
    size: [295, 498],
    prompt: ""
  };

  function _createIntro() {
    this.introScreen = new IntroView({
      size: this.options.size,
      prompt: this.options.prompt
    });

    this.add(this.introScreen);
  }

  function _createPhotoGrid() {
    this.photoGrid = new GridView({
      data: this.options.data,
      size: this.options.size,
      columns: 2
    });

    this.add(this.photoGrid);
  }

  function _scrollPhotoGrid() {
    this.photoGrid.rootMod.setTransform(
      Transform.translate(0, -400, 0),
      { duration : 1500, curve: Easing.inOutExpo }
    );
  }

  /*function _createSlideshow() {
    var slideshowModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0],
      transform: Transform.translate(0, this.options.slidePosition, 0)
    });

    var slideshowContainer = new ContainerSurface({
      properties: { overflow: 'hidden' }
    });

    var slideshow = new SlideshowView({
      size: [this.options.slideWidth, this.options.slideHeight],
      data: this.options.data
    });

    this.add(slideshowModifier).add(slideshowContainer);
    slideshowContainer.add(slideshow);
  }*/


  module.exports = AppView;

});
