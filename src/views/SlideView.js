define(function(require, exports, module) {
  // Import additional modules to be used in this view 
  var View = require('famous/core/View'),
      Surface = require('famous/core/Surface'),
      Transform = require('famous/core/Transform'),
      StateModifier = require('famous/modifiers/StateModifier'),
      ImageSurface = require('famous/surfaces/ImageSurface'),
      SlideData = require('data/SlideData');

  function SlideView() {
    View.apply(this, arguments);

    this.rootModifier = new StateModifier({
      size: this.options.size
    });

    this.mainNode = this.add(this.rootModifier);

    _createBG.call(this);
    _createFilm.call(this);
    _createPhoto.call(this);

  }

  function _createBG() {
    var background = new Surface({
      properties: {
        backgroundColor: '#fffff5',
        boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
      }
    });

    this.mainNode.add(background);

    // add click event for future use
    background.on('click', function() {
      this._eventOutput.emit('click');
    }.bind(this));
  }

  function _createFilm() {
    var filmModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0],
      transform: Transform.translate(0, this.options.filmBorder, 1)
    });

    this.options.filmSize = this.options.size[0] - (2 * this.options.filmBorder);
    var film = new Surface({
      size: [this.options.filmSize, this.options.filmSize],
      properties: {
        backgroundColor: '#222',
        zIndex: 1,
        pointerEvents: 'none'
      }
    });

    this.mainNode.add(filmModifier).add(film);
  }

  function _createPhoto() {
    var photoModifier = new StateModifier({
      origin: [0.5, 0],
      align: [0.5, 0],
      transform: Transform.translate(0, this.options.filmBorder + this.options.photoBorder, 2)
    });

    this.options.photoSize = this.options.filmSize - (2*this.options.photoBorder);
    var photo = new ImageSurface({
      size: [this.options.photoSize, this.options.photoSize],
      content: this.options.photoUrl,
      properties: {
        zIndex: 2,
        pointerEvents: 'none'
      }
    })

    this.mainNode.add(photoModifier).add(photo);
  }

  // inherit from famo.us view
  SlideView.prototype = Object.create(View.prototype);
  SlideView.prototype.constructor = SlideView;

  SlideView.DEFAULT_OPTIONS = {
    size: [400, 450],
    filmBorder: 15,
    photoBorder: 3,
    photoUrl: SlideData.defaultImage
  };

  module.exports = SlideView;

});
