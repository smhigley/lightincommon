define(function(require, exports, module) {
  // Import additional modules to be used in this view 
  var View = require('famous/core/View'),
      Surface = require('famous/core/Surface'),
      Transform = require('famous/core/Transform'),
      StateModifier = require('famous/modifiers/StateModifier'),
      SlideView = require('views/SlideView'),
      Lightbox = require('famous/views/Lightbox'),
      Easing = require('famous/transitions/Easing');

  function SlideshowView() {
    View.apply(this, arguments);

    this.rootModifier = new StateModifier({
      size: this.options.size,
      origin: [0.5, 0],
      align: [0.5, 0]
    });

    this.mainNode = this.add(this.rootModifier);

    _createLightbox.call(this);
    _createSlides.call(this);
  }

  // inherit from famo.us view
  SlideshowView.prototype = Object.create(View.prototype);
  SlideshowView.prototype.constructor = SlideshowView;

  SlideshowView.DEFAULT_OPTIONS = {
    size: [450, 500],
    data: undefined,
    lightboxOpts: {
      inOpacity: 1,
      outOpacity: 0,
      inOrigin: [0, 0],
      outOrigin: [0, 0],
      showOrigin: [0, 0],
      // Transform.thenMove() first applies a transform then a
      // translation based on [x, y, z]
      inTransform: Transform.thenMove(Transform.rotateX(0.9), [0, -300, 0]),
      outTransform: Transform.thenMove(Transform.rotateZ(0.7), [0, window.innerHeight, -1000]),
      inTransition: { duration: 650, curve: 'easeOut' },
      outTransition: { duration: 500, curve: Easing.inCubic }
    }
  };

  function _createLightbox() {
    this.lightbox = new Lightbox(this.options.lightboxOpts);
    this.mainNode.add(this.lightbox);
  }

  function _createSlides() {
    this.slides = [];
    this.currentIndex = 0;

    for (var i = this.options.data.length - 1; i >= 0; i--) {
      var slide = new SlideView({
        size: this.options.size,
        photoUrl: this.options.data[i]
      });

      this.slides.push(slide);

      // add click event listener
      slide.on('click', this.showNextSlide.bind(this));
    };

    this.showCurrentSlide();
  }

  SlideshowView.prototype.showCurrentSlide = function() {
    var slide = this.slides[this.currentIndex];
    this.lightbox.show(slide);
  }

  SlideshowView.prototype.showNextSlide = function() {
    this.currentIndex++;
    if (this.currentIndex === this.slides.length) this.currentIndex = 0;
    this.showCurrentSlide();
  }

  module.exports = SlideshowView;

});
